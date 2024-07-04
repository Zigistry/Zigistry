//!===============================================================================//
//!                             Web libs Compiler                                 //
//!===============================================================================//
//! Author:
//! Rohan Vashisht
//!
//! Details:
//! This is a program compresses the json files provided to it in a specific format.
//!
//! Please check license file for copyright details.

/// =============================
///            Imports
/// =============================
const std = @import("std");
const helper_functions = @import("./libs/functions_provider.zig");

/// =============================
///           Constants
/// =============================

// ===| Main function |===
pub fn main() !void {
    var args = std.process.args();
    _ = args.skip();
    const file_name:[]const u8 = args.next().?; 
    helper_functions.print("[", .{});
    const file = try helper_functions.file_functions.openFile(file_name, .{});
    const buf = try file.readToEndAlloc(helper_functions.global_allocator, try file.getEndPos());
    defer helper_functions.global_allocator.free(buf);
    const parsed = try std.json.parseFromSlice(std.json.Value, helper_functions.global_allocator, buf, .{});
    defer parsed.deinit();
    const my_items = parsed.value.array.items;
    // If it is the last file
    try helper_functions.compress_and_print_repos(my_items, true);
    helper_functions.print("]", .{});
}
