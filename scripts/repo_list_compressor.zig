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
const helper_functions = @import("./libs/functions_provider.zig");

pub fn main() !void {
    // ------- Get file name -------
    var args = std.process.args();
    _ = args.skip();
    const file_name: []const u8 = args.next().?;

    // ------ Start json file -------
    helper_functions.print("[", .{});

    // ------- Read the file --------
    const file = try helper_functions.file_functions.openFile(file_name, .{});
    const buf = try file.readToEndAlloc(helper_functions.global_allocator, try file.getEndPos());
    defer helper_functions.global_allocator.free(buf);

    // --------- Parse Json --------
    const parsed = try std.json.parseFromSlice(std.json.Value, helper_functions.global_allocator, buf, .{});
    defer parsed.deinit();

    // ----- Store the items (repos) as array
    const my_items = parsed.value.array.items;

    try helper_functions.compress_and_print_repos(my_items, true);

    // ------- End Json file --------
    helper_functions.print("]", .{});
}
