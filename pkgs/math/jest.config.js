// @ts-check

"use strict";

/** @type {import("jest").Config} */
const config = {
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
    },
};

module.exports = config;
