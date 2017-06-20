const glob = require('glob');

const { testGlob } = require('./package.json');
const testFiles = glob.sync(testGlob);

module.exports = {
    devtool: 'eval',
    entry: {
        demos: './demo/index.tsx',
        tests: testFiles.map(fileName => `mocha-loader!${fileName}`)
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
                test: /\.css$/,
                use: {
                    loader: 'style-loader',
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }
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
