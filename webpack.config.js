const glob = require('glob');

const { testGlob } = require('./package.json');
const testFiles = glob.sync(testGlob);

module.exports = {
    devtool: 'source-map',
    entry: {
        demos: './demo/index.tsx',
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
                loader: 'stylable-integration/webpack',
                options: { standalone: true }
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
