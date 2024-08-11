/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
    appDirectory: "src/app",
    assetsBuildDirectory: "public/build",
    serverBuildPath: "build/index.js",
    publicPath: "/build/",
    ignoredRouteFiles: ["**/.*"],
    future: {
        unstable_dev: true,
    },
};
