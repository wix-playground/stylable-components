const path = require('path');
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
                test: /\.js$/,
                include: [
                    path.dirname(require.resolve('chai-as-promised')),
                    path.dirname(require.resolve('chai-style')),
                    path.join(__dirname, 'node_modules', 'webpack-dev-server', 'client')
                ],
                loader: 'ts-loader',
                options: {
                    // needed so it has a separate transpilation instance
                    instance: 'lib-compat',
                    transpileOnly: true
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
