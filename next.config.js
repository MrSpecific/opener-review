// const withPlugins = require('next-compose-plugins');

// /* eslint import/no-extraneous-dependencies: "off" */
// const createNextPluginPreval = require('next-plugin-preval/config');

// const withNextPluginPreval = createNextPluginPreval();

// // module.exports = withNextPluginPreval();
// module.exports = withPlugins([withNextPluginPreval()], {
//   webpack5: true,
//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     ignoreBuildErrors: true,
//   },
// });

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
