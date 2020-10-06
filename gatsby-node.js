exports.onCreateWebpackConfig = ({ actions: { replaceWebpackConfig }, getConfig }) => {
  const config = getConfig()

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' },
  })

  config.module.rules.push({
    test: /\.(frag|vert|glsl)$/,
    use: [
      {
        loader: 'glsl-shader-loader',
        options: {},
      },
    ],
  })

  config.output.globalObject = 'this'

  replaceWebpackConfig(config)
}
