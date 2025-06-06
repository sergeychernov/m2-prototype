/** @type {import('next').NextConfig} */
const repoName = 'm2-prototype';
const prNumber = process.env.PR_NUMBER;
const prSegment = prNumber ? `/pr-${prNumber}` : '';

// Определяем, является ли текущая среда разработкой
const isDevelopment = process.env.NODE_ENV === 'development';

// Устанавливаем basePath и assetPrefix в зависимости от среды
const basePath = isDevelopment ? '' : `/${repoName}${prSegment}`;
const assetPrefix = isDevelopment ? '' : `${basePath}/`;

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix,
};

module.exports = nextConfig;
