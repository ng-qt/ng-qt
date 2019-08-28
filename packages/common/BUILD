load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

ts_library(
  name = "common",
  module_name = "@ng-qt/common",
  srcs = glob(
    include = ["**/*.ts"],
    exclude = ["**/*.spec.ts"],
  ),
  deps = [
    "@npm//@angular/core",
    "@npm//@nodegui/nodegui",
    "@npm//change-case",
    "@npm//tslib",
  ],
)

npm_package(
  name = "npm",
  deps = [
    ":common",
  ],
  srcs = [
    "package.json",
  ],
)