"use strict";

/** @typedef {import("@expo/webpack-config/webpack").default} ConfigFunction */
/** @typedef {Awaited<ReturnType<ConfigFunction>>} Config */

/** @type {ConfigFunction} */ // @ts-ignore
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

const path = require("path");
const fs = require("fs");

const WORKSPACE_ROOT = path.join(__dirname, "..", "..");

/** @type {(_: any) => Promise<string>} */
async function prettyFormat(value) {
    const contents = require("pretty-format").format(value, { min: true, printFunctionName: false });
    // @ts-ignore
    const formattedContents = await require("prettier").format("_ = " + contents, require("@lokshunhung/cnf/prettier.config"));
    return formattedContents.replace(/^_ = /, "module.exports = ");
}

/** @param {Config} config */
function findBabelLoaderRule(config) {
    config.module ??= {};
    config.module.rules ??= [];
    if (!config.module.rules[1]) throw new Error();
    if (typeof config.module.rules[1] === "string") throw new Error();
    config.module.rules[1].oneOf ??= [];
    const babelLoaderRule = config.module.rules[1].oneOf[2];
    if (
        babelLoaderRule &&
        typeof babelLoaderRule === "object" &&
        typeof babelLoaderRule.use === "object" &&
        !Array.isArray(babelLoaderRule.use) &&
        babelLoaderRule.use.loader?.includes(path.sep + "babel-loader" + path.sep)
    ) {
        return babelLoaderRule;
    }
    throw new Error();
}

/** @type {ConfigFunction} */
module.exports = async function config(env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.bail = true;

    // Update resolution

    config.resolve ??= {};
    // ! Note: `resolve.symlinks` defaults to `false`, and must be enable to follow symlinks
    config.resolve.symlinks = true;

    // Update babel-loader rule

    const babelLoaderRule = findBabelLoaderRule(config);
    // prettier-ignore
    babelLoaderRule.include = [
        path.join(__dirname, "src"),
        ...fs.readdirSync(path.join(WORKSPACE_ROOT, "pkgs"))
            .map(pkgId => path.join(WORKSPACE_ROOT, "pkgs", pkgId, "src")),
    ];

    // Enable logging

    config.infrastructureLogging ??= {};
    config.infrastructureLogging.debug = true;

    // Dump webpack config

    const tmpDir = path.join(__dirname, "tmp");
    if (!(fs.existsSync(tmpDir) && fs.statSync(tmpDir).isDirectory())) {
        await fs.promises.mkdir(tmpDir, { recursive: true });
    }
    const outFile = path.join(tmpDir, "wp");
    const contents = await prettyFormat(config);
    await fs.promises.writeFile(outFile, contents, "utf8");

    return config;
};
