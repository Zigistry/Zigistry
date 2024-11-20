const std = @import("std");
const helperFunctions = @import("helperFunctions");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer {
        const deinit_status = gpa.deinit();
        if (deinit_status == .leak) @panic("The code contains memory leaks.");
    }
    const db = try std.fs.cwd().readFileAlloc(allocator, "./database/main.json", 100_000_000_000);
    defer allocator.free(db);
    // parse the json
    const json = try std.json.parseFromSlice(std.json.Value, allocator, db, .{});
    defer json.deinit();
    const all_items = json.value.array.items;
    helperFunctions.print("{{", .{});
    for (all_items, 0..) |item, i| {
        std.debug.print("{}\n", .{i});
        const full_name = item.object.get("full_name").?.string;
        helperFunctions.print("\"{s}\"", .{full_name});
        const url_to_fetch = try helperFunctions.concatenate(allocator, "https://raw.githubusercontent.com/", full_name, "/master/README.md");
        defer allocator.free(url_to_fetch);
        const result = try helperFunctions.fetchNormal(allocator, url_to_fetch);
        defer allocator.free(result);
        const result_truncated = if (result.len > 10000) result[0..10000] else result;
        helperFunctions.print(":\"", .{});
        const description = item.object.get("description").?.string;
        helperFunctions.print("{s} ", .{description});
        for (result_truncated) |char| {
            switch (char) {
                '\n', '\r' => helperFunctions.print(" ", .{}),
                '"' => helperFunctions.print("'", .{}),
                '\\' => helperFunctions.print("╲", .{}),
                '	' => helperFunctions.print("  ", .{}),
                else => helperFunctions.print("{c}", .{std.ascii.toLower(char)}),
            }
        }
        if (i != all_items.len - 1) helperFunctions.print("\",", .{}) else helperFunctions.print("\"}}", .{});
    }
}
