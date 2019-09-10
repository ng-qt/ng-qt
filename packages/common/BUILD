load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")
load("@npm_angular_bazel//:index.bzl", "ng_module")

package(default_visibility = ["//visibility:public"])

ng_module(
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

npm_package(
    name = "npm",
    srcs = [
        "package.json",
    ],
    deps = [
        ":common",
    ],
)
