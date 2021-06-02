const withImages = require('next-images')
const path = require('path')


module.exports = withImages({
  exclude: path.resolve(__dirname, 'assets/svgs'),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },

})