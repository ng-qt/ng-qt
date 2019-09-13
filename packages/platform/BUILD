load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")

package(default_visibility = ["//visibility:public"])

ng_module(
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

ng_package(
    name = "npm",
    srcs = [
        ":package.json",
    ],
    entry_point = ":index.ts",
    deps = [
        ":platform",
    ],
)
