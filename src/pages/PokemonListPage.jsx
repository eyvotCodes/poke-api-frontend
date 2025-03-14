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
            setError("Error:", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col min-h-screen">
            {/* title */}
            <header className={ [
                'w-full p-4',
                'text-xl text-center font-bold',
                'border-neutral-200 border-b'].join(' ') }>
                PokéAPI
            </header>

            {/* messages */}
            { loading && <p className={ 'text-center' }>loading...</p> }
            { error && <p className={ 'text-center' }>{ error }</p> }

            {/* pokemon list */}
            <main className={ [
                'flex-1 flex justify-center items-center p-6',
                'bg-neutral-100'].join(' ') }>
                <div className={ [
                    'grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))]',
                    'gap-6 w-full max-w-6xl mx-auto place-items-center'
                ].join(' ') }>
                    { pokemonList.map((pokemon) => (
                        <PokemonItem key={ pokemon.id } pokemon={ pokemon } />
                    ))}
                </div>
            </main>

            {/* paginator */}
            <footer className={ [
                'flex justify-center w-full p-4 gap-4',
                'text-center',
                'border-neutral-200 border-t'].join(' ') }>
                <Button onClick={() => setPage((prev) => prev - 1)}>Previous</Button>
                <span>{ page }</span>
                <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
            </footer>
        </div>
    );

}
