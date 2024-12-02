const std = @import("std");
const hp = @import("helperFunctions");
// https://codeberg.org/api/v1/repos/search?q=zig
pub fn main() void {
    hp.print("[", .{});
    const allocator = std.heap.c_allocator;
    const res = hp.fetchNormal(allocator, "https://codeberg.org/api/v1/repos/search?q=zig");
    defer allocator.free(res);
    if (std.mem.eql(u8, "", res)) {
        @panic("Can't connect to codeberg.");
    }
    const parsed = std.json.parseFromSlice(std.json.Value, allocator, res, .{}) catch @panic("Wrong json");
    defer parsed.deinit();
    const resu = parsed.value.object.get("data").?.array.items;
    hp.compressAndPrintReposBerg(allocator, resu, true);
    hp.print("]", .{});
}
