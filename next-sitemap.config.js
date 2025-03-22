/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.themotleymonkey.dk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
