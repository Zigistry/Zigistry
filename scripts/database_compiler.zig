const std = @import("std");
const helper_functions = @import("./libs/functions_provider.zig");

const file_names = [4][]const u8{ "a.json", "b.json", "c.json", "d.json" };

pub fn main() !void {
    helper_functions.print("[", .{});
    for (file_names, 0..) |file_name, i| {
        const file = try helper_functions.file_functions.openFile(file_name, .{});
        const buf = try file.readToEndAlloc(helper_functions.global_allocator, try file.getEndPos());
        defer helper_functions.global_allocator.free(buf);
        const parsed = try std.json.parseFromSlice(std.json.Value, helper_functions.global_allocator, buf, .{});
        defer parsed.deinit();
        const my_items = parsed.value.object.get("items").?.array.items;
        // If it is the last file
        if (i == file_names.len - 1) {
            try helper_functions.print_repos(my_items, true);
        } else {
            try helper_functions.print_repos(my_items, false);
        }
    }
    helper_functions.print("]", .{});
}
