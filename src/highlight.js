import visit from 'unist-util-visit';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);

/**
 * Adapted from remark-highlight.js
 * https://github.com/ben-eb/remark-highlight.js
 */
export default function attacher() {
    function visitor(node) {
        if (node.lang) {
            node.type = 'html';
            node.value = `<pre class='hljs'>${hljs.highlightAuto(node.value, [node.lang]).value}</pre>`;
        }
    }

    return ast => visit(ast, 'code', visitor);
}
