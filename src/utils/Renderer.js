import React from 'react';
import ReactDOMServer from 'react-dom/server';
import objectAssign from 'object-assign';
import sanitizer from 'sanitizer';

import HTML4 from './HTML4';
import CSS from './CSS';


const renderTemplate = (element, options, generateCustomTemplate) => {
  const bodyContent = ReactDOMServer.renderToStaticMarkup(element);
  const minifiedHeadCSS = options.headCSS;
  options = objectAssign({}, {
    lang: sanitizer.escape(options.lang),
    dir: sanitizer.escape(options.dir),
    title: sanitizer.escape(options.title),
    previewText: sanitizer.escape(options.previewText),
    headCSS: CSS.raiseOnUnsafeCSS(minifiedHeadCSS, 'headCSS')
  }, {bodyContent: bodyContent});
  return generateCustomTemplate ? (
    generateCustomTemplate(options)
  ) : HTML4.generateDefaultTemplate(options);
};


export default {
  renderTemplate: (...args) => {
    const rawHTML = renderTemplate(...args);
    const html = HTML4.replaceWhitelistedAttributes(rawHTML);
    const bytes = Buffer.byteLength(html, 'utf8');

    if (bytes > 1024 * 100) {
      console.warn(
        `Email output is ${Math.round(bytes / 1024)}KB. ` +
        'It is recommended to keep the delivered HTML to smaller ' +
        'than 100KB, to avoid getting emails cut off or rejected due to spam.'
      );
    }

    return html;
  }
};

