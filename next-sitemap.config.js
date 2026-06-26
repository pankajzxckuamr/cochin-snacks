/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://cochinsnacks.com',
  generateRobotsTxt: true,
  exclude: ['/studio', '/studio/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: '/studio',
      },
    ],
  },
}
