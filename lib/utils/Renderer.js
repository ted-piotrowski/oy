'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _sanitizer = require('sanitizer');

var _sanitizer2 = _interopRequireDefault(_sanitizer);

var _HTML = require('./HTML4');

var _HTML2 = _interopRequireDefault(_HTML);

var _CSS = require('./CSS');

var _CSS2 = _interopRequireDefault(_CSS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _renderTemplate = function _renderTemplate(element, options, generateCustomTemplate) {
  var bodyContent = _server2.default.renderToStaticMarkup(element);
  var minifiedHeadCSS = options.headCSS;
  options = (0, _objectAssign2.default)({}, {
    lang: _sanitizer2.default.escape(options.lang),
    dir: _sanitizer2.default.escape(options.dir),
    title: _sanitizer2.default.escape(options.title),
    previewText: _sanitizer2.default.escape(options.previewText),
    headCSS: _CSS2.default.raiseOnUnsafeCSS(minifiedHeadCSS, 'headCSS')
  }, { bodyContent: bodyContent });
  return generateCustomTemplate ? generateCustomTemplate(options) : _HTML2.default.generateDefaultTemplate(options);
};

exports.default = {
  renderTemplate: function renderTemplate() {
    var rawHTML = _renderTemplate.apply(undefined, arguments);
    var html = _HTML2.default.replaceWhitelistedAttributes(rawHTML);
    var bytes = Buffer.byteLength(html, 'utf8');

    if (bytes > 1024 * 100) {
      console.warn('Email output is ' + Math.round(bytes / 1024) + 'KB. ' + 'It is recommended to keep the delivered HTML to smaller ' + 'than 100KB, to avoid getting emails cut off or rejected due to spam.');
    }

    return html;
  }
};