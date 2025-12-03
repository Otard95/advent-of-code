//! By convention, root.zig is the root source file when making a library.
const std = @import("std");

const ReaderType = std.fs.File.Reader;

pub const ReadByLineIterator = struct {
    file: std.fs.File,
    file_reader: std.fs.File.Reader,
    buffer: []u8,
    allocator: std.mem.Allocator,

    pub fn next(self: *@This()) !?[]u8 {
        return self.file_reader.interface.takeDelimiter('\n');
    }

    pub fn deinit(self: *@This()) void {
        self.file.close();
        self.allocator.free(self.buffer);
    }
};

// Iterate over the lines in the file using a buffered reader.
// Caller is responsible for calling deinit() on returned iterator when done.
fn iterLines(filename: []const u8, allocator: std.mem.Allocator) !ReadByLineIterator {
    var file = try std.fs.cwd().openFile(filename, .{});

    const buffer = try allocator.alloc(u8, 1024);
    const file_reader = file.reader(buffer);

    return ReadByLineIterator{
        .file = file,
        .file_reader = file_reader,
        .buffer = buffer,
        .allocator = allocator,
    };
}

fn readAll(fileName: []u8, allocator: std.mem.Allocator) ![]u8 {
    const file = try std.fs.cwd().openFile(fileName, .{});
    defer file.close();

    const file_size = try file.getEndPos();

    const buffer = try allocator.alloc(u8, file_size);
    const num_bytes = try file.read(buffer);

    if (num_bytes != file_size) {
        return error.Unknown;
    }

    return buffer;
}

pub fn getInputLines(allocator: std.mem.Allocator) !ReadByLineIterator {
    return iterLines("./input.txt", allocator);
}
pub fn getInput(allocator: std.mem.Allocator) ![]u8 {
    return readAll("./input.txt", allocator);
}

pub fn getTestInputLines(allocator: std.mem.Allocator) !ReadByLineIterator {
    return iterLines("./test.txt", allocator);
}
pub fn getTestInput(allocator: std.mem.Allocator) ![]u8 {
    return readAll("./test.txt", allocator);
}
