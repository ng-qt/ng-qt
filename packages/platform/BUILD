load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility=["//visibility:public"])

ts_library(
  name = "platform",
  module_name = "@ng-qt/platform",
  srcs = glob(
    include = ["**/*.ts"],
    exclude = ["**/*.spec.ts"],
  ),
  deps = [
    "//packages/common",
    "@npm//@angular/core",
    "@npm//@angular/common",
    "@npm//@angular/compiler",
    "@npm//@angular/platform-browser-dynamic",
    "@npm//@nodegui/nodegui",
    "@npm//@types",
    "@npm//zone.js",
    "@npm//tslib",
  ],
)

npm_package(
  name = "npm",
  deps = [
    ":platform"
  ],
  srcs = [
    "package.json",
  ],
)