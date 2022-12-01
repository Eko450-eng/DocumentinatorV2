const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: true,
})

module.exports = withPWA({
  reactStrictMode: true,
})
