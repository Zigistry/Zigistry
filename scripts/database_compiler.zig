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
const helper_functions = @import("./libs/functions_provider.zig");

// --------- Constants -----------
const file_names = [4][]const u8{ "a.json", "b.json", "c.json", "d.json" };

pub fn main() !void {
    // -------- Start the json file -------------
    helper_functions.print("[", .{});

    for (file_names, 0..) |file_name, i| {
        // ---------- Read raw file -------------
        const file = try helper_functions.file_functions.openFile(file_name, .{});
        const buf = try file.readToEndAlloc(helper_functions.global_allocator, try file.getEndPos());
        defer helper_functions.global_allocator.free(buf);

        // -------- Parse the json file --------
        const parsed = try std.json.parseFromSlice(std.json.Value, helper_functions.global_allocator, buf, .{});
        defer parsed.deinit();

        // ----- Get all the items (Repos) as array -----
        const my_items = parsed.value.object.get("items").?.array.items;

        // ----- If last file -----
        if (i == file_names.len - 1) {
            try helper_functions.compress_and_print_repos(my_items, true);
        } else {
            try helper_functions.compress_and_print_repos(my_items, false);
        }
    }

    // -------- End the json file ---------
    helper_functions.print("]", .{});
}
