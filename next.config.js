/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:"/planet"
  // distDir: 'planet',

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
