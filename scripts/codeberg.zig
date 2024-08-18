const std = @import("std");
const hp = @import("helperFunctions");
// https://codeberg.org/api/v1/repos/search?q=zig
pub fn main() !void {
    hp.print("[", .{});
    const res = try hp.fetchNormal(hp.globalAllocator, "https://codeberg.org/api/v1/repos/search?q=zig");
    if (std.mem.eql(u8, "", res)) {
        @panic("can't connect to codeberg.");
    }
    const parsed = try std.json.parseFromSlice(std.json.Value, hp.globalAllocator, res, .{});
    const resu = parsed.value.object.get("data").?.array.items;
    try hp.compressAndPrintReposBerg(resu, true);
    hp.print("]", .{});
}
