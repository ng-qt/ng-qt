load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

package(default_visibility = ["//visibility:private"])

filegroup(
    name = "assets",
    srcs = glob([
        "**/*.html",
        "**/*.css",
    ]),
)

ts_library(
    name = "src",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    deps = [
        "//packages/core",
        "//packages/platform",
        "@npm//@angular/common",
        "@npm//@angular/core",
        "@npm//@nodegui/nodegui",
        "@npm//@types",
        "@npm//rxjs",
        "@npm//tslib",
    ],
)

nodejs_binary(
    name = "app",
    data = [
        ":assets",
        ":src",
    ],
    entry_point = ":src/main.ts",
)

#nodejs_binary(
#	name = "qode",
#	data = [":app"],
#	entry_point = "@npm//:node_modules/@nodegui/qode/cli.js",
#)
