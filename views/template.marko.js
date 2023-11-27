function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><h3>HashTool API</h3><p>To search Hashtags using the search endpoint:</p><p>Add \'/search\' to your browser url, followed by \'/yourhashtag\'.</p><p>i.e https://hash-tool-service.vercel.app/search/roses</p><pre>' +
      escapeXml(data.results) +
      '</pre></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);