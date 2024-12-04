const std = @import("std");
const hp = @import("helperFunctions");
const allocator = std.heap.c_allocator;

pub fn main() void {
    const res = hp.fetchNormal(allocator, "https://codeberg.org/api/v1/repos/search?q=zig");
    defer allocator.free(res);
    if (std.mem.eql(u8, "", res)) {
        @panic("Can't connect to codeberg.");
    }
    const parsed = std.json.parseFromSlice(std.json.Value, allocator, res, .{}) catch {
        @panic("Wrong json");
    }
    defer parsed.deinit();

    const data = parsed.value.object.get("data").?.array.items; 

    hp.print("[", .{});
    hp.compressAndPrintReposBerg(allocator, data, true);
    hp.print("]", .{});
}
