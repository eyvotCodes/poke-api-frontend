import { apiRequest } from "./apiClient";


const API_BASE_URL = "http://localhost:8080/api";


export async function getPokemonList(page = 1) {
    return await apiRequest(API_BASE_URL, `/pokemon?page=${page}`);
}

export async function getPokemonDetails(id) {
    return await apiRequest(API_BASE_URL, `/pokemon/${id}`);
}
