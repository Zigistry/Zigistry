//!======================================================================
//!              The games.json web.json gui.json creator
//!======================================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This file downloads and *compresses json from gh api
//! and stores it inside games.json, web.json and gui.json.
//!
//! * : By compressed I mean removing uneeded feilds from the json and
//!     storing it inside games.json, gui.json and web.json by doing:
//!
//! $ zig build run_repoListCompressor -- web > ./database/web.json
//! $ zig build run_repoListCompressor -- gui > ./database/gui.json
//! $ zig build run_repoListCompressor -- games > ./database/games.json
//!=======================================================================

// =======================
//         Imports
// =======================
const std = @import("std");
const helperFunctions = @import("helperFunctions");

// =======================
//        Constants
// =======================

// ---------- Please Update if needed -----------
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
        "https://api.github.com/repos/webui-dev/zig-webui",
        "https://api.github.com/repos/david-vanderson/dvui",
        "https://api.github.com/repos/kassane/qml_zig",
        "https://api.github.com/repos/MoAlyousef/zfltk",
    },
};

// =======================
//          Main
// =======================
pub fn main() !void {
    var args = std.process.args();
    _ = args.skip();
    const fileName: []const u8 = args.next().?;

    var raw_json_data = std.ArrayList(u8).init(helperFunctions.globalAllocator);
    defer raw_json_data.deinit();
    const selection: u8 =
        if (std.mem.eql(u8, "games", fileName))
        0
    else if (std.mem.eql(u8, "web", fileName))
        1
    else
        2;
    try raw_json_data.append('[');
    for (0.., topic_urls[selection]) |i, url| {
        const res = try helperFunctions.fetch(helperFunctions.globalAllocator, url);
        defer helperFunctions.globalAllocator.free(res);
        if (!std.mem.eql(u8, res, "")) {
            for (res) |char| {
                try raw_json_data.append(char);
            }
            if (topic_urls[selection].len - 1 != i) {
                try raw_json_data.append(',');
            }
        } else {
            @panic("unable to reach url");
        }
    }
    try raw_json_data.append(']');

    const result = try raw_json_data.toOwnedSlice();
    defer helperFunctions.globalAllocator.free(result);
    const jsonParsed = try std.json.parseFromSlice(std.json.Value, helperFunctions.globalAllocator, result, .{});
    defer jsonParsed.deinit();
    helperFunctions.print("[", .{});
    try helperFunctions.compressAndPrintRepos(jsonParsed.value.array.items, true);
    helperFunctions.print("]", .{});
}
