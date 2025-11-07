import axios from "axios";

export const api = axios.create({
  baseURL:"https://api-filmes-j74y.onrender.com",
  headers: { "Content-Type": "application/json" }, 
})