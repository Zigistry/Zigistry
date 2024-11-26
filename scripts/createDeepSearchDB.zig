const std = @import("std");
const helperFunctions = @import("helperFunctions");

pub fn main() void {
    const allocator = std.heap.c_allocator;
    const db = std.fs.cwd().readFileAlloc(allocator, "./database/main.json", 100_000_000_000) catch @panic("Can't read file.");
    defer allocator.free(db);
    // parse the json
    const json = std.json.parseFromSlice(std.json.Value, allocator, db, .{}) catch @panic("Json is in wrong format.");
    defer json.deinit();
    const all_items = json.value.array.items;
    helperFunctions.print("{{", .{});
    for (all_items, 0..) |item, i| {
        const full_name = std.ascii.allocLowerString(allocator, item.object.get("full_name").?.string) catch @panic("Can't lower case.");
        defer allocator.free(full_name);
        const description = std.ascii.allocLowerString(allocator, item.object.get("description").?.string) catch @panic("Can't lower case.");
        defer allocator.free(description);
        helperFunctions.print("\"{s}\":\"{s} ", .{ full_name, description });

        const url_to_fetch = helperFunctions.concatenate(allocator, "https://raw.githubusercontent.com/", full_name, "/master/README.md");
        defer allocator.free(url_to_fetch);

        const result = helperFunctions.fetchNormal(allocator, url_to_fetch);
        defer allocator.free(result);

        var previous_char: u8 = ' ';

        const result_truncated = switch (result.len) {
            0...7000 => result,
            else => result[0..7000],
        };
        for (result_truncated) |char| {
            // I have added heavy compression onto this to make sure I don't exceed the 1mb limit.
            // The following will also optimize the search results.
            // The search database will be purer.
            switch (char) {
                ' ', '\n' => if (previous_char != ' ' and previous_char != '\n') helperFunctions.print(" ", .{}),
                'A'...'Z' => helperFunctions.print("{c}", .{char | 0b00100000}), // 0b00100000 magic number for lower caseing
                'a'...'z', '0'...'9' => helperFunctions.print("{c}", .{char}),
                else => {},
            }
            previous_char = char;
        }
        if (all_items.len - 1 != i) {
            helperFunctions.print("\",", .{});
        } else {
            helperFunctions.print("\"}}", .{});
        }
    }
}
