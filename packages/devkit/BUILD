load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

# package(default_visibility = ["//visibility:private"])

filegroup(
    name = "assets",
    srcs = glob(["**/*.json"]),
)

ts_library(
    name = "devkit",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@ng-qt/devkit",
    deps = [
        "@npm//@angular-devkit",
        "@npm//@ngtools/webpack",
        "@npm//@nodegui/qode",
        "@npm//@schematics/angular",
        "@npm//@types",
        "@npm//circular-dependency-plugin",
        "@npm//copy-webpack-plugin",
        "@npm//fork-ts-checker-webpack-plugin",
        "@npm//raw-loader",
        "@npm//rxjs",
        "@npm//tree-kill",
        "@npm//tsconfig-paths-webpack-plugin",
        "@npm//tslib",
        "@npm//typescript",
        "@npm//webpack",
        "@npm//webpack-merge",
        "@npm//webpack-node-externals",
    ],
)

npm_package(
    name = "npm",
    visibility = ["//visibility:private"],
    deps = [
        ":assets",
        ":devkit",
    ],
)
