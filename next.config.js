const withPlugins = require('next-compose-plugins');

/* eslint import/no-extraneous-dependencies: "off" */
const createNextPluginPreval = require('next-plugin-preval/config');

const withNextPluginPreval = createNextPluginPreval();

// module.exports = withNextPluginPreval();
module.exports = withPlugins([withNextPluginPreval()], {
  webpack5: true,
});
