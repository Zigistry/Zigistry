//!========================================================
//!     		  web/gui/games.json creator
//!========================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file compresses the json files
//! downloaded by gh workflows (wget) and then
//! generates the *compressed files.
//!
//! * : By compressed I mean removing uneeded
//!     feilds from the json and generating a
//!     new file, the new file generation is
//!     done by:
//!     $ ./repo_list ./web.json > ./database/web.json
//!     $ ./repo_list ./gui.json > ./database/gui.json
//!     $ ./repo_list ./games.json > ./database/games.json
//!========================================================

// ---------- Imports ------------
const std = @import("std");
const helperFunctions = @import("./libs/functionsProvider.zig");

pub fn main() !void {
    // ------- Get file name -------
    var args = std.process.args();
    _ = args.skip();
    const fileName: []const u8 = args.next().?;

    // ------ Start json file -------
    helperFunctions.print("[", .{});

    // ------- Read the file --------
    const file = try helperFunctions.fileFunctions.openFile(fileName, .{});
    const buffer = try file.readToEndAlloc(helperFunctions.globalAllocator, try file.getEndPos());
    defer helperFunctions.globalAllocator.free(buffer);

    // --------- Parse Json --------
    const parsed = try std.json.parseFromSlice(std.json.Value, helperFunctions.globalAllocator, buffer, .{});
    defer parsed.deinit();

    // ----- Store the items (repos) as array
    const repoArray = parsed.value.array.items;

    try helperFunctions.compressAndPrintRepos(repoArray, true);

    // ------- End Json file --------
    helperFunctions.print("]", .{});
}
