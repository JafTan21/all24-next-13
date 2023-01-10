const SuperAdminPrefix = "/super-admin";
const GameAdminPrefix = "/game-admin";
const CustomGameAdminPrefix = "/custom-game-admin";
const TransactionAdminPrefix = "/transaction-admin";

const AdminConfig = {
  admin_token: "admin_token",

  SuperAdminPrefix,
  GameAdminPrefix,
  CustomGameAdminPrefix,
  TransactionAdminPrefix,

  prefixes: [
    SuperAdminPrefix,
    GameAdminPrefix,
    CustomGameAdminPrefix,
    TransactionAdminPrefix,
  ],
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // distDir: "build",
  swcMinify: true,

  experimental: {
    appDir: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/club",
        destination: "/club/dashboard",
        permanent: true,
      },
      {
        source: AdminConfig.SuperAdminPrefix,
        destination: `${AdminConfig.SuperAdminPrefix}/dashboard`,
        permanent: true,
      },
      {
        source: `${AdminConfig.GameAdminPrefix}`,
        destination: `${AdminConfig.GameAdminPrefix}/bet-control`,
        permanent: true,
      },
      {
        source: `${AdminConfig.CustomGameAdminPrefix}`,
        destination: `${AdminConfig.CustomGameAdminPrefix}/bet-control`,
        permanent: true,
      },
      {
        source: `${AdminConfig.TransactionAdminPrefix}`,
        destination: `${AdminConfig.TransactionAdminPrefix}/withdraws`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
