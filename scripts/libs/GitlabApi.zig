const std = @import("std");
const fp = @import("functionsProvider.zig");
pub const Iterator = @import("GitlabApiIterator.zig");

pub const Projects = struct {
    id: usize,
    path_with_namespace: []const u8,
    path: []const u8,
    description: ?[]const u8 = null,
    star_count: usize,

    last_activity_at: []const u8,
    created_at: []const u8,

    forks_count: ?usize = null,
    default_branch: ?[]const u8 = null,

    forked_from_project: ?std.json.Value = null,
    topics: ?[]const []const u8 = null,

    archived: ?bool = null,
    avatar_url: ?[]const u8 = null,
    namespace: ?struct {
        avatar_url: ?[]const u8 = null,
    } = null,
};

pub const ProjectDetails = struct {
    id: usize,
    license: ?struct {
        key: []const u8,
    } = null,
    license_url: ?[]const u8 = null,
    statistics: ?struct {
        repository_size: usize,
    } = null,

    const url_tpl = "https://{s}/api/v4/projects/{d}?license=yes&statistics=yes";
    pub fn fetch(allocator: std.mem.Allocator, id: usize) !std.json.Parsed(@This()) {
        const url = try std.fmt.allocPrint(allocator, url_tpl, .{
            fp.RepoServer.Gitlab.hostname(),
            id,
        });
        defer allocator.free(url);
        return JsonApi(@This()).fetch(allocator, url);
    }
};

pub const Issues = struct {
    id: usize = 1,
    const List = []const @This();

    const url_tpl = "https://{s}/api/v4/projects/{d}/issues?state=opened";
    pub fn fetch(allocator: std.mem.Allocator, id: usize) !std.json.Parsed(List) {
        const url = try std.fmt.allocPrint(allocator, url_tpl, .{
            fp.RepoServer.Gitlab.hostname(),
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
            return parse(allocator, txt) catch |e| {
                std.log.err("Unable to parse into {s}:\n{s}\n", .{
                    @typeName(T),
                    txt,
                });
                return e;
            };
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
