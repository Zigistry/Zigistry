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
        std.debug.print("{d}\n", .{ entry.value_ptr.*});
    }
    hashmap.deinit();
}
