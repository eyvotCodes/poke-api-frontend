import { useState, useEffect } from "react";
import { getPokemonList } from "../api/pokemonApi";
import { Button } from "@/components/ui/button.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PokemonItem from "../components/PokemonItem.jsx";
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

                <div className={ 'flex justify-center items-center h-full gap-2 p-4' }>
                    { page > 1 && (
                        <Button onClick={() => setPage(1)}
                                variant='ghost'
                                className={ 'text-sm px-3 py-2' }>
                            First
                        </Button>
                    )}

                    <Button onClick={() => setPage((prev) => prev - 1)}
                            disabled={ isFirstPage() || loading }
                            variant='default'
                            className={ 'text-sm px-3 py-2 ml-6' }>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <span className={ [
                        'px-4 py-2',
                        'bg-neutral-100 text-lg font-bold',
                        'border-gray-300  border rounded-lg'
                        ].join(' ') }>
                        { page }
                    </span>

                    <Button onClick={() => setPage((prev) => prev + 1)}
                            variant='default'
                            disabled={ isLastPage() || loading }
                            className={ 'text-sm px-3 py-2 mr-6' }>
                        <ChevronRight className="w-5 h-5" />
                    </Button>

                    { page < numberOfPages && (
                        <Button onClick={() => setPage(numberOfPages)}
                                variant='ghost'
                                className={ 'text-sm px-3 py-2' }>
                            Last
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );

}
