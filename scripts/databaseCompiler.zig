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

// =======================
//         Imports
// =======================
const std = @import("std");
const helperFunctions = @import("helperFunctions");

// =======================
//        Constants
// =======================
const urls = [_][]const u8{
    // Increment these whenever repositories having zig-package reach the next 100.
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=1&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=2&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=3&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=4&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=5&per_page=100",
    "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page=6&per_page=100",
};

// =======================
//          Main
// =======================
pub fn main() !void {
    // -------- Start the json file -------------
    helperFunctions.print("[", .{});

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer {
        const deinit_status = gpa.deinit();
        if (deinit_status == .leak) @panic("The code contains memory leaks.");
    }

    for (urls, 0..) |url, i| {
        const res = try helperFunctions.fetch(allocator, url);
        defer allocator.free(res);
        if (!std.mem.eql(u8, res, "")) {
            const parsed = try std.json.parseFromSlice(std.json.Value, allocator, res, .{});
            defer parsed.deinit();

            // ----- Get all the items (Repos) as array -----
            const repoListUncompressed = parsed.value.object.get("items").?.array.items;

            // ----- If last result -----
            if (i == urls.len - 1) {
                try helperFunctions.compressAndPrintRepos(allocator, repoListUncompressed, true);
            } else {
                try helperFunctions.compressAndPrintRepos(allocator, repoListUncompressed, false);
            }
        } else @panic("unable to reach url");
    }

    // -------- End the json file ---------
    helperFunctions.print("]", .{});
}
