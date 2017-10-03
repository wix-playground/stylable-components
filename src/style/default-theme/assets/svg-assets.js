module.exports.boxIconMixin = function(params) {
    var fill = typeof params[0] === 'undefined' ? 'none' : params[0];
    var stroke = typeof params[1] === 'undefined' ? '#000000' : params[1];

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" fill="${fill}" stroke="${stroke}"><path d="M.5.5h15v15H.5z" /></svg>')`
    }
}

module.exports.tickIconMixin = function(params) {
    var stroke = typeof params[0] === 'undefined' ? '#000000' : params[0];
    var strokeWidth = typeof params[1] === 'undefined' ? 1.5 : params[1];
    var strokeLinecap = typeof params[2] === 'undefined' ? 'square' : params[2];

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" stroke="${stroke}" stroke-width="${strokeWidth}" ><path stroke-linecap="${strokeLinecap}" d="M5 8.685l2.496 1.664M8 10.685L11.748 6" /></svg>')`
    }
}

module.exports.indeterminateIconMixin = function(params) {
    var stroke = typeof params[0] === 'undefined' ? '#000000' : params[0];
    var strokeWidth = typeof params[1] === 'undefined' ? 1.5 : params[1];

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="15" height="15" stroke="${stroke}" stroke-width="${strokeWidth}"><line x1="4" y1="8" x2="12" y2="8" /></svg>')`
    }
}
