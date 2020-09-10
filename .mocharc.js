module.exports = {
    require: ["ts-node/register/transpile-only", "scripts/mocha/register", "tsconfig-paths/register", "dotenv/config"],
    recursive: true,
    reporter: "dot",
    spec: ["src/**/*.spec.ts"],
};