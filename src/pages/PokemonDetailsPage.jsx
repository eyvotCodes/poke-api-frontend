import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails } from "../api/pokemonApi";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";


export default function PokemonDetailsPage() {
    // state
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // navigation
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetchPokemonDetails();
    }, [id]);


    async function fetchPokemonDetails() {
        setLoading(true);
        setError(null);
        try {
            const data = await getPokemonDetails(id);
            setPokemon(data);
        } catch (err) {
            setError("Error al obtener los detalles del Pokémon:", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <h1>Detalles del Pokémon</h1>
            { loading && <p>Cargando...</p> }
            { error && <p>{ error }</p> }

            { pokemon && (
                <Card>
                    <h2>{ pokemon.nombre }</h2>
                    <img src={ pokemon.photoUrl } alt={ pokemon.nombre } />
                    <p>Types: { pokemon.types }</p>
                    <p>Weight: { pokemon.weight } kg</p>
                    <p>Abilities: { pokemon.abilities }</p>
                    <p>Evolutions: { pokemon.evolutions }</p>
                    <p>Description: { pokemon.description }</p>
                    <Button onClick={ () => navigate(-1) }>Regresar</Button>
                </Card>
            )}
        </>
    );

}