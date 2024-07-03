//!===============================================================================//
//!                             Web libs Compiler                                 //
//!===============================================================================//
//! Author:
//! Rohan Vashisht
//!
//! Details:
//! This is a program compiles the compressed repository for featured web packages.
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
const file_name = "./database/web.json";

// ===| Main function |===
pub fn main() !void {
    helper_functions.print("[", .{});
    const file = try helper_functions.file_functions.openFile(file_name, .{});
    const buf = try file.readToEndAlloc(helper_functions.global_allocator, try file.getEndPos());
    helper_functions.global_allocator.free(buf);
    const parsed = try std.json.parseFromSlice(std.json.Value, helper_functions.global_allocator, buf, .{});
    defer parsed.deinit();
    const my_items = parsed.value.array.items;
    // If it is the last file
    try helper_functions.print_repos(my_items, true);
    helper_functions.print("]", .{});
}
