const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  target: "serverless",
  webpack5: true,
  compress: true,
  reactStrictMode: true,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "async",
      minSize: 200,
      maxSize: 6000,
    },
    removeAvailableModules: false,
    usedExports: true,
    concatenateModules: true,
    sideEffects: true,
    mangleExports: "size",
    providedExports: true,
    flagIncludedChunks: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    mangleWasmImports: true,
    nodeEnv: "production",
    chunkIds: "deterministic",
    moduleIds: "deterministic",
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching,
    fallbacks: {
      document: "/offline",
    },
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    return config;
  },
});
