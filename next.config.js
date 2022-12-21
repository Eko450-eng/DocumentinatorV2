const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: false,
})

module.exports = withPWA({
  reactStrictMode: true,
})
