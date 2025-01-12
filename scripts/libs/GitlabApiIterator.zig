const std = @import("std");

// ---- Fetch until gitlab pagination header ends
pub const GitlabPaginationIterator = @This();
allocator: std.mem.Allocator,
// the next url to fetch. finish if null
url: ?[]const u8,
// is the url owned and should be freed after the next fetch?
url_owned: bool = false,
pub fn init(allocator: std.mem.Allocator, url: []const u8) GitlabPaginationIterator {
    return .{
        .allocator = allocator,
        .url = url,
    };
}

pub fn deinit(self: *GitlabPaginationIterator) void {
    if (self.url_owned) self.allocator.free(self.url);
}

pub fn next(self: *GitlabPaginationIterator) !?[]const u8 {
    if (self.url == null) return null;
    var serverHeaderBuffer = std.mem.zeroes([4096]u8);
    var charBuffer = std.ArrayList(u8).init(self.allocator);
    errdefer charBuffer.deinit();
    var client = std.http.Client{ .allocator = self.allocator };
    defer client.deinit();
    const fetchOptions = std.http.Client.FetchOptions{
        .location = std.http.Client.FetchOptions.Location{
            .url = self.url.?,
        },
        .method = .GET,
        .response_storage = .{ .dynamic = &charBuffer },
        .server_header_buffer = &serverHeaderBuffer,
    };
    _ = client.fetch(fetchOptions) catch @panic("Internet issue.");
    var headers = std.http.HeaderIterator.init(&serverHeaderBuffer);
    if (self.url_owned) {
        self.allocator.free(self.url.?);
    }
    self.url = null;
    while (headers.next()) |h| {
        if (std.ascii.eqlIgnoreCase(h.name, "Link") and std.mem.indexOf(u8, h.value, "rel=\"next\"") != null) {
            const urlStart = std.mem.indexOfScalar(u8, h.value, '<');
            const urlEnd = std.mem.indexOfScalar(u8, h.value, '>');
            if (urlStart != null and urlEnd != null) {
                self.url_owned = true;
                self.url = try self.allocator.dupe(u8, h.value[urlStart.? + 1 .. urlEnd.?]);
            }
        }
    }
    return charBuffer.toOwnedSlice() catch @panic("Can't convert buffer to string");
}
