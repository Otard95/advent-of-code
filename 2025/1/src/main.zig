const std = @import("std");
const zig = @import("zig");

pub fn main() !void {
    var lines = try zig.getInputLines(std.heap.page_allocator);

    std.debug.print("Part 1: {d}\n", .{try solvePart1(&lines)});
    lines.deinit();

    lines = try zig.getInputLines(std.heap.page_allocator);
    defer lines.deinit();

    std.debug.print("Part 2: {d}\n", .{try solvePart2(&lines)});
}

const expectEqual = std.testing.expectEqual;
test "expect the result of part 1 to be 3" {
    var lines = try zig.getTestInputLines(std.testing.allocator);
    defer lines.deinit();

    try expectEqual(3, (try solvePart1(&lines)));
}

test "expect the result of part 2 to be 6" {
    var lines = try zig.getTestInputLines(std.testing.allocator);
    defer lines.deinit();

    try expectEqual(6, (try solvePart2(&lines)));
}

fn solvePart1(lines: *zig.ReadByLineIterator) !u32 {
    var pos: i32 = 50;
    var count: u32 = 0;

    while (try lines.next()) |line| {
        pos += try parseRotation(line);
        pos = try std.math.rem(i32, pos + 10000, 100);
        if (pos == 0) {
            count += 1;
        }
    }

    return count;
}

fn solvePart2(lines: *zig.ReadByLineIterator) !u32 {
    var pos: i32 = 50;
    var count: u32 = 0;

    while (try lines.next()) |line| {
        const prevPos = pos;
        pos += try parseRotation(line);

        if (pos < 1) {
            count += @intCast((try std.math.divCeil(i32, pos, 100)) * -1 + if (prevPos > 0) @as(i32, 1) else @as(i32, 0));
        }
        if (pos > 99) {
            count += try std.math.divFloor(u32, @intCast(pos), 100);
        }

        pos = try std.math.rem(i32, pos + 100000, 100);
    }

    return count;
}

const RotationErrors = error{
    InvalidRotationString,
    InvalidRotationDirection,
};
fn parseRotation(rot: []u8) !i32 {
    if (rot.len < 2) {
        return RotationErrors.InvalidRotationString;
    }

    const dir = rot[0];
    if (dir != 'R' and dir != 'L') {
        return RotationErrors.InvalidRotationString;
    }

    const numericString = rot[1..rot.len];
    var num = try std.fmt.parseInt(i32, numericString, 10);

    if (dir == 'L') {
        num = -1 * num;
    }

    return num;
}
