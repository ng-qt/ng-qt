load("@npm_bazel_typescript//:index.bzl", "ts_library")

package(default_visibility = ["//visibility:public"])

ts_library(
    name = "jest",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = ["**/*.spec.ts"],
    ),
    module_name = "@ng-qt/testing/jest",
    deps = [
        "@npm//@types",
        "@npm//jest-preset-angular",
        "@npm//tslib",
        "@npm//typescript",
    ],
)
