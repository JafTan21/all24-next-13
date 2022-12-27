export const URLs = {
  // backend: "https://backend.gameingserver.xyz/public/api",
  backend: "http://localhost:8000/api",
};

const AppConfig = {
  user_token: "user_token",
  app_name: "All24",

  waiting_time: 1, //todo
};

const SuperAdminPrefix = "/super-admin";
const GameAdminPrefix = "/game-admin";
const CustomGameAdminPrefix = "/custom-game-admin";
const TransactionAdminPrefix = "/transaction-admin";

export const AdminConfig = {
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

export const ClubConfig = {
  club_token: "club_token",
};

export default AppConfig;
