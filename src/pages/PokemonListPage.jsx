import { useState, useEffect } from "react";
import { getPokemonList } from "../api/pokemonApi";
import PokemonItem from "../components/PokemonItem.jsx";
import { Button } from "@/components/ui/button.jsx";


export default function PokemonListPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchPokemonList(page);
    }, [page]);


    async function fetchPokemonList(page) {
        setLoading(true);
        setError(null);
        try {
            const data = await getPokemonList(page);
            setPokemonList(data.results);
        } catch (err) {
            setError("Error al obtener los Pokémon:", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <h1>Lista de Pokémon</h1>
            { loading && <p>Cargando...</p> }
            { error && <p>{error}</p> }

            <div>
                { pokemonList.map(pokemon => (
                    <PokemonItem key={ pokemon.id } pokemon={ pokemon } />
                ))}
            </div>

            <div>
                <Button onClick={() => { setPage(prev => prev - 1) }}>Anterior</Button>
                <span>{ page }</span>
                <Button onClick={() => { setPage(prev => prev + 1) }}>Siguiente</Button>
            </div>
        </>
    );

}
