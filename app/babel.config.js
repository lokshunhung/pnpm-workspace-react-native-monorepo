module.exports = function (api) {
    api.cache.forever();
    return {
        presets: [
            ["babel-preset-expo", {
                native: {
                    enableBabelRuntime: false,
                },
            }],
        ],
    };
};
