load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")

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

ng_package(
    name = "npm",
    srcs = [
        "package.json",
    ],
    entry_point = ":index.ts",
    deps = [
        ":common",
    ],
)
