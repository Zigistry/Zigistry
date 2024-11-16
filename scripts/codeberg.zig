const std = @import("std");
const hp = @import("helperFunctions");
// https://codeberg.org/api/v1/repos/search?q=zig
pub fn main() !void {
    hp.print("[", .{});
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer {
        const deinit_status = gpa.deinit();
        if (deinit_status == .leak) @panic("The code doesn't contain any memory leaks.");
    }
    const res = try hp.fetchNormal(allocator, "https://codeberg.org/api/v1/repos/search?q=zig");
    defer allocator.free(res);
    if (std.mem.eql(u8, "", res)) {
        @panic("can't connect to codeberg.");
    }
    const parsed = try std.json.parseFromSlice(std.json.Value, allocator, res, .{});
    defer parsed.deinit();
    const resu = parsed.value.object.get("data").?.array.items;
    try hp.compressAndPrintReposBerg(allocator, resu, true);
    hp.print("]", .{});
}
