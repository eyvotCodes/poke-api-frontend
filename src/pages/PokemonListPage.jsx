import { useState, useEffect } from "react";
import { getPokemonList } from "../api/pokemonApi";
import PokemonItem from "../components/PokemonItem.jsx";
import { Button } from "@/components/ui/button.jsx";

import { GENERIC_ERROR_LOAD_MESSAGE } from "@/config/constants.js";


export default function PokemonListPage() {
    const [numberOfPages, setNumberOfPages] = useState(0);
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
            setNumberOfPages(data.pages);
            setPokemonList(data.results);
        } catch (error) {
            console.log(JSON.stringify(error));
            setError(GENERIC_ERROR_LOAD_MESSAGE);
        } finally {
            setLoading(false);
        }
    }

    function isFirstPage() {
        return page === 1;
    }

    function isLastPage() {
        return page === numberOfPages;
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
                <Button onClick={() => setPage((prev) => prev - 1)}
                        disabled={ isFirstPage() || loading }>
                    Previous
                </Button>
                <span>{ page }</span>
                <Button onClick={() => setPage((prev) => prev + 1)}
                        disabled={ isLastPage() || loading }>
                    Next
                </Button>
            </footer>
        </div>
    );

}
