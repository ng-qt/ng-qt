#load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

#ng_module(
ts_library(
    name = "common",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@ng-qt/common",
    deps = [
        "@npm//@angular/core",
        "@npm//@nodegui/nodegui",
        "@npm//change-case",
        "@npm//reflect-metadata",
        "@npm//tslib",
    ],
)

#ng_package(
npm_package(
    name = "npm",
    srcs = [
        "package.json",
    ],
    # entry_point = ":index.ts",
    deps = [
        ":common",
    ],
)
