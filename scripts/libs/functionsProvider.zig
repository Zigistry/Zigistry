//!==============================================
//!          Basic Functions Provider
//!==============================================
//! Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file provides easy access
//! of a few functions to databaseCompiler.zig
//! and repoListCompressor.zig.
//!==============================================

// ==========================
//          Imports
// ==========================
const std = @import("std");
pub const GitlabApi = @import("GitlabApi.zig");
pub const RepoServer = @import("RepoServer.zig").RepoServer;

// ==========================
//         Constants
// ==========================
pub const writer = std.io.getStdOut().writer();
pub const fileFunctions = std.fs.cwd();
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
pub fn replace(allocator: std.mem.Allocator, str: []const u8, charToReplace: u8, replaceWith: u8) []const u8 {
    var finalString: []u8 = allocator.alloc(u8, str.len) catch @panic("Memory is full.");
    for (str, 0..) |char, i| {
        finalString[i] = if (char == charToReplace) replaceWith else char;
    }
    return finalString;
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
pub fn concatenate(allocator: std.mem.Allocator, str1: []const u8, str2: []const u8, str3: []const u8) []const u8 {
    return std.mem.concat(allocator, u8, &.{ str1, str2, str3 }) catch @panic("Out Of Memory");
}

// ---- Prints selected fields in json ----
pub fn compressAndPrintRepos(alloctor: std.mem.Allocator, repoList: []std.json.Value, isLastFile: bool) void {
    const server = RepoServer.Github;
    for (repoList, 0..) |item, i| {
        if (contains(&excludedRepositoriesLists, item.object.get("full_name").?.string)) {
            continue;
        }
        print("{{", .{});
        printJsonInt("server", @intFromEnum(server), true);
        printJson("name", item.object.get("name").?.string, true);
        printJson("full_name", item.object.get("full_name").?.string, true);
        if (item.object.get("description").? == .string) {
            const purifiedString = replace(alloctor, item.object.get("description").?.string, '"', '\'');
            defer alloctor.free(purifiedString);
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
        const default_branch = item.object.get("default_branch").?.string;
        printJson("default_branch", default_branch, true);
        inline for (.{
            .{ "has_build_zig", "build.zig" },
            .{ "has_build_zig_zon", "build.zig.zon" },
        }) |tup| {
            const has_file: i64 = if (checkRepoFileExists(
                server,
                alloctor,
                item.object.get("full_name").?.string,
                default_branch,
                tup[1],
            )) 1 else 0;
            printJsonInt(tup[0], has_file, true);
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
        // std.debug.print("{d}\n", .{i});
    }
}

// ---- Fetch data: returns result as string (returns "" if error), uses headers ----
pub fn fetch(allocator: std.mem.Allocator, url: []const u8) []const u8 {
    var charBuffer = std.ArrayList(u8).init(allocator);
    var client = std.http.Client{ .allocator = allocator };
    defer client.deinit();
    const res = std.process.getEnvVarOwned(allocator, "API_AUTH_TOKEN") catch @panic("API AUTH TOKEN issue.");
    defer allocator.free(res);
    const fetchOptions = std.http.Client.FetchOptions{
        .location = std.http.Client.FetchOptions.Location{
            .url = url,
        },
        .extra_headers = &[1]std.http.Header{std.http.Header{ .name = "Authorization", .value = res }},
        .method = .GET,
        .response_storage = .{ .dynamic = &charBuffer },
    };
    _ = client.fetch(fetchOptions) catch @panic("no internet");
    return charBuffer.toOwnedSlice() catch @panic("Can't convert buffer to string");
}

// ---- Fetch With HEAD request, test return code ----
pub fn checkUrlExists(allocator: std.mem.Allocator, url: []const u8) bool {
    var client = std.http.Client{ .allocator = allocator };
    defer client.deinit();
    const fetchOptions = std.http.Client.FetchOptions{
        .location = std.http.Client.FetchOptions.Location{
            .url = url,
        },
        .method = .HEAD,
    };
    const result = client.fetch(fetchOptions) catch @panic("Internet issue.");
    return switch (result.status) {
        .ok => true,
        else => false,
    };
}

// check if a file in a repository exists, defined by url parts
pub fn checkRepoFileExists(
    server: RepoServer,
    allocator: std.mem.Allocator,
    repo: []const u8,
    branch: []const u8,
    file: []const u8,
) bool {
    const url = server.rawFileUrl(allocator, repo, branch, file);
    defer allocator.free(url);
    return checkUrlExists(allocator, url);
}

// ---- Fetch Without headers ----
pub fn fetchNormal(allocator: std.mem.Allocator, url: []const u8) []const u8 {
    var charBuffer = std.ArrayList(u8).init(allocator);
    errdefer charBuffer.deinit();
    var client = std.http.Client{ .allocator = allocator };
    defer client.deinit();
    const fetchOptions = std.http.Client.FetchOptions{
        .location = std.http.Client.FetchOptions.Location{
            .url = url,
        },
        .method = .GET,
        .response_storage = .{ .dynamic = &charBuffer },
    };
    _ = client.fetch(fetchOptions) catch @panic("Internet issue.");
    return charBuffer.toOwnedSlice() catch @panic("Can't convert buffer to string");
}

// ---- Prints selected fields in json ----
pub fn compressAndPrintReposGitlab(allocator: std.mem.Allocator, repoList: []const GitlabApi.Projects, isLastFile: bool) void {
    const server = RepoServer.Gitlab;
    for (repoList, 0..) |item, i| {
        if (contains(&excludedRepositoriesLists, item.path_with_namespace)) {
            continue;
        }
        const details = GitlabApi.ProjectDetails.fetch(allocator, @intCast(item.id)) catch @panic("Details Api Error");
        defer details.deinit();
        const issues = GitlabApi.Issues.fetch(allocator, @intCast(item.id)) catch @panic("Issues Api Error");
        defer issues.deinit();

        print("{{", .{});
        printJsonInt("server", @intFromEnum(server), true);
        printJson("name", item.path, true);
        printJson("full_name", item.path_with_namespace, true);
        printJsonInt("gitlab", 1, true);
        if (item.description) |description| {
            const purifiedString = replace(allocator, description, '"', '\'');
            defer allocator.free(purifiedString);
            printJson("description", purifiedString, true);
        } else {
            printJson("description", "This repository has no description.", true);
        }
        printJsonInt("stargazers_count", @intCast(item.star_count), true);
        printJson("updated_at", item.last_activity_at, true);
        printJson("created_at", item.created_at, true);
        const forks_count = if (item.forks_count) |forks_count| forks_count else 0;
        printJsonInt("forks_count", @intCast(forks_count), true);
        const tags_url = concatenate(allocator, "git@gitlab.com:", item.path_with_namespace, ".git");
        defer allocator.free(tags_url);
        printJson("tags_url", tags_url, true);
        const default_branch = if (item.default_branch) |db|
            db
        else
            "main";
        printJson("default_branch", default_branch, true);
        printJsonBool("fork", item.forked_from_project != null, true);
        if (item.topics) |topics| {
            print("\"topics\":[", .{});
            for (topics, 0..) |topic, index| {
                if (index == topics.len - 1) {
                    print("\"{s}\"", .{topic});
                } else {
                    print("\"{s}\",", .{topic});
                }
            }
            print("],", .{});
        }
        if (details.value.license) |license| {
            {
                const license_upper = std.ascii.allocUpperString(allocator, license.key) catch @panic("OOM");
                defer allocator.free(license_upper);
                printJson("license", license_upper, true);
            }
        } else {
            printJson("license", "-", true);
        }
        printJsonInt("open_issues", @intCast(issues.value.len), true);

        // TODO: this actually needs a Gitlab Token, not available publicly
        if (details.value.statistics) |stats| {
            printJsonInt("size", @intCast(stats.repository_size / 1000), true);
        } else {
            printJsonInt("size", 0, true);
        }

        // TODO: need to implement these values as they are not the same on gitlab:
        printJsonInt("watchers_count", 0, true);
        // end TODO

        inline for (.{
            .{ "has_build_zig", "build.zig" },
            .{ "has_build_zig_zon", "build.zig.zon" },
        }) |tup| {
            const has_file: i64 = if (checkRepoFileExists(
                server,
                allocator,
                item.path_with_namespace,
                default_branch,
                tup[1],
            )) 1 else 0;
            printJsonInt(tup[0], has_file, true);
        }

        if (item.archived) |archived| {
            if (archived) {
                printJsonBool("archived", true, true);
            }
        }
        {
            var avatar_url: []const u8 = "";
            if (item.avatar_url) |avatar_url_optional| {
                avatar_url = avatar_url_optional;
            } else {
                if (item.namespace) |namespace| {
                    if (namespace.avatar_url) |avatar_url_optional| {
                        avatar_url = avatar_url_optional;
                    }
                }
            }
            if (std.mem.startsWith(u8, avatar_url, "/")) {
                const avatar_url_prefixed = std.mem.concat(allocator, u8, &.{
                    "https://gitlab.com",
                    avatar_url,
                }) catch @panic("Out Of Memory");
                defer allocator.free(avatar_url_prefixed);
                printJson("avatar_url", avatar_url_prefixed, false);
            } else {
                printJson("avatar_url", avatar_url, false);
            }
        }
        if (isLastFile and i == repoList.len - 1) {
            print("}}", .{});
        } else {
            print("}},", .{});
        }
    }
}

// ---- Prints selected fields in json ----
pub fn compressAndPrintReposBerg(allocator: std.mem.Allocator, repoList: []std.json.Value, isLastFile: bool) void {
    const server = RepoServer.Codeberg;
    for (repoList, 0..) |item, i| {
        if (contains(&excludedRepositoriesLists, item.object.get("full_name").?.string)) {
            continue;
        }
        print("{{", .{});
        printJsonInt("server", @intFromEnum(server), true);
        printJson("name", item.object.get("name").?.string, true);
        printJson("full_name", item.object.get("full_name").?.string, true);
        printJsonInt("berg", 1, true);
        if (item.object.get("description").? == .string) {
            const purifiedString = replace(allocator, item.object.get("description").?.string, '"', '\'');
            defer allocator.free(purifiedString);
            printJson("description", purifiedString, true);
        } else {
            printJson("description", "This repository has no description.", true);
        }
        printJsonInt("watchers_count", item.object.get("watchers_count").?.integer, true);
        printJsonInt("forks_count", item.object.get("forks_count").?.integer, true);
        printJson("license", "-", true);

        const default_branch = item.object.get("default_branch").?.string;
        printJson("default_branch", default_branch, true);
        inline for (.{
            .{ "has_build_zig", "build.zig" },
            .{ "has_build_zig_zon", "build.zig.zon" },
        }) |tup| {
            const has_file: i64 = if (checkRepoFileExists(
                server,
                allocator,
                item.object.get("full_name").?.string,
                default_branch,
                tup[1],
            )) 1 else 0;
            printJsonInt(tup[0], has_file, true);
        }

        printJsonBool("fork", item.object.get("fork").?.bool, true);
        printJsonInt("open_issues", item.object.get("open_issues_count").?.integer, true);
        printJsonInt("stargazers_count", item.object.get("stars_count").?.integer, true);
        const tags_url = concatenate(allocator, "git@codeberg.org:", item.object.get("full_name").?.string, ".git");
        defer allocator.free(tags_url);
        printJson("tags_url", tags_url, true); //item.object.get("tags_url").?.string
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
        // std.debug.print("{d}\n", .{i});
    }
}

// =======================
//          Tests
// =======================
test "print" {
    print("{d}", .{1});
}

test "fetchNormal" {
    const file_contents = @embedFile("./test.json");
    const res = fetchNormal(std.heap.c_allocator, "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/scripts/libs/test.json");
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
    const alloc = std.heap.c_allocator;
    const result = replace(alloc, "Hello", 'l', 'o');
    defer alloc.free(result);
    print("{s}", .{result});
    std.debug.assert(std.mem.eql(u8, result, "Heooo"));
}

test "contains" {
    const stringArrayList = [_][]const u8{ "Hello", "Yo" };
    const result = contains(&stringArrayList, "Hello");
    std.debug.assert(result);
}

test "compressAndPrintRepos" {
    const rawJson = @embedFile("./test.json");
    const parsed_value = std.json.parseFromSlice(std.json.Value, std.heap.c_allocator, rawJson, .{}) catch @panic("Json is in wrong format.");
    defer parsed_value.deinit();
    // The bellow should not print zigcc/awsome-zig, because it has been included in the excluded repositories list.
    compressAndPrintRepos(std.heap.c_allocator, parsed_value.value.object.get("items").?.array.items, true);
    compressAndPrintRepos(std.heap.c_allocator, parsed_value.value.object.get("items").?.array.items, false);
}
