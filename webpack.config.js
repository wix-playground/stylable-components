const glob = require('glob');

const { testGlob } = require('./package.json');
const StylablePlugin = require('stylable-integration/webpack-plugin');
const testFiles = glob.sync(testGlob);

module.exports = {
    devtool: 'source-map',
    entry: {
        demos: ['core-js/shim', './demo/index.tsx'],
        tests: ['core-js/shim', './test/utils/mobx.config.ts', ...testFiles.map(fileName => `mocha-loader!${fileName}`)]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        "noEmit": false
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'stylable-integration/webpack-loader',
                options: { injectFileCss: true }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        disableHostCheck: true
    },
    output: {
        filename: '[name].js',
        pathinfo: true
    },
    plugins: [
        new StylablePlugin({ injectFileCss: true })
    ]
}
