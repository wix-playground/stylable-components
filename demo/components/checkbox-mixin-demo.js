module.exports.customBoxIconMixin = function(params) {
    var fill = typeof params[0] === 'undefined' ? 'none' : params[0];
    var stroke = typeof params[1] === 'undefined' ? '#000000' : params[1];

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" fill="${fill}" stroke="${stroke}" ><path d="M.5.5h15v15H.5z" /></svg>')`
    }
}

module.exports.customTickIconMixin = function(params) {
    var fill = typeof params[0] === 'undefined' ? 'none' : params[0];

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" fill="${fill}" ><circle cx="8" cy="8" r="4"/></svg>')`
    }
}
