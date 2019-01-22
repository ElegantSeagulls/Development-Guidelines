'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = attacher;

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

var _highlight = require('highlight.js/lib/highlight');

var _highlight2 = _interopRequireDefault(_highlight);

var _javascript = require('highlight.js/lib/languages/javascript');

var _javascript2 = _interopRequireDefault(_javascript);

var _json = require('highlight.js/lib/languages/json');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highlight2.default.registerLanguage('javascript', _javascript2.default);
_highlight2.default.registerLanguage('json', _json2.default);

/**
 * Adapted from remark-highlight.js
 * https://github.com/ben-eb/remark-highlight.js
 */
function attacher() {
    function visitor(node) {
        if (node.lang) {
            node.type = 'html';
            node.value = '<pre class=\'hljs\'>' + _highlight2.default.highlightAuto(node.value, [node.lang]).value + '</pre>';
        }
    }

    return function (ast) {
        return (0, _unistUtilVisit2.default)(ast, 'code', visitor);
    };
}