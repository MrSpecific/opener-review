// eslint-disable-next-line import/no-extraneous-dependencies
const { extendDefaultPlugins } = require('svgo');

module.exports = {
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: extendDefaultPlugins([
                {
                  name: 'removeAttrs',
                  active: false,
                },
              ]),
            },
            svgProps: { className: 'svg-graphic' },
            dimensions: false,
          },
        },
      ],
    });

    return config;
  },
};
