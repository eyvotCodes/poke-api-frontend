import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonDetails } from "../api/pokemonApi";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";


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
            setError("Error:", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className={ 'flex justify-center items-center min-h-screen' }>
            { loading && <p>loading...</p> }
            { error && <p>{ error }</p> }

            { pokemon && (
                <div className={ [
                    'relative w-[350px]',
                    'bg-neutral-100 p-4 shadow-xl',
                    'border-black border-8 rounded-lg'].join(' ') }>

                    {/* name */}
                    <h2 className={ [
                        'text-3xl text-center',
                        'text-gray-800 font-bold'].join(' ') }>
                        {pokemon.nombre}
                    </h2>

                    {/* photo */}
                    <div className={ [
                         'flex justify-center',
                         'border-gray-500 p-4 border-4 rounded-lg',
                         'bg-white shadow-lg'].join(' ') }>
                        <Avatar className="w-40 h-40">
                            <AvatarImage src={pokemon.photoUrl} alt={pokemon.nombre} />
                            <AvatarFallback>{pokemon.nombre.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* types and abilities */}
                    <div className="flex justify-center gap-2 mt-4">
                        {pokemon.types.split(", ").map((type, index) => (
                            <Badge key={index}
                                   className={ ['px-3 py-1',
                                       'bg-blue-700 text-white'].join(' ') }>
                                {type}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex justify-center gap-2 mt-2">
                        {pokemon.abilities.split(", ").map((ability, index) => (
                            <Badge key={index} className={ 'text-white bg-green-700 px-3 py-1' }>
                                {ability}
                            </Badge>
                        ))}
                    </div>

                    {/* weight */}
                    <p className="text-center text-gray-700 mt-3">
                        { pokemon.weight } kg
                    </p>

                    {/* evolutions */}
                    <ScrollArea className={ [
                        'text-s',
                        'min-h-16 h-auto max-h-20 w-full overflow-y-auto',
                        'border-neutral-300 rounded-md border-2',
                        'bg-white mt-4 p-2 shadow-inner'].join(' ') }>
                        <h4 className="text-center font-bold">Evolutions:</h4>
                        {pokemon.evolutions?.map((evolution, index) => (
                            <div key={index} className="text-center text-gray-800">
                                {evolution}
                                <Separator className="my-1" />
                            </div>
                        ))}
                    </ScrollArea>

                    {/* description */}
                    <ScrollArea className={ [
                        'text-s',
                        'min-h-24 h-auto max-h-30 w-full overflow-y-auto',
                        'border-neutral-300 rounded-md border-2',
                        'bg-neutral-200 mt-4 p-2 shadow-inner'].join(' ') }>
                        <p className="text-gray-800 text-center">
                            {pokemon.description}
                        </p>
                    </ScrollArea>

                    {/* back button */}
                    <div className="flex justify-end mt-8">
                        <Button onClick={() => navigate(-1)}
                                className={ 'px-4 py-2 rounded-lg shadow-lg' }>
                            Back
                        </Button>
                    </div>

                </div>
            )}
        </div>
    );

}