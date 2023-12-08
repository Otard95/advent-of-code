#define NOB_IMPLEMENTATION
#include "./nob.h"

void usage(const char *program, Nob_Log_Level level) {
  nob_log(level, "Usage: %s <input>\n", program);
}

int main(int argc, char *argv[]) {
  const char *program = nob_shift_args(&argc, &argv);

  if (argc < 1) {
    usage(argv[0], NOB_ERROR);
    nob_log(NOB_ERROR, "No input file specified\n");
    return 1;
  }

  const char *input = nob_shift_args(&argc, &argv);

  // Implementation...

  return 0;
}
