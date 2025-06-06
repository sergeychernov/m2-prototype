/** @type {import('next').NextConfig} */
const repoName = 'm2-prototype';
const prNumber = process.env.PR_NUMBER;
const prSegment = prNumber ? `/pr-${prNumber}` : '';
const basePath = `/${repoName}${prSegment}`;

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: `${basePath}/`,
};

module.exports = nextConfig;
