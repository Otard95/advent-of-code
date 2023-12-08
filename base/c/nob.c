#define NOB_IMPLEMENTATION
#include "./nob.h"

#define SCU_SB_IMPLEMENTATION
#include "../scu/scu_string_builder.h"

#define CFLAGS "-Wall", "-Wextra", "-pedantic"

void build(void) {
  Nob_Cmd cmd = {0};

  nob_cmd_append(&cmd, "cc");
  nob_cmd_append(&cmd, CFLAGS);
  nob_cmd_append(&cmd, "-o", "pt1");
  nob_cmd_append(&cmd, "pt1.c");

  Nob_Proc proc_pt1 = nob_cmd_run_async(cmd);

  cmd.count = 0;

  nob_cmd_append(&cmd, "cc");
  nob_cmd_append(&cmd, CFLAGS);
  nob_cmd_append(&cmd, "-o", "pt2");
  nob_cmd_append(&cmd, "pt2.c");

  Nob_Proc proc_pt2 = nob_cmd_run_async(cmd);

  nob_proc_wait(proc_pt1);
  nob_proc_wait(proc_pt2);
}

void run(const char *part) {
  Scu_String_Builder sb_executable = {0};
  scu_sb_append_cstr(&sb_executable, "./");
  scu_sb_append_cstr(&sb_executable, part);
  const char *executable = scu_sb_to_cstr(&sb_executable);

  Nob_Cmd cmd = {0};

  nob_cmd_append(&cmd, executable);
  nob_cmd_append(&cmd, "./input.txt");

  if (!nob_cmd_run_sync(cmd)) {
    nob_log(NOB_ERROR, "Failed to run %s", executable);
    return;
  }
}

void test(const char *part) {
  Scu_String_Builder sb_executable = {0};
  scu_sb_append_cstr(&sb_executable, "./");
  scu_sb_append_cstr(&sb_executable, part);
  const char *executable = scu_sb_to_cstr(&sb_executable);

  Nob_Cmd cmd = {0};

  nob_cmd_append(&cmd, executable);
  nob_cmd_append(&cmd, "./test.txt");

  if (!nob_cmd_run_sync(cmd)) {
    nob_log(NOB_ERROR, "Failed to run %s", executable);
    return;
  }
}

int main(int argc, char *argv[]) {
  NOB_GO_REBUILD_URSELF(argc, argv);

  const char *program = nob_shift_args(&argc, &argv);

  build();

  if (argc >= 1) {
    const char *subcommand = nob_shift_args(&argc, &argv);
    if (strcmp(subcommand, "run") == 0) {
      if (argc >= 1) {
        char *part = nob_shift_args(&argc, &argv);
        run(part);
      } else {
        nob_log(NOB_ERROR, "Missing run argument");
        return 1;
      }
    } else if (strcmp(subcommand, "test") == 0) {
      if (argc >= 1) {
        char *part = nob_shift_args(&argc, &argv);
        test(part);
      } else {
        nob_log(NOB_ERROR, "Missing test argument");
        return 1;
      }
    } else {
      nob_log(NOB_ERROR, "Unknown subcommand: %s", subcommand);
      return 1;
    }
  }

  return 0;
}
