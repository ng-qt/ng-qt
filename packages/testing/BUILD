load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")

# package(default_visibility = ["//visibility:public"])

ng_module(
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
        "@npm//reflect-metadata",
        "@npm//zone.js",
    ],
)

ng_package(
    name = "npm",
    srcs = [
        ":package.json",
    ],
    entry_point = ":index.ts",
    deps = [
        ":testing",
    ],
)
