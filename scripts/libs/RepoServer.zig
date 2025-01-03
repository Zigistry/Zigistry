const std = @import("std");

pub const RepoServer = enum(u8) {
    Github = 0,
    Codeberg = 1,
    Gitlab = 2,
    pub fn rawFileUrl(self: RepoServer, allocator: std.mem.Allocator, repo: []const u8, branch: []const u8, file: []const u8) []const u8 {
        const parts: []const []const u8 = switch (self) {
            .Github => &.{
                "https://raw.githubusercontent.com/",
                repo,
                branch,
                file,
            },
            .Gitlab => &.{
                "https://gitlab.com",
                repo,
                "-/raw",
                branch,
                file,
            },
            .Codeberg => &.{
                "https://codeberg.org",
                repo,
                "raw/branch",
                branch,
                file,
            },
        };
        return std.mem.join(allocator, "/", parts)
            catch @panic("Out Of Memory");
    }
};
