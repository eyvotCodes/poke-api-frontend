import { ENV_PRODUCTION, ENVIRONMENT } from "@/config/constants.js";


// back-end rest api
const DEVELOPMENT_BASE_URL = 'http://localhost:8080/api';
const PRODUCTION_BASE_URL = 'https://pokeapi-backend.eyvot.com/api';
export const API_BASE_URL = ENVIRONMENT === ENV_PRODUCTION ? PRODUCTION_BASE_URL : DEVELOPMENT_BASE_URL ;
