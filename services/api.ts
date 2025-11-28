// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7234", // آدرس بک‌اند ASP.NET Core
  headers: {
    "Content-Type": "application/json",
  },
});

// // اضافه کردن JWT به هر درخواست
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
