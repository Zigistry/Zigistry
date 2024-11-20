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
        const full_name = try std.ascii.allocLowerString(allocator, item.object.get("full_name").?.string);
        defer allocator.free(full_name);
        const description = try std.ascii.allocLowerString(allocator, item.object.get("description").?.string);
        defer allocator.free(description);
        helperFunctions.print("\"{s}\":\"{s} ", .{ full_name, description });

        const url_to_fetch = try helperFunctions.concatenate(allocator, "https://raw.githubusercontent.com/", full_name, "/master/README.md");
        defer allocator.free(url_to_fetch);

        const result = try helperFunctions.fetchNormal(allocator, url_to_fetch);
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
