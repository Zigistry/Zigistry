//!==================================================================
//!     		         Main.json creator
//!==================================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file downloads and *compresses json from gh api
//! and stores it inside main.json.
//!
//! * : By compressed I mean removing uneeded feilds from the json
//!     and storing it inside ./database/main.json by doing:
//!
//! $ zig build run_databaseCompiler > ./database/main.json
//!==================================================================

// ---------- Imports ------------
const std = @import("std");
const helperFunctions = @import("helperFunctions");

// --------- Constants -----------
const urls = [_][]const u8{
    // Increment these whenever repositories having zig-package reach the next 100.
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=2&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=3&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=4&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=5&per_page=100",
};

pub fn main() !void {
    // -------- Start the json file -------------
    helperFunctions.print("[", .{});

    var buffers_collection = std.ArrayList([]const u8).init(helperFunctions.globalAllocator);
    defer buffers_collection.deinit();
    for (urls) |url| {
        const res = try helperFunctions.fetch(helperFunctions.globalAllocator, url);
        defer helperFunctions.globalAllocator.free(res);
        if (!std.mem.eql(u8, res, "")) {
            try buffers_collection.append(res);
        } else {
            @panic("unable to reach url");
        }
    }
    const buffers = try buffers_collection.toOwnedSlice();
    defer helperFunctions.globalAllocator.free(buffers);
    for (buffers, 0..) |buffer, i| {
        // -------- Parse the json file --------
        const parsed = try std.json.parseFromSlice(std.json.Value, helperFunctions.globalAllocator, buffer, .{});
        defer parsed.deinit();

        // ----- Get all the items (Repos) as array -----
        const repoListUncompressed = parsed.value.object.get("items").?.array.items;

        // ----- If last file -----
        if (i == buffers.len - 1) {
            try helperFunctions.compressAndPrintRepos(repoListUncompressed, true);
        } else {
            try helperFunctions.compressAndPrintRepos(repoListUncompressed, false);
        }
    }

    // -------- End the json file ---------
    helperFunctions.print("]", .{});
}
