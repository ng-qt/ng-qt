#load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

#ng_module(
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

#ng_package(
npm_package(
    name = "npm",
    srcs = [
        ":package.json",
    ],
    # entry_point = ":index.ts",
    deps = [
        ":platform",
    ],
)
