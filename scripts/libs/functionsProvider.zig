//!==============================================
//!          Basic Functions Provider
//!==============================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file provides easy access
//! of a few functions to databaseCompiler.zig
//! and repoListCompressor.zig.
//!==============================================

// =-=-=-=-= Imports =-=-=-=-=
const std = @import("std");

// =-=-=-=-= Constants =-=-=-=-=
pub const writer = std.io.getStdOut().writer();
pub const fileFunctions = std.fs.cwd();
pub const globalAllocator = std.heap.page_allocator;
const excludedRepositoriesLists = [_][]const u8{
    "zigcc/awesome-zig",
};

// =-=-=-=-= Functions =-=-=-=-=

// -------- Prints to stdout --------
pub fn print(comptime format: []const u8, args: anytype) void {
    writer.print(format, args) catch return;
}

// ------ Basically string.replaceAll('a', 'b'); ------
pub fn replace(allocator: std.mem.Allocator, str: []const u8, charToReplace: u8, replaceWith: u8) ![]const u8 {
    var arrayList = std.ArrayList(u8).init(allocator);
    errdefer arrayList.deinit();
    for (str) |char| {
        if (char == charToReplace) {
            try arrayList.append(replaceWith);
        } else {
            try arrayList.append(char);
        }
    }
    return arrayList.toOwnedSlice();
}

// ---- Prints json in format: "string":"string", and "string":"string" ----
pub fn printJson(key: []const u8, value: []const u8, endWithComma: bool) void {
    if (endWithComma) {
        print("\"{s}\":\"{s}\",", .{ key, value });
    } else {
        print("\"{s}\":\"{s}\"", .{ key, value });
    }
}

// ---- Prints json in format: "string":int, and "string":int ----
pub fn printJsonInt(key: []const u8, value: i64, endWithComma: bool) void {
    if (endWithComma) {
        print("\"{s}\":{},", .{ key, value });
    } else {
        print("\"{s}\":{}", .{ key, value });
    }
}

// ------- Contains --------
pub fn contains(listOfStrings: []const []const u8, string: []const u8) bool {
    var result = false;
    for (listOfStrings) |item| {
        if (std.mem.eql(u8, item, string)) {
            result = true;
            break;
        }
    }
    return result;
}

// ---- Prints selected fields in json ----
pub fn compressAndPrintRepos(repoList: []std.json.Value, isLastFile: bool) !void {
    for (repoList, 0..) |item, i| {
        if (contains(&excludedRepositoriesLists, item.object.get("full_name").?.string)) {
            continue;
        }
        print("{{", .{});
        printJson("name", item.object.get("name").?.string, true);
        printJson("full_name", item.object.get("full_name").?.string, true);
        if (item.object.get("description").? == .string) {
            const purifiedString = try replace(globalAllocator, item.object.get("description").?.string, '"', '\'');
            defer globalAllocator.free(purifiedString);
            printJson("description", purifiedString, true);
        } else {
            printJson("description", "This repository has no description.", true);
        }
        printJsonInt("watchers_count", item.object.get("watchers_count").?.integer, true);
        printJsonInt("forks_count", item.object.get("forks_count").?.integer, true);
        if (item.object.get("license").? == .null) {
            printJson("license", "-", true);
        } else {
            printJson("license", item.object.get("license").?.object.get("spdx_id").?.string, true);
        }
        printJsonInt("open_issues", item.object.get("open_issues").?.integer, true);
        printJsonInt("stargazers_count", item.object.get("stargazers_count").?.integer, true);
        printJson("tags_url", item.object.get("tags_url").?.string, true);
        printJson("updated_at", item.object.get("updated_at").?.string, true);
        printJson("created_at", item.object.get("created_at").?.string, true);
        printJsonInt("size", item.object.get("size").?.integer, true);
        if (item.object.get("topics").? == .array) {
            print("\"topics\":[", .{});
            for (item.object.get("topics").?.array.items, 0..) |topic, index| {
                if (index == item.object.get("topics").?.array.items.len - 1) {
                    print("\"{s}\"", .{topic.string});
                } else {
                    print("\"{s}\",", .{topic.string});
                }
            }
            print("],", .{});
        }
        printJson("avatar_url", item.object.get("owner").?.object.get("avatar_url").?.string, false);
        // If it is the last file and the last line
        if (isLastFile and i == repoList.len - 1) {
            print("}}", .{});
        } else {
            print("}},", .{});
        }
    }
}
