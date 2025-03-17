import { apiRequest } from "./apiClient";
import { API_BASE_URL } from "@/config/webClient.js";


export async function getPokemonList(page = 1) {
    return await apiRequest(API_BASE_URL, `/pokemon?page=${page}`);
}

export async function getPokemonDetails(id) {
    return await apiRequest(API_BASE_URL, `/pokemon/${id}`);
}
