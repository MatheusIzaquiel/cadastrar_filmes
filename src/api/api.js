import axios from "axios";

export const api = axios.create({
  baseURL:"https://api-filmes-j74y.onrender.com/films",
  headers: { "Content-Type": "application/json" }, 
})