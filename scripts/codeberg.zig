const std = @import("std");
const hp = @import("helperFunctions");
// https://codeberg.org/api/v1/repos/search?q=zig
pub fn main() !void {
    hp.print("[");
    const res = try hp.fetch(hp.globalAllocator, "https://codeberg.org/api/v1/repos/search?q=zig");
    if(std.mem.eql(u8, "", res)){
        @panic("can't connect to codeberg.");
    }
    const parsed = try std.json.parseFromSlice(std.json.Value, hp.globalAllocator, res, .{});
    try hp.compressAndPrintReposBerg(parsed.value.object.get("data").?.array.items, true);
    hp.print("]");
}


