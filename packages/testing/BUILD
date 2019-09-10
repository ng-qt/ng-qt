load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

ts_library(
    name = "testing",
    srcs = glob(
        include = ["src/**/*.ts"],
        exclude = ["src/**/*.spec.ts"],
    ),
    module_name = "@ng-qt/testing",
    deps = [
        "//packages/common",
        "//packages/core",
        "//packages/platform",
        "@npm//@angular/core",
        "@npm//@angular/platform-browser",
        "@npm//@angular/platform-browser-dynamic",
        "@npm//reflect-metadata",
        "@npm//zone.js",
    ],
)

npm_package(
    name = "npm",
    srcs = [
        ":package.json",
    ],
    deps = [
        ":testing",
    ],
)
