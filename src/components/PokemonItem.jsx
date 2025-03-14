import { Card } from "@/components/ui/card.jsx";
import { Link } from "react-router-dom";


export default function PokemonItem({ pokemon }) {
    return (
        <Link to={`/pokemon/${ pokemon.id }`}>
            <Card>
                <img src={ pokemon.photoUrl } alt={ pokemon.nombre } />
                <h3>{ pokemon.nombre }</h3>
                <p>Types: { pokemon.types }</p>
                <p>Weight: { pokemon.weight }</p>
                <p>Abilities: { pokemon.abilities }</p>
            </Card>
        </Link>
    );
}
