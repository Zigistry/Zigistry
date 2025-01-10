const std = @import("std");
const hp = @import("helperFunctions");
const allocator = std.heap.c_allocator;

const gitlab_url = "https://gitlab.com/api/v4/projects?order_by=last_activity_at&per_page=100&license=yes&topic=zig";

pub fn main() !void {
    var iter = hp.GitlabApi.Iterator.init(allocator, gitlab_url);
    hp.print("[", .{});
    while (try iter.next()) |res| {
        defer allocator.free(res);
        if (std.mem.eql(u8, "", res)) {
            @panic("Can't connect to gitlab.");
        }
        const parsed = std.json.parseFromSlice(std.json.Value, allocator, res, .{}) catch {
            @panic("Wrong json");
        };
        defer parsed.deinit();

        const data = parsed.value.array.items;

        hp.compressAndPrintReposGitlab(allocator, data, iter.url == null);
    }
    hp.print("]", .{});
}
