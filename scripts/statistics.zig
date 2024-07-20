//
const std = @import("std");

pub fn main() !void {
    const jsonRawData = @embedFile("./main.json");
    const parsed = try std.json.parseFromSlice(
        std.json.Value,
        std.heap.page_allocator,
        jsonRawData,
        .{},
    );

    const parsedItems = parsed.value.array.items;

    var licenseHashmap = std.StringHashMap(u32).init(std.heap.page_allocator);
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
        std.debug.print("{s}:{d}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }
    licenseHashmap.deinit();

    std.debug.print("\n\n", .{});

    var topicsArray = std.ArrayList([]const u8).init(std.heap.c_allocator);
    for (parsedItems) |item| {
        const topics = item.object.get("topics").?.array.items;
        for (topics) |topic| {
            try topicsArray.append(topic.string);
        }
    }

    var topicsHashMap = std.StringHashMap(u32).init(std.heap.page_allocator);
    const topicsArrayAsString: [][]const u8 = try topicsArray.toOwnedSlice();
    for (topicsArrayAsString) |topic| {
        if (topicsHashMap.get(topic)) |count| {
            topicsHashMap.put(topic, count + 1) catch {};
        } else {
            topicsHashMap.put(topic, 1) catch {};
        }
    }
    var topicsHashMapIterator = topicsHashMap.iterator();
    while (topicsHashMapIterator.next()) |entry| {
        std.debug.print("{s}:{d}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }
}
