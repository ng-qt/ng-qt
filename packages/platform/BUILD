load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

ts_library(
    name = "platform",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@ng-qt/platform",
    deps = [
        "//packages/common",
        "@npm//@angular/common",
        "@npm//@angular/compiler",
        "@npm//@angular/core",
        "@npm//@angular/platform-browser-dynamic",
        "@npm//@nodegui/nodegui",
        "@npm//@types",
        "@npm//tslib",
        "@npm//zone.js",
    ],
)

npm_package(
    name = "npm",
    srcs = [
        ":package.json",
    ],
    deps = [
        ":platform",
    ],
)
