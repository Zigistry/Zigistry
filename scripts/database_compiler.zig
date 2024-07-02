//!===============================================================================//
//!                             Database Compiler                                 //
//!===============================================================================//
//! Author:
//! Rohan Vashisht
//!
//! Details:
//! This is a program that reads data from multiple json files downloaded using wget
//! from GitHub's api's and creates database from their data. The database is a
//! main.json file that is present inside the database directory. This program is
//! executed using github workflows, so that the database is updated automatically.
//!
//! Please check license file for copyright details.

/// =============================
///            Imports
/// =============================
const std = @import("std");

/// =============================
///           Constants
/// =============================
const writer = std.io.getStdOut().writer();
const file_functions = std.fs.cwd();
const file_names = [4][]const u8{ "a.json", "b.json", "c.json", "d.json" };
const global_allocator = std.heap.page_allocator;

/// =============================
///           Functions
/// =============================
/// ===| Prints data to stdout |===
fn print(comptime format: []const u8, args: anytype) void {
    writer.print(format, args) catch return;
}

/// ===| Replaces all occurrences of same characters from a string, returns a new string |===
fn replace(allocator: std.mem.Allocator, str: []const u8, char_to_replace: u8, replace_with: u8) ![]const u8 {
    var my_custom = std.ArrayList(u8).init(allocator);
    errdefer my_custom.deinit();
    for (str) |char| if (char == char_to_replace) try my_custom.append(replace_with) else try my_custom.append(char);
    return my_custom.toOwnedSlice();
}

// ===| Prints json (string : string) to stdout. |===
fn print_json(x: []const u8, y: []const u8, end_with_comma: bool) void {
    if (end_with_comma) print("\"{s}\":\"{s}\",", .{ x, y }) else print("\"{s}\":\"{s}\"", .{ x, y });
}

// ===| Prints json (string : int) to stdout. |===
fn print_json_int(x: []const u8, y: i64, end_with_comma: bool) void {
    if (end_with_comma) print("\"{s}\":{},", .{ x, y }) else print("\"{s}\":{}", .{ x, y });
}

// ===| Prints inivisual repo details as json to stdout. |===
fn print_repos(my_items: []std.json.Value, is_last_file: bool) !void {
    for (my_items, 0..) |item, i| {
        print("{{", .{});
        print_json("name", item.object.get("name").?.string, true);
        print_json("full_name", item.object.get("full_name").?.string, true);
        if (item.object.get("description").? == .string) {
            const my_var = try replace(global_allocator, item.object.get("description").?.string, '"', '\'');
            defer global_allocator.free(my_var);
            print_json("description", my_var, true);
        } else print_json("description", "This repository has no description.", true);
        print_json_int("watchers_count", item.object.get("watchers_count").?.integer, true);
        print_json_int("forks_count", item.object.get("forks_count").?.integer, true);
        print_json("license", item.object.get("open_issues").?.object.get("spdx_id").?.string, true);
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
        if (is_last_file and i == my_items.len - 1) print("}}", .{}) else print("}},", .{});
    }
}

// ===| Main function |===
pub fn main() !void {
    print("[", .{});
    for (file_names, 0..) |file_name, i| {
        const file = try file_functions.openFile(file_name, .{});
        const buf = try file.readToEndAlloc(global_allocator, try file.getEndPos());
        defer global_allocator.free(buf);
        const parsed = try std.json.parseFromSlice(std.json.Value, global_allocator, buf, .{});
        defer parsed.deinit();
        const my_items = parsed.value.object.get("items").?.array.items;
        // If it is the last file
        if (i == file_names.len - 1) try print_repos(my_items, true) else try print_repos(my_items, false);
    }
    print("]", .{});
}
