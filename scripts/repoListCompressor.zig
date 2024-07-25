const std = @import("std");
const helperFunctions = @import("helperFunctions");

const topic_urls = [3][5][]const u8{
    // Games
    .{
        "https://api.github.com/repos/Not-Nik/raylib-zig",
        "https://api.github.com/repos/hexops/mach",
        "https://api.github.com/repos/zig-gamedev/zig-gamedev",
        "https://api.github.com/repos/Jack-Ji/jok",
        "https://api.github.com/repos/prime31/zig-gamekit",
    },
    // Web
    .{
        "https://api.github.com/repos/zigzap/zap",
        "https://api.github.com/repos/jetzig-framework/jetzig",
        "https://api.github.com/repos/karlseguin/http.zig",
        "https://api.github.com/repos/karlseguin/websocket.zig",
        "https://api.github.com/repos/ikskuh/zig-network",
    },
    // Gui
    .{
        "https://api.github.com/repos/capy-ui/capy",
        "https://api.github.com/repos/david-vanderson/dvui",
        "https://api.github.com/repos/kassane/qml_zig",
        "https://api.github.com/repos/MoAlyousef/zfltk",
        "https://api.github.com/repos/Aransentin/ZWL",
    },
};

pub fn fetch(allocator: std.mem.Allocator, url: []const u8) ![]const u8 {
    var charBuffer = std.ArrayList(u8).init(allocator);
    var client = std.http.Client{ .allocator = allocator };
    const fetchOptions = std.http.Client.FetchOptions{
        .location = std.http.Client.FetchOptions.Location{
            .url = url,
        },
        .method = .GET,
        .response_storage = .{ .dynamic = &charBuffer },
    };
    const result = try client.fetch(fetchOptions);
    if (result.status == .ok) {
        return try charBuffer.toOwnedSlice();
    } else {
        return "";
    }
}

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var args = std.process.args();
    _ = args.skip();
    const fileName: []const u8 = args.next().?;

    var raw_json_data = std.ArrayList(u8).init(allocator);
    var selection:u8=3;
    if (std.mem.eql(u8, "games", fileName)) {
        selection=0;
    } else if (std.mem.eql(u8, "web", fileName)) {
        selection=1;
    } else {
        selection=2;
    }
    try raw_json_data.append('[');
    for (0.., topic_urls[selection]) |i, url| {
        const res = try fetch(allocator, url);
        if (!std.mem.eql(u8, res, "")) {
            for(res)|char|{
                try raw_json_data.append(char);
            }
            if (topic_urls.len - 1 != i) {
                try raw_json_data.append(',');
            }
        } else {
            @panic("unable to reach url");
        }
    }
    try raw_json_data.append(']');

    const result = try raw_json_data.toOwnedSlice();
    const jsonParsed = try std.json.parseFromSlice(std.json.Value, allocator, result, .{});
    try helperFunctions.compressAndPrintRepos(jsonParsed.value.array.items, true);
}
