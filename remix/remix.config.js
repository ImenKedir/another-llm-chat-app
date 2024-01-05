/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*", "**/*.css"],
  serverDependenciesToBundle: [/^react-icons/, /^remix-utils.*/],
  browserNodeBuiltinsPolyfill: { modules: { util: true } },
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
};
