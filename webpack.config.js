const StylablePlugin = require('stylable-integration/webpack-plugin');
const stylableOptions = { injectBundleCss: true, nsDelimiter:'--' };

module.exports = {
    devtool: 'source-map',
    entry: {
        demos: ['core-js/shim', './demo/index.tsx'],
        tests: ['core-js/shim', './test/utils/mobx.config.ts', 'mocha-loader!./test/webpack.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        "declaration": false
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'stylable-integration/webpack-loader',
                options: stylableOptions
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: '[name].js',
        pathinfo: true
    },
    devServer: {
        disableHostCheck: true
    },
    plugins: [
        new StylablePlugin(stylableOptions)
    ]
}
