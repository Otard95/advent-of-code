#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
#include <errno.h>

#define SCU_SB_IMPLEMENTATION
#include "../scu/scu_string_builder.h"
#define SCU_SV_IMPLEMENTATION
#include "../scu/scu_string_view.h"

#define return_defer(res) \
  do {                    \
    result = res;         \
    goto defer;           \
  } while (0)             

void usage(const char *program) {
  printf("Usage: %s <input>\n", program);
}

bool read_entire_file(const char *path, Scu_String_Builder *sb) {
  bool result = true;

  FILE *file = fopen(path, "rb");
  if (!file) {
    printf("Failed to open file %s\n", path);
    return_defer(false);
  }

  fseek(file, 0, SEEK_END);
  size_t size = ftell(file);
  rewind(file);

  char *buffer = malloc(size);
  if (!buffer) {
    printf("Failed to allocate %zu bytes\n", size);
    return_defer(false);
  }

  size_t n = fread(buffer, 1, size, file);
  if (ferror(file)) {
    printf("Failed to read file %s: %s\n", path, strerror(errno));
    return_defer(false);
  }
  if (n != size) {
    printf("Failed to read entire file %s\n", path);
    return_defer(false);
  }

  scu_sb_append(sb, buffer, size);

defer:
  if (file != NULL) fclose(file);
  return result;
}

int main(int argc, char *argv[]) {
  if (argc < 2) {
    usage(argv[0]);
    printf("No input file specified\n");
    return 1;
  }

  const char *input = argv[1];

  Scu_String_Builder sb_input = {0};
  if (!read_entire_file(input, &sb_input)) {
    return 1;
  }

  Scu_String_View sv_input = scu_sv_from_buffer(sb_input.buf, sb_input.len);

  while (sv_input.len > 0) {
    Scu_String_View line = scu_sv_chop_by_delim(&sv_input, '\n');
    printf("-- "SCU_SV_Fmt" --\n", SCU_SV_Arg(line));
  }

  return 0;
}
