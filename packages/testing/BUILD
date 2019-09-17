#load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")
load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

# package(default_visibility = ["//visibility:public"])

#ng_module(
ts_library(
    name = "testing",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@ng-qt/testing",
    deps = [
        "//packages/common",
        "//packages/core",
        "//packages/platform",
        "@npm//@angular/core",
        "@npm//@angular/platform-browser",
        "@npm//@angular/platform-browser-dynamic",
        "@npm//@nodegui/nodegui",
        "@npm//reflect-metadata",
        "@npm//zone.js",
    ],
)

#ng_package(
npm_package(
    name = "npm",
    srcs = [
        ":package.json",
    ],
    tags = [
        "release",
    ],
    #entry_point = ":index.ts",
    deps = [
        ":testing",
    ],
)
