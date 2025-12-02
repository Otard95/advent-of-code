const std = @import("std");
const zig = @import("zig");

pub fn main() !void {
    const input = try zig.getInput(std.heap.page_allocator);
    std.debug.print("{s}", .{input});
}
