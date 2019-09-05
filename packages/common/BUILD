load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

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
        "@npm//reflect-metadata",
        "@npm//change-case",
        "@npm//tslib",
    ],
)

npm_package(
    name = "npm",
    srcs = [
        "package.json",
    ],
    deps = [
        ":common",
    ],
)
