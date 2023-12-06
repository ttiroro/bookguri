const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/ttb/api', {
      target: 'http://www.aladin.co.kr',
      changeOrigin: true
    }),
  );
};