#!/usr/bin/env bash

# shellcheck disable=SC1090
# shellcheck disable=SC2046
source $(dirname "$0")/package-builder.sh

# Build the legacy (view engine) npm packages into dist/packages-dist
buildTargetPackages "dist" "Production"