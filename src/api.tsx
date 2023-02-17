import axios from "axios";

const baseUrl = `https://raffleez.onrender.com`;

const client = axios.create({ baseURL: baseUrl });

export function setTokenDefaultHeader() {
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${window.localStorage.getItem("accessToken")}`;
}

export function login(username, password) {
  return client.post(`/login`, { username, password });
}

export function signup(username, password) {
  return client.post(`/signup`, { username, password });
}

export function getMyRaffles() {
  return client.get(`/myraffles`);
}
export function getProducts() {
  return client.get("/raffle/products");
}

export function endRaffle(raffleId) {
  return client.get(`myraffles/${raffleId}/end`);
}

export function parcitipateRaffle(raffleId, data) {
  return client.post(`raffle/${raffleId}/enter`, data);
}

export function getAllRaffles() {
  return client.get("/allraffles");
}
export function removeParticipant(raffleId, participantIndex) {
  return client.get(`myraffles/${raffleId}/participants/${participantIndex}`);
}

export function createRaffle(productId, name, quantity) {
  return client.post("/myraffles/create", { productId, name, quantity });
}
