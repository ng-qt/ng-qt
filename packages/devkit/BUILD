load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

ts_library(
  name = "devkit",
  module_name = "@ng-qt/devkit",
  srcs = glob(
    include = ["**/*.ts"],
    exclude = ["**/*.spec.ts"],
  ),
  deps = [
    "//packages/common",
    "@npm//@angular-devkit",
    "@npm//@schematics/angular",
    "@npm//copy-webpack-plugin",
    "@npm//typescript",
    "@npm//webpack",
    "@npm//tsconfig-paths-webpack-plugin",
    "@npm//fork-ts-checker-webpack-plugin",
    "@npm//circular-dependency-plugin",
    "@npm//webpack-merge",
    "@npm//webpack-node-externals",
    "@npm//raw-loader",
    "@npm//@nodegui/qode",
    "@npm//rxjs",
    "@npm//tree-kill",
    "@npm//@types",
    "@npm//tslib",
  ],
)

npm_package(
  name = "npm",
  deps = [":devkit"],
  srcs = [
    "package.json",
    "builders.json",
    "schematics.json"
  ],
)