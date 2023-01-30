const BASE_URL = "https://backend.securitykey.company";
export const URLs = {
  backend: BASE_URL + "/public/api",
  backend_csrf: BASE_URL + "/public/sanctum/csrf-cookie",

  socket: "https://server.securitykey.company/",
};

// _Ea3yWMB}6N.nmqX
// https://139.180.134.74/

// const BASE_URL = "http://localhost:8000";
// export const URLs = {
//   backend: BASE_URL + "/api",
//   backend_csrf: BASE_URL + "/sanctum/csrf-cookie",

//   socket: "http://localhost:2000",
// };

const AppConfig = {
  user_token: "user_token",
  app_name: "All24",

  waiting_time: 3000,
};

const SuperAdminPrefix = "/super-admin";
const GameAdminPrefix = "/game-admin";
const CustomGameAdminPrefix = "/custom-game-admin";
const TransactionAdminPrefix = "/transaction-admin";

export const AdminConfig = {
  admin_token: "admin_token",

  types: {
    Super: 1,
    GameController: 2,
    TransactionController: 3,
    CustomGameController: 4,
  },

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

// "dev": "next dev",
// "build": "next build",
// "start": "next start"
