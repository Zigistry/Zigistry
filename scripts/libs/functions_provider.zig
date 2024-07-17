//!==============================================
//!          Basic Functions Provider
//!==============================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file provides easy access
//! of a few functions to database_compiler.zig
//! and repo_list_compressor.zig.
//!==============================================

// =-=-=-=-= Imports =-=-=-=-=
const std = @import("std");

// =-=-=-=-= Constants =-=-=-=-=
pub const writer = std.io.getStdOut().writer();
pub const file_functions = std.fs.cwd();
pub const global_allocator = std.heap.page_allocator;

// =-=-=-=-= Functions =-=-=-=-=

// -------- Prints to stdout --------
pub fn print(comptime format: []const u8, args: anytype) void {
    writer.print(format, args) catch return;
}

// ------ Basically string.replaceAll('a', 'b'); ------
pub fn replace(allocator: std.mem.Allocator, str: []const u8, char_to_replace: u8, replace_with: u8) ![]const u8 {
    var my_custom = std.ArrayList(u8).init(allocator);
    errdefer my_custom.deinit();
    for (str) |char| if (char == char_to_replace) try my_custom.append(replace_with) else try my_custom.append(char);
    return my_custom.toOwnedSlice();
}

// ---- Prints json in format: "string":"string", and "string":"string" ----
pub fn print_json(x: []const u8, y: []const u8, end_with_comma: bool) void {
    if (end_with_comma) {
        print("\"{s}\":\"{s}\",", .{ x, y });
    } else {
        print("\"{s}\":\"{s}\"", .{ x, y });
    }
}

// ---- Prints json in format: "string":int, and "string":int ----
pub fn print_json_int(x: []const u8, y: i64, end_with_comma: bool) void {
    if (end_with_comma) {
        print("\"{s}\":{},", .{ x, y });
    } else {
        print("\"{s}\":{}", .{ x, y });
    }
}

// ------- Contains --------
pub fn contains(my_items: [][]const u8, string: []const u8) bool{
    var result = false;
    for (my_items) |item| {
        if(std.mem.eql(u8, item, string)){
            result = true;
            break;
        }
    }
    return result;
}

const excluded_repositories_lists = [_][]const u8{
    "zigcc/awesome-zig"
};

// ---- Prints selected fields in json ----
pub fn compress_and_print_repos(my_items: []std.json.Value, is_last_file: bool) !void {
    for (my_items, 0..) |item, i| {
        print("{{", .{});
        print_json("name", item.object.get("name").?.string, true);
        if(!contains(&excluded_repositories_lists, item.object.get("full_name").?.string)){
            print_json("full_name", item.object.get("full_name").?.string, true);
        }
        if (item.object.get("description").? == .string) {
            const my_var = try replace(global_allocator, item.object.get("description").?.string, '"', '\'');
            defer global_allocator.free(my_var);
            print_json("description", my_var, true);
        } else {
            print_json("description", "This repository has no description.", true);
        }
        print_json_int("watchers_count", item.object.get("watchers_count").?.integer, true);
        print_json_int("forks_count", item.object.get("forks_count").?.integer, true);
        if (item.object.get("license").? == .null) {
            print_json("license", "-", true);
        } else {
            print_json("license", item.object.get("license").?.object.get("spdx_id").?.string, true);
        }
        print_json_int("open_issues", item.object.get("open_issues").?.integer, true);
        print_json_int("stargazers_count", item.object.get("stargazers_count").?.integer, true);
        print_json("tags_url", item.object.get("tags_url").?.string, true);
        print_json("created_at", item.object.get("created_at").?.string, true);
        if (item.object.get("topics").? == .array) {
            print("\"topics\":[", .{});
            for (item.object.get("topics").?.array.items, 0..) |my_item, index| {
                if (index == item.object.get("topics").?.array.items.len - 1) {
                    print("\"{s}\"", .{my_item.string});
                } else {
                    print("\"{s}\",", .{my_item.string});
                }
            }
            print("],", .{});
        }
        print_json("avatar_url", item.object.get("owner").?.object.get("avatar_url").?.string, false);
        // If it is the last file and the last line
        if (is_last_file and i == my_items.len - 1) {
            print("}}", .{});
        } else {
            print("}},", .{});
        }
    }
}
