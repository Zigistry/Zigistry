const std = @import("std");
const print = std.debug.print;

fn print_repos(my_items: []std.json.Value) !void {
    for (my_items, 0..) |item, i| {
        print("\n{{\n", .{});
        print("  \"name\": \"{s}\",\n", .{item.object.get("name").?.string});
        print("  \"full_name\" : \"{s}\",\n", .{item.object.get("full_name").?.string});
        if (item.object.get("description").? == .string) {
            print("  \"description\":\"{s}\",\n", .{item.object.get("description").?.string});
        } else {
            print("  \"description\":\"{s}\",\n", .{"This repo has no desciption."});
        }
        print("  \"watchers_count\" :{},\n", .{item.object.get("watchers_count").?.integer});
        print("  \"forks_count\":{},\n", .{item.object.get("forks_count").?.integer});
        print("  \"open_issues\":{},\n", .{item.object.get("open_issues").?.integer});
        print("  \"stargazers_count\":{},\n", .{item.object.get("stargazers_count").?.integer});
        print("  \"tags_url\",\"{s}\",\n", .{item.object.get("tags_url").?.string});
        print("  \"owner\":{{\n    \"avatar_url\": \"{s}\" \n  }}\n", .{item.object.get("owner").?.object.get("avatar_url").?.string});
        print("  \"created_at\": \"{s}\"\n", .{item.object.get("created_at").?.string});
        if (i == my_items.len - 1) {
            print("}}\n", .{});
        } else {
            print("}},\n", .{});
        }
    }
}

pub fn main() !void {
    const file_names = [4][]const u8{ "a.json", "b.json", "c.json" };
    print("[", .{});
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
    print("]", .{});
}
