{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    # nixpkgs-stable.url = "github:NixOS/nixpkgs?ref=nixos-24.11";
  };

  outputs = inputs:
    inputs.flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = (import (inputs.nixpkgs) {
          inherit system;
          config = {
            allowUnfree = true;
          };
          overlays = [
            (final: prev: {
              nodejs = prev.nodejs_24;
            })
          ];
        });

        inherit (pkgs) lib;

        toShellVarRaw = name: value:
          lib.throwIfNot (lib.isValidPosixName name)
            "toShellVarRaw: ${name} is not a valid shell variable name"
            "${name}=${value}";
        toShellVarsRaw = envs: lib.concatStringsSep " " (lib.mapAttrsToList toShellVarRaw envs);

        mkScript = name: text: pkgs.writeTextFile {
          inherit name;
          executable = true;
          destination = "/bin/${name}";
          text = ''
            #!${pkgs.runtimeShell}
            ${text}
          '';
          meta.mainProgram = name;
        };
        passArgs = target: ''${target} "$@"'';
        passEnvs = envs: command: "pass-env ${toShellVarsRaw envs} ${command}";

        aoc = { AOC_SESSION = "keys/aoc"; };

        # Define your scripts/aliases
        scripts = [
          (mkScript "aoc"  (passEnvs aoc (passArgs "./cli/aoc")))
        ];
      in {

        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            go
            cobra-cli
            zig
          ];

          nativeBuildInputs = scripts;
        };

      }
    );
}
