const std = @import("std");
const writer = std.io.getStdOut().writer();

const START = @embedFile("./sitemap_start.txt");
const PACKAGES_JSON = @embedFile("./main.json");
const PROGRAMS_JSON = @embedFile("./programs.json");

const UPDATED_AT = "2025-01-08T22:06:26+00:00";

const END = "</urlset>";

const FORMAT_PACKAGES =
    \\<url>
    \\  <loc>https://zigistry.dev/packages/{s}/</loc>
    \\  <lastmod>{s}</lastmod>
    \\  <priority>0.80</priority>
    \\</url>
;

const FORMAT_PROGRAMS =
    \\<url>
    \\  <loc>https://zigistry.dev/programs/{s}/</loc>
    \\  <lastmod>{s}</lastmod>
    \\  <priority>0.80</priority>
    \\</url>
;

pub fn main() !void {
    const actual_result = try std.mem.replaceOwned(u8, std.heap.c_allocator, START, "§", UPDATED_AT);
    try writer.print("{s}\n", .{actual_result});

    const packages_json = try std.json.parseFromSlice(std.json.Value, std.heap.c_allocator, PACKAGES_JSON, .{});
    const programs_json = try std.json.parseFromSlice(std.json.Value, std.heap.c_allocator, PROGRAMS_JSON, .{});
    for (packages_json.value.array.items) |repo| {
        const package_name = repo.object.get("full_name").?.string;
        try writer.print(FORMAT_PACKAGES, .{ package_name, UPDATED_AT });
    }

    for (programs_json.value.array.items) |repo| {
        const program_name = repo.object.get("full_name").?.string;
        try writer.print(FORMAT_PROGRAMS, .{ program_name, UPDATED_AT });
    }

    try writer.print("\n{s}\n", .{END});
}
