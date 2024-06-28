const std = @import("std");
const writer = std.io.getStdOut().writer();


fn print_repos(my_items: []std.json.Value) !void {
    for (my_items, 0..) |item, i| {
        try writer.print("\n{{\n", .{});
        try writer.print("  \"name\": \"{s}\",\n", .{item.object.get("name").?.string});
        try writer.print("  \"full_name\" : \"{s}\",\n", .{item.object.get("full_name").?.string});
        if (item.object.get("description").? == .string) {
            try writer.print("  \"description\":\"{s}\",\n", .{item.object.get("description").?.string});
        } else {
            try writer.print("  \"description\":\"{s}\",\n", .{"This repo has no desciption."});
        }
        try writer.print("  \"watchers_count\" :{},\n", .{item.object.get("watchers_count").?.integer});
        try writer.print("  \"forks_count\":{},\n", .{item.object.get("forks_count").?.integer});
        try writer.print("  \"open_issues\":{},\n", .{item.object.get("open_issues").?.integer});
        try writer.print("  \"stargazers_count\":{},\n", .{item.object.get("stargazers_count").?.integer});
        try writer.print("  \"tags_url\",\"{s}\",\n", .{item.object.get("tags_url").?.string});
        try writer.print("  \"owner\":{{\n    \"avatar_url\": \"{s}\" \n  }}\n", .{item.object.get("owner").?.object.get("avatar_url").?.string});
        try writer.print("  \"created_at\": \"{s}\"\n", .{item.object.get("created_at").?.string});
        if (i == my_items.len - 1) {
            try writer.print("}}\n", .{});
        } else {
            try writer.print("}},\n", .{});
        }
    }
}

pub fn main() !void {
    const file_names = [3][]const u8{ "a.json", "b.json", "c.json" };
    try writer.print("[", .{});
    for (file_names) |file_name| {
        const file = try std.fs.cwd().openFile(file_name, .{});
        const buf_alloc = std.heap.page_allocator;
        const buf = try file.readToEndAlloc(buf_alloc, try file.getEndPos());
        defer buf_alloc.free(buf);
        const parsed = try std.json.parseFromSlice(
            std.json.Value,
            std.heap.page_allocator,
            buf,
            .{},
        );
        defer parsed.deinit();
        const my_items = parsed.value.object.get("items").?.array.items;
        try print_repos(my_items);
    }
    try writer.print("]", .{});
}
