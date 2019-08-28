load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

ts_library(
  name = "core",
  module_name = "@ng-qt/core",
  srcs = glob(
    include = ["**/*.ts"],
    exclude = ["**/*.spec.ts"],
  ),
  deps = [
    "@npm//@nodegui/nodegui",
    "@npm//@angular/core",
    "@npm//@angular/platform-browser",
    "@npm//rxjs",
    "@npm//@types",
    "@npm//tslib",
    "//packages/common",
    "//packages/platform",
  ],
)

npm_package(
  name = "npm",
  deps = [
    ":core"
  ],
  srcs = [
    "package.json",
  ],
)