const path = require('path');

/** @type {import('next').NextConfig} */

module.exports = {
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,

  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'style')],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
               plugins: [{
                  name: 'removeViewBox',
                  active: false
               }]
            }
          }
        },
      ],
    });

    return config;
  },
};
