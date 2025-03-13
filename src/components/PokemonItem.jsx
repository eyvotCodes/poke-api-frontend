import { Card } from "@/components/ui/card.jsx";


export default function PokemonItem({ pokemon }) {
    return (
        <Card>
            <img src={ pokemon.photoUrl } alt={ pokemon.nombre } />
            <h3>{ pokemon.nombre }</h3>
            <p>{ 'Tipo: ' + pokemon.types }</p>
            <p>{ 'Peso: ' + pokemon.weight }</p>
            <p>{ 'Habilidades: ' + pokemon.abilities }</p>
        </Card>
    );
}
