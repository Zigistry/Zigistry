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
//!     $ ./database_compiler > ./main.json
//!==============================================

// ---------- Imports ------------
const std = @import("std");
const helperFunctions = @import("./libs/functionsProvider.zig");

// --------- Constants -----------
const buffers = [4][]const u8{
    @embedFile("./a.json"),
    @embedFile("./b.json"),
    @embedFile("./c.json"),
    @embedFile("./d.json"),
};

pub fn main() !void {
    // -------- Start the json file -------------
    helperFunctions.print("[", .{});

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
