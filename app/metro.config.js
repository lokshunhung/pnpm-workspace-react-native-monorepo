const { getDefaultConfig } = require("expo/metro-config");

/** @typedef {import("metro-config").InputConfigT} ConfigT */

/** @type {(_: ConfigT, _: ConfigT) => ConfigT} */
function defineConfig(base, config) {
    const { mergeConfig } = require("metro-config");
    return mergeConfig(base, config);
}

/** @type {{ [_: string]: string }} */
const extraNodeModules = {};

module.exports = defineConfig(getDefaultConfig(__dirname), {
    resolver: {
        unstable_enableSymlinks: true,
        extraNodeModules: new Proxy(extraNodeModules, {
            get(target, name, receiver) {
                const fs = require("fs");
                const tmpDir = __dirname + "/tmp";
                if (!(fs.existsSync(tmpDir) && fs.statSync(tmpDir).isDirectory())) {
                    fs.mkdirSync(tmpDir, { recursive: true });
                }
                fs.appendFileSync(__dirname + "/tmp/resolution-log.txt", name + "\n", "utf8");
                return target[name];
            },
        }),
    },
});
