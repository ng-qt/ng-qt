workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "ng_qt",
    # Map the @npm bazel workspace to the node_modules directory.
    # This lets Bazel use the same node_modules as other local tooling.
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "da72ea53fa1cb8ab5ef7781ba06b97259b7d579a431ce480476266bc81bdf21d",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.36.2/rules_nodejs-0.36.2.tar.gz"],
)

# Setup the Node.js toolchain
load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "yarn_install")

node_repositories(package_json = ["//:package.json"])

yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

# Install any Bazel rules which were extracted earlier by the yarn_install rule.
load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

http_archive(
    name = "io_bazel_rules_webtesting",
    sha256 = "f1f4d2c2f88d2beac64c82499a1e762b037966675dd892da89c87e39d72b33f6",
    urls = [
        "https://github.com/bazelbuild/rules_webtesting/releases/download/0.3.2/rules_webtesting.tar.gz",
    ],
)

load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")

web_test_repositories()

# Setup TypeScript toolchain
load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()
