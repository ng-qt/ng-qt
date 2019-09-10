load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "npm_package")

package(default_visibility = ["//visibility:public"])

ts_library(
    name = "core",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@ng-qt/core",
    deps = [
        "//packages/common",
        "//packages/platform",
        "@npm//@angular/common",
        "@npm//@angular/core",
        "@npm//@angular/platform-browser",
        "@npm//@nodegui/nodegui",
        "@npm//@types",
        "@npm//rxjs",
        "@npm//tslib",
    ],
)

npm_package(
    name = "npm",
    srcs = [
        "package.json",
    ],
    deps = [
        ":core",
    ],
)
