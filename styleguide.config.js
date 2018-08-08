// const path = require('path')
// const glob = require('glob')

module.exports = {
  title: 'React Style Guide Example',
  components: './src/components/**/*.{ts,tsx}',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('./webpack.doc.js'),
  // components: function () {
  //   return glob.sync(path.resolve(__dirname, './src/components/**/*.tsx'))
  //     .filter(function (module) {
  //       return /\/[A-Z]\w*\.tsx$/.test(module)
  //     })
  // },
  resolver: require('react-docgen').resolver.findAllComponentDefinitions
  // propsParser: require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse
}
