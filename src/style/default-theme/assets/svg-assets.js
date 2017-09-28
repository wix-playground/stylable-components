module.exports.boxIconMixin = function(params) {
    var fill = params[0] || 'none';
    var stroke = params[1] || '#000000';

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" fill="${fill}" stroke="${stroke}"><path d="M.5.5h15v15H.5z" /></svg>')`
    }
}

module.exports.tickIconMixin = function(params) {
    var stroke = params[0] || '#000000';
    var strokeWidth = params[1] || 1.5;
    var strokeLinecap = params[2] || 'square';

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" stroke="${stroke}" stroke-width="${strokeWidth}" ><path stroke-linecap="${strokeLinecap}" d="M5 8.685l2.496 1.664M8 10.685L11.748 6" /></svg>')`
    }
}

module.exports.indeterminateIconMixin = function(params) {
    var stroke = params[0] || '#000000';
    var strokeWidth = params[1] || 1.5;

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" width="15" height="15" stroke="${stroke}" stroke-width="${strokeWidth}"><line x1="4" y1="8" x2="12" y2="8" /></svg>')`
    }
}
