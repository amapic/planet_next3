/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:"/planet",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  distDir: 'planet',
  output:"export"

}

module.exports = nextConfig

// module.exports = {
//   webpack: (config, options) => {
//     config.module.rules.push({
//         test: /\.csv$/,
//         loader: 'csv-loader',
//         options: {
//           dynamicTyping: true,
//           header: true,
//           skipEmptyLines: true
//         }
//       })

//     return config
//   }
// }
