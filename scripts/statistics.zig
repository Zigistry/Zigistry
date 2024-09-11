//!==============================================
//!     		 Statistics generator
//!==============================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file generates statistics
//! by reading data from main.json. For this
//! file to run correctly, please first
//! copy the database/main.json to
//! scripts folder, and then run this file.
//!
//! This can be done by:
//! $ cp ./database/main.json ./scripts/main.json
//! and then:
//! $ zig run ./scripts/statistics.zig
//!
//! Please don't forget to (even though once
//! pushed, gh workflows will):
//! $ rm -rf ./scripts/main.json
//!==============================================

// =======================
//         Imports
// =======================
const std = @import("std");

// =======================
//        Constants
// =======================
const allocator = std.heap.page_allocator;
const writer = std.io.getStdOut().writer();

fn print(comptime format: []const u8, args: anytype) void {
    writer.print(format, args) catch return;
}

pub fn main() !void {
    const jsonRawData = @embedFile("./main.json");
    const parsed = try std.json.parseFromSlice(
        std.json.Value,
        allocator,
        jsonRawData,
        .{},
    );
    defer parsed.deinit();

    const parsedItems = parsed.value.array.items;

    var licenseHashmap = std.StringHashMap(u32).init(allocator);
    defer licenseHashmap.deinit();
    for (parsedItems) |item| {
        const license = item.object.get("license").?.string;
        if (licenseHashmap.get(license)) |count| {
            licenseHashmap.put(license, count + 1) catch {};
        } else {
            licenseHashmap.put(license, 1) catch {};
        }
    }
    var licenseHashmapIterator = licenseHashmap.iterator();
    while (licenseHashmapIterator.next()) |entry| {
        print("{s},{d}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }

    print("\n\n", .{});

    var topicsArray = std.ArrayList([]const u8).init(allocator);
    defer topicsArray.deinit();
    for (parsedItems) |item| {
        const topics = item.object.get("topics").?.array.items;
        for (topics) |topic| {
            try topicsArray.append(topic.string);
        }
    }

    var topicsHashMap = std.StringHashMap(u32).init(allocator);
    const topicsArrayAsString: [][]const u8 = try topicsArray.toOwnedSlice();
    defer allocator.free(topicsArrayAsString);
    for (topicsArrayAsString) |topic| {
        if (topicsHashMap.get(topic)) |count| {
            topicsHashMap.put(topic, count + 1) catch {};
        } else {
            topicsHashMap.put(topic, 1) catch {};
        }
    }
    var topicsHashMapIterator = topicsHashMap.iterator();
    while (topicsHashMapIterator.next()) |entry| {
        print("{s},{d}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }
    var sum: i64 = 0;
    for (parsedItems) |item| {
        sum += item.object.get("size").?.integer;
    }
    const average = @divTrunc(sum, @as(i64, @intCast(parsedItems.len)));
    print("{d}KB", .{average});
}
