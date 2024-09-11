//!==============================================
//!          Basic Functions Provider
//!==============================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file provides easy access
//! of a few functions to databaseCompiler.zig
//! and repoListCompressor.zig.
//!==============================================

// ==========================
//          Imports
// ==========================
const std = @import("std");

// ==========================
//         Constants
// ==========================
pub const writer = std.io.getStdOut().writer();
pub const fileFunctions = std.fs.cwd();
pub const globalAllocator = std.heap.page_allocator;
const excludedRepositoriesLists = [_][]const u8{
    "zigcc/awesome-zig",
};

// ==========================
//         Functions
// ==========================

// -------- Prints to stdout --------
pub fn print(comptime format: []const u8, args: anytype) void {
    writer.print(format, args) catch return;
}

// ------ Basically string.replaceAll('a', 'b'); ------
pub fn replace(allocator: std.mem.Allocator, str: []const u8, charToReplace: u8, replaceWith: u8) ![]const u8 {
    var arrayList = std.ArrayList(u8).init(allocator);
    defer arrayList.deinit();
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

// ---- Prints json in format: "string":int, and "string":int ----
pub fn printJsonBool(key: []const u8, value: bool, endWithComma: bool) void {
    if (endWithComma) {
        print("\"{s}\":{},", .{ key, value });
    } else {
        print("\"{s}\":{}", .{ key, value });
    }
}

// ------- Contains --------
pub fn contains(listOfStrings: []const []const u8, string: []const u8) bool {
    for (listOfStrings) |item| {
        if (std.mem.eql(u8, item, string)) {
            return true;
        }
    }
    return false;
}

// ------- Concatenate --------
pub fn concatenate(x: []const u8, y: []const u8, z: []const u8) ![]const u8 {
    var buffer = std.ArrayList(u8).init(std.heap.page_allocator);
    for (x) |char| {
        try buffer.append(char);
    }
    for (y) |char| {
        try buffer.append(char);
    }
    for (z) |char| {
        try buffer.append(char);
    }
    return try buffer.toOwnedSlice();
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
        const url = try concatenate("https://raw.githubusercontent.com/", item.object.get("full_name").?.string, "/master/" ++ "build.zig.zon");
        const result = try fetch(globalAllocator, url);
        if (std.mem.eql(u8, "", result) or std.mem.eql(u8, "404: Not Found", result)) {
            printJsonInt("has_build_zig_zon", 0, true);
        } else {
            printJsonInt("has_build_zig_zon", 1, true);
        }
        printJson("default_branch", item.object.get("default_branch").?.string, true);
        const url2 = try concatenate("https://raw.githubusercontent.com/", item.object.get("full_name").?.string, "/master/" ++ "build.zig");
        const result2 = try fetch(globalAllocator, url2);
        if (std.mem.eql(u8, "", result2) or std.mem.eql(u8, "404: Not Found", result2)) {
            printJsonInt("has_build_zig", 0, true);
        } else {
            printJsonInt("has_build_zig", 1, true);
        }
        if (item.object.get("archived").?.bool) {
            printJsonBool("archived", true, true);
        }
        printJsonBool("fork", item.object.get("fork").?.bool, true);
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
        std.debug.print("{d}\n", .{i});
    }
}

// ---- Fetch data: returns result as string (returns "" if error), uses headers ----
pub fn fetch(allocator: std.mem.Allocator, url: []const u8) ![]const u8 {
    var charBuffer = std.ArrayList(u8).init(allocator);
    defer charBuffer.deinit();
    var client = std.http.Client{ .allocator = allocator };
    const res = try std.process.getEnvVarOwned(globalAllocator, "API_AUTH_TOKEN");
    const fetchOptions = std.http.Client.FetchOptions{
        .location = std.http.Client.FetchOptions.Location{
            .url = url,
        },
        .extra_headers = &[1]std.http.Header{std.http.Header{ .name = "Authorization", .value = res }},
        .method = .GET,
        .response_storage = .{ .dynamic = &charBuffer },
    };
    _ = try client.fetch(fetchOptions);
    return try charBuffer.toOwnedSlice();
}

// ---- Fetch Without headers ----
pub fn fetchNormal(allocator: std.mem.Allocator, url: []const u8) ![]const u8 {
    var charBuffer = std.ArrayList(u8).init(allocator);
    defer charBuffer.deinit();
    var client = std.http.Client{ .allocator = allocator };
    const fetchOptions = std.http.Client.FetchOptions{
        .location = std.http.Client.FetchOptions.Location{
            .url = url,
        },
        .method = .GET,
        .response_storage = .{ .dynamic = &charBuffer },
    };
    _ = try client.fetch(fetchOptions);
    return try charBuffer.toOwnedSlice();
}

// ---- Prints selected fields in json ----
pub fn compressAndPrintReposBerg(repoList: []std.json.Value, isLastFile: bool) !void {
    for (repoList, 0..) |item, i| {
        if (contains(&excludedRepositoriesLists, item.object.get("full_name").?.string)) {
            continue;
        }
        print("{{", .{});
        printJson("name", item.object.get("name").?.string, true);
        printJsonInt("berg", 1, true);
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
        printJson("license", "-", true);
        const url = try concatenate("https://codeberg.org/", item.object.get("full_name").?.string, "/raw/branch/main/" ++ "build.zig.zon");
        const result = try fetch(globalAllocator, url);
        if (std.mem.eql(u8, "", result) or std.mem.eql(u8, "404: Not Found", result)) {
            printJsonInt("has_build_zig_zon", 0, true);
        } else {
            printJsonInt("has_build_zig_zon", 1, true);
        }
        printJson("default_branch", item.object.get("default_branch").?.string, true);
        const url2 = try concatenate("https://codeberg.org/", item.object.get("full_name").?.string, "/raw/branch/main/" ++ "build.zig");
        const result2 = try fetch(globalAllocator, url2);
        if (std.mem.eql(u8, "", result2) or std.mem.eql(u8, "404: Not Found", result2)) {
            printJsonInt("has_build_zig", 0, true);
        } else {
            printJsonInt("has_build_zig", 1, true);
        }
        printJsonBool("fork", item.object.get("fork").?.bool, true);
        printJsonInt("open_issues", item.object.get("open_issues_count").?.integer, true);
        printJsonInt("stargazers_count", item.object.get("stars_count").?.integer, true);
        printJson("tags_url", try concatenate("git@codeberg.org:", item.object.get("full_name").?.string, ".git"), true); //item.object.get("tags_url").?.string
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
        std.debug.print("{d}\n", .{i});
    }
}

// =======================
//          Tests
// =======================
test "print" {
    print("{d}", .{1});
}

test "fetch" {
    const file_contents = @embedFile("./test.json");
    const res = try fetch(std.heap.page_allocator, "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/scripts/libs/test.json");
    std.debug.assert(std.mem.eql(u8, file_contents, res));
}

test "printJson" {
    printJson("Hello", "World", false);
    printJson("Hello", "World", true);
}

test "printJsonInt" {
    printJsonInt("Age", 18, false);
    printJsonInt("Age", 18, true);
}

test "replace" {
    const result = try replace(std.heap.page_allocator, "Hello", 'l', 'o');
    defer globalAllocator.free(result);
    std.debug.assert(std.mem.eql(u8, result, "Heooo"));
}

test "contains" {
    const stringArrayList = [_][]const u8{ "Hello", "Yo" };
    const result = contains(&stringArrayList, "Hello");
    std.debug.assert(result);
}

test "compressAndPrintRepos" {
    const rawJson = @embedFile("./test.json");
    const parsed_value = try std.json.parseFromSlice(std.json.Value, std.heap.page_allocator, rawJson, .{});
    defer parsed_value.deinit();
    // The bellow should not print zigcc/awsome-zig, because it has been included in the excluded repositories list.
    try compressAndPrintRepos(parsed_value.value.object.get("items").?.array.items, true);
    try compressAndPrintRepos(parsed_value.value.object.get("items").?.array.items, false);
}
