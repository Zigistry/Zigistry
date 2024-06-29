const std = @import("std");
const writer = std.io.getStdOut().writer();
const file_functions = std.fs.cwd();
const file_names = [_][]const u8{ "a.json", "b.json", "c.json" };
const global_allocator = std.heap.page_allocator;

fn print(comptime format: []const u8, args: anytype) void {
    writer.print(format, args) catch return;
}

fn replace(allocator: std.mem.Allocator, str: []const u8, char_to_replace: u8, replace_with: u8) ![]const u8 {
    var arr = std.ArrayList(u8).init(allocator);
    errdefer arr.deinit();
    for (str) |char| try arr.append(if (char == char_to_replace) replace_with else char);
    return arr.toOwnedSlice();
}

fn print_json(x: []const u8, y: []const u8, comma: bool) void {
    print("\"{s}\":\"{s}\"", .{ x, y });
    if (comma) print(",", .{});
    print("\n", .{});
}

fn print_json_int(x: []const u8, y: i64, comma: bool) void {
    print("\"{s}\":{}", .{ x, y });
    if (comma) print(",", .{});
    print("\n", .{});
}

fn print_repos(items: []std.json.Value, last_file: bool) !void {
    for (items, 0..) |item, i| {
        print("\n{{\n", .{});
        print_json("name", item.object.get("name").?.string, true);
        print_json("full_name", item.object.get("full_name").?.string, true);
        const desc = if (item.object.get("description").? == .string)
            try replace(global_allocator, item.object.get("description").?.string, '"', '\'')
            else "This repository has no description.";
        if (desc != "This repository has no description.") defer global_allocator.free(desc);
        print_json("description", desc, true);
        print_json_int("watchers_count", item.object.get("watchers_count").?.integer, true);
        print_json_int("forks_count", item.object.get("forks_count").?.integer, true);
        print_json_int("open_issues", item.object.get("open_issues").?.integer, true);
        print_json_int("stargazers_count", item.object.get("stargazers_count").?.integer, true);
        print_json("tags_url", item.object.get("tags_url").?.string, true);
        print_json("created_at", item.object.get("created_at").?.string, true);
        print_json("avatar_url", item.object.get("owner").?.object.get("avatar_url").?.string, false);
        print(if (last_file and i == items.len - 1) "}}\n" else "}},", .{});
    }
}

pub fn main() !void {
    print("[", .{});
    for (file_names, 0..) |file_name, i| {
        const file = try file_functions.openFile(file_name, .{});
        const buf = try file.readToEndAlloc(global_allocator, try file.getEndPos());
        defer global_allocator.free(buf);
        const parsed = try std.json.parseFromSlice(std.json.Value, global_allocator, buf, .{});
        defer parsed.deinit();
        const items = parsed.value.object.get("items").?.array.items;
        try print_repos(items, i == file_names.len - 1);
    }
    print("]", .{});
}
