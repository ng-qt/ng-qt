#!/usr/bin/env bash

set -u -e -o pipefail

cd "$(dirname "$0")"

# basedir is the workspace root
readonly base_dir=$(pwd)/..

# We need to resolve the Bazel binary in the node modules because running Bazel
# through `yarn bazel` causes additional output that throws off command stdout.
readonly bazel_bin=$(yarn bin)/bazel
readonly bin=$(${bazel_bin} info bazel-bin)

function buildTargetPackages() {
  # List of targets to build, e.g. core, common, compiler, etc. Note that we want to
  # remove all carriage return ("\r") characters form the query output because otherwise
  # the carriage return is part of the bazel target name and bazel will complain.
  targets=$(${bazel_bin} query --output=label 'attr("tags", "\[.*release-with-framework.*\]", //packages/...) intersect kind(".*_package", //packages/...)' | tr -d "\r")

  # Path to the output directory into which we copy the npm packages.
  dest_path="$1"

  # Human-readable description of the build.
  desc="$2"

  echo "##################################"
  echo "scripts/build-packages-dist.sh:"
  echo "  building @ng-qt/* npm packages"
  echo "  mode: ${desc}"
  echo "##################################"

  # Use --config=release so that snapshot builds get published with embedded version info
  echo "$targets" | xargs ${bazel_bin} build --config=release

  [[ -d "${base_dir}/${dest_path}" ]] || mkdir -p ${base_dir}/${dest_path}

  dirs=`echo "$targets" | sed -e 's/\/\/packages\/\(.*\):npm/\1/'`

  for pkg in ${dirs}; do
    # Skip any that don't have an "npm_package" target
    src_dir="${bin}/packages/${pkg}/npm"
    dest_dir="${base_dir}/${dest_path}/${pkg}"
    if [[ -d ${src_dir} ]]; then
      echo "# Copy artifacts to ${dest_dir}"
      rm -rf ${dest_dir}
      cp -R ${src_dir} ${dest_dir}
      chmod -R u+w ${dest_dir}
    fi
  done
}