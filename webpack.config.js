const glob = require('glob');
const path = require('path');
const { testGlob } = require('./package.json');
const testFiles = glob.sync(testGlob);

const Plugin = require('stylable-integration/webpack-plugin');

const stylableOptions = {
	defaultPrefix:'S',
    assetsDir:'assets',
    assetsServerUri:'//assets',
	injectBundleCss:true,
	injectFileCss:false
}


module.exports = {
    devtool: 'source-map',
    entry: {
        demos: './demo/index.tsx',
        tests: ['core-js/shim', './test/utils/mobx.config.ts', ...testFiles.map(fileName => `mocha-loader!${fileName}`)]
    },
    plugins: [

		new Plugin(stylableOptions)
	],
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
                loader: path.join(process.cwd(),'stylable-integration/webpack-loader'),
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
    }
}
