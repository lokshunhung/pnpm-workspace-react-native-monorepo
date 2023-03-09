"use strict";

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @typedef {import("metro-config").InputConfigT} ConfigT */

/** @type {(_: ConfigT, _: ConfigT) => ConfigT} */
function defineConfig(base, config) {
    const { mergeConfig } = require("metro-config");
    return mergeConfig(base, config);
}

const projectRootDir = path.join(__dirname, "..", "..");

/** @type {{ [_: string]: string }} */
const extraNodeModules = {};

module.exports = defineConfig(getDefaultConfig(__dirname), {
    projectRoot: projectRootDir,
    resolver: {
        unstable_enableSymlinks: true,
        extraNodeModules: new Proxy(extraNodeModules, {
            get(target, name, receiver) {
                // const fs = require("fs");
                // const tmpDir = path.join(__dirname, "tmp");
                // if (!(fs.existsSync(tmpDir) && fs.statSync(tmpDir).isDirectory())) {
                //     fs.mkdirSync(tmpDir, { recursive: true });
                // }
                // fs.appendFileSync(path.join(tmpDir, "resolution-log.txt"), name + "\n", "utf8");
                return target[name];
            },
        }),
    },
    watchFolders: [
        path.join(projectRootDir, "node_modules", ".pnpm"),
        path.join(projectRootDir, "pkgs"),
        // ---
    ],
});
