//!==================================================================
//!                        Main.json creator
//!==================================================================
//! Author  : Rohan Vashisht
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
const url_template = "https://api.github.com/search/repositories?q=topic:zig-package+fork:true&page={}&per_page=100";

// =======================
//          Main
// =======================
pub fn main() void {
    // -------- Start the json file -------------
    helperFunctions.print("[", .{});

    const allocator = std.heap.c_allocator;

    // pagination starts from 1
    var i: usize = 1;
    var isLastResult = false;
    while (!isLastResult) : (i += 1) {
        const url = std.fmt.allocPrint(allocator, url_template, .{i}) catch @panic("OOM on allocPrint");
        defer allocator.free(url);

        const res = helperFunctions.fetch(allocator, url);
        defer allocator.free(res);
        if (!std.mem.eql(u8, res, "")) {
            const parsed = std.json.parseFromSlice(std.json.Value, allocator, res, .{}) catch @panic("Json is in wrong format.");
            defer parsed.deinit();

            // ----- Get all the items (Repos) as array -----
            const repoListUncompressed = parsed.value.object.get("items").?.array.items;

            // ----- If last result -----
            // you could also use the total_count and keep tally but this also works
            isLastResult = repoListUncompressed.len != 100;
            helperFunctions.compressAndPrintRepos(allocator, repoListUncompressed, isLastResult);
        } else @panic("unable to reach url");
    }

    // -------- End the json file ---------
    helperFunctions.print("]", .{});
}
