//! By convention, root.zig is the root source file when making a library.
const std = @import("std");

pub fn getInput(allocator: std.mem.Allocator) ![]u8 {
    const file = try std.fs.cwd().openFile("./input.txt", .{});
    defer file.close();

    const file_size = try file.getEndPos();

    const buffer = try allocator.alloc(u8, file_size);
    const num_bytes = try file.read(buffer);

    if (num_bytes != file_size) {
        return error.Unknown;
    }

    return buffer;
}
