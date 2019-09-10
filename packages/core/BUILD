load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")

package(default_visibility = ["//visibility:public"])

ng_module(
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

ng_package(
    name = "npm",
    srcs = [
        "package.json",
    ],
    entry_point = ":index.ts",
    deps = [
        ":core",
    ],
)
