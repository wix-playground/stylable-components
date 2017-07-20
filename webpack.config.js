const glob = require('glob');

const { testGlob } = require('./package.json');
const testFiles = glob.sync(testGlob);

module.exports = {
    devtool: 'source-map',
    entry: {
        demos: './demo/index.tsx',
        tests: ['core-js/shim', ...testFiles.map(fileName => `mocha-loader!${fileName}`)]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            "noEmit": false
                        }
                    }
                }
            },
            {
                test: /\.sb\.css$/,
                loader: 'stylable-integration/webpack'
            },
            {
                test: /((?!\.sb).{3}|^.{0,2})\.css$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: '[name].js',
        pathinfo: true
    }
}
