const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NEXT_PUBLIC_PWA,
})

module.exports = withPWA({
  reactStrictMode: true,
})
