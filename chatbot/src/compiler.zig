//!===============================================================================//
//!                               Chat Bot compiler                               //
//!===============================================================================//
//! Author:
//! Rohan Vashisht
//!
//! Details:
//! This is a basic library convert corpus data into a typescript file!
//!
//! Please check license file for copyright details.

/// =============================
///            Imports
/// =============================
const std = @import("std");

/// =============================
///           Constants
/// =============================
pub const writer = std.io.getStdOut().writer();
pub const file_functions = std.fs.cwd();
pub const global_allocator = std.heap.page_allocator;

pub fn main() !void {
    const file = try file_functions.openFile("./chatbot/main.corpus", .{});
    const text = try file.readToEndAlloc(global_allocator, try file.getEndPos());
    defer global_allocator.free(text);
    var lines = std.mem.split(u8, text, "\n");
    while (lines.next()) |line| {
        var it = std.mem.split(u8, line, ":");
        const input = it.next().?;
        const response = it.next().?;
        // the input contains 3 words, response can contain any amount of chars
        var it2 = std.mem.split(u8, input, ",");
        std.debug.print("if(user_input.includes('{s}') && user_input.includes('{s}') && user_input.includes('{s}')) {{", .{ it2.next().?, it2.next().?, it2.next().? });
        std.debug.print("    return '{s}';", .{response});
        std.debug.print("}}", .{});
    }
    return;
}
