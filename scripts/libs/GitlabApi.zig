const std = @import("std");
const fp = @import("functionsProvider.zig");
pub const Iterator = @import("GitlabApiIterator.zig");

const host = "gitlab.com";

pub const ProjectDetails = struct {
    id: usize,
    license: ?struct {
        key: []const u8,
    },
    license_url: ?[]const u8,

    const url_tpl = "https://{s}/api/v4/projects/{d}?license=yes&statistics=yes";
    pub fn fetch(allocator: std.mem.Allocator, id: usize) !std.json.Parsed(@This()) {
        const url = try std.fmt.allocPrint(allocator, url_tpl, .{
            host,
            id,
        });
        defer allocator.free(url);
        return JsonApi(@This()).fetch(allocator, url);
    }
};

pub const Issues = struct {
    const List = []const @This();

    const url_tpl = "https://{s}/api/v4/projects/{d}/issues";
    pub fn fetch(allocator: std.mem.Allocator, id: usize) !std.json.Parsed(List) {
        const url = try std.fmt.allocPrint(allocator, url_tpl, .{
            host,
            id,
        });
        defer allocator.free(url);
        return JsonApi(List).fetch(allocator, url);
    }
};

pub fn JsonApi(T: type) type {
    return struct {
        const Parsed = std.json.Parsed(T);
        pub fn fetch(allocator: std.mem.Allocator, url: []const u8) !Parsed {
            const txt = fp.fetchNormal(allocator, url);
            return parse(allocator, txt);
        }

        pub fn parse(allocator: std.mem.Allocator, txt: []const u8) !Parsed {
            return try std.json.parseFromSlice(
                T,
                allocator,
                txt,
                .{ .ignore_unknown_fields = true },
            );
        }
    };
}