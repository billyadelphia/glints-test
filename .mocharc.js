module.exports = {
    require: [
        "ts-node/register/transpile-only",
        "scripts/mocha/register",
        "tsconfig-paths/register",
        "src/LoadEnv"
    ],
    recursive: true,
    reporter: "dot",
    spec: [
        "src/**/*.spec.ts"
    ]
};