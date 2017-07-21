require('css-modules-require-hook/preset')
const cssModulesHook = require.extensions['.css']

require('stylable-integration/dist/src/require-hook').attachHook({extension: '.css'})
const stylableHook = require.extensions['.css']

require.extensions['.css'] = function (module, filename) {
    const hook = /\.sb\.css$/.test(filename) ? stylableHook : cssModulesHook
    return hook(module, filename)
}
