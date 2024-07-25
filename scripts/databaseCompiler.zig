//!==============================================
//!     		 Main.json creator
//!==============================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file compresses the json file
//! downloaded by gh workflows (wget) and then
//! generates the *compressed main.json.
//!
//! * : By compressed I mean removing uneeded
//!     feilds from the json and generating a
//!     new file, the new file generation is
//!     done by:
//!     $ ./databaseCompiler > ./main.json
//!==============================================

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
    for(urls)|url|{
        const res = try helperFunctions.fetch(helperFunctions.globalAllocator, url);
        if(!std.mem.eql(u8,res,"")){
            try buffers_collection.append(res);
        }
        else{
            @panic("unable to reach url");
        }
    }
    const buffers = try buffers_collection.toOwnedSlice();
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
