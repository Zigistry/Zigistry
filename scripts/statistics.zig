//
const std = @import("std");

pub fn main() !void {
    const x = @embedFile("./main.json");
    const parsed = try std.json.parseFromSlice(
        std.json.Value,
        std.heap.page_allocator,
        x,
        .{},
    );
    const parsed_items = parsed.value.array.items; //[0].object.get("license").?.string
    var hashmap = std.StringHashMap(u32).init(std.heap.page_allocator);
    for (parsed_items) |ok| {
        const asd = ok.object.get("license").?.string;
        const existing_count = hashmap.get(asd);
        if (existing_count) |count| {
            hashmap.put(asd, count + 1) catch {};
        } else {
            hashmap.put(asd, 1) catch {};
        }
    }
    var as = hashmap.iterator();
    while (as.next()) |entry| {
        std.debug.print("{s}:{d}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }
    hashmap.deinit();
    std.debug.print("\n\n", .{});
    var mine = std.ArrayList([]const u8).init(std.heap.c_allocator);
    for (parsed_items) |item| {
        const items = item.object.get("topics").?.array.items;
        for (items) |single_item| {
            try mine.append(single_item.string);
        }
    }
    var hashmapmine = std.StringHashMap(u32).init(std.heap.page_allocator);
    const as_string: [][]const u8 = try mine.toOwnedSlice();
    for (as_string) |ok| {
        const existing_count = hashmapmine.get(ok);
        if (existing_count) |count| {
            hashmapmine.put(ok, count + 1) catch {};
        } else {
            hashmapmine.put(ok, 1) catch {};
        }
    }
    var asdf = hashmapmine.iterator();
    while (asdf.next()) |entry| {
        std.debug.print("{s}:{d}\n", .{ entry.key_ptr.*, entry.value_ptr.* });
    }
}
