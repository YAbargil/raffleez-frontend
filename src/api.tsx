import axios from "axios";

const baseUrl = `https://raffleez.onrender.com`;

const client = axios.create({ baseURL: baseUrl });

export function login(username, password) {
  return client.post(`/login`, { username, password });
}

export function signup(username, password) {
  return client.post(`/signup`, { username, password });
}

export function getMyRaffles() {
  return client.get(`/myraffles`);
}
