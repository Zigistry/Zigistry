const std = @import("std");

pub const RepoServer = enum(u8) {
    Github = 0,
    Codeberg = 1,
    Gitlab = 2,

    pub fn hostname(self: RepoServer) []const u8 {
        return switch (self) {
            .Github => "raw.githubusercontent.com",
            .Gitlab => "gitlab.com",
            .Codeberg => "codeberg.org",
        };
    }

    pub fn rawFileUrl(self: RepoServer, allocator: std.mem.Allocator, repo: []const u8, branch: []const u8, file: []const u8) []const u8 {
        const netloc = std.mem.concat(allocator, u8, &.{
            "https://",
            self.hostname(),
        }) catch @panic("OOM");
        defer allocator.free(netloc);
        const parts: []const []const u8 = switch (self) {
            .Github => &.{
                netloc,
                repo,
                branch,
                file,
            },
            .Gitlab => &.{
                netloc,
                repo,
                "-/raw",
                branch,
                file,
            },
            .Codeberg => &.{
                netloc,
                repo,
                "raw/branch",
                branch,
                file,
            },
        };
        return std.mem.join(allocator, "/", parts) catch @panic("Out Of Memory");
    }
};
