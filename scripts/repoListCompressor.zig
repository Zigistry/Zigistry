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
    const allocator = std.heap.c_allocator;
    var args = std.process.args();
    _ = args.skip();
    const fileName: []const u8 = args.next().?;

    var raw_json_data: [50000]u8 = undefined;
    var raw_json_data_length: u16 = 0;
    const selection: u8 =
        if (std.mem.eql(u8, "games", fileName))
        0
    else if (std.mem.eql(u8, "web", fileName))
        1
    else
        2;
    raw_json_data[raw_json_data_length] = '[';
    raw_json_data_length += 1;
    for (0.., topic_urls[selection]) |i, url| {
        const res = helperFunctions.fetch(allocator, url);
        defer allocator.free(res);
        if (!std.mem.eql(u8, res, "")) {
            for (res) |char| {
                raw_json_data[raw_json_data_length] = char;
                // std.debug.print("{}\n", .{raw_json_data_length});
                raw_json_data_length += 1;
            }
            if (topic_urls[selection].len - 1 != i) {
                raw_json_data[raw_json_data_length] = ',';
                raw_json_data_length += 1;
            }
        } else @panic("unable to reach url");
    }
    raw_json_data[raw_json_data_length] = ']';
    raw_json_data_length += 1;

    const result = raw_json_data[0..raw_json_data_length];
    const jsonParsed = std.json.parseFromSlice(std.json.Value, allocator, result, .{}) catch @panic("Json is in wrong format.");
    defer jsonParsed.deinit();
    helperFunctions.print("[", .{});
    helperFunctions.compressAndPrintRepos(std.heap.page_allocator, jsonParsed.value.array.items, true);
    helperFunctions.print("]", .{});
}
