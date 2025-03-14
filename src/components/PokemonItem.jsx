import { Link } from "react-router-dom";


export default function PokemonItem({ pokemon }) {
    return (
        <Link to={`/pokemon/${pokemon.id}`} >
            <div className={ [
                'flex items-center w-80 h-24',
                'gap-4 p-4',
                'bg-white',
                'border-gray-300 border rounded-lg',
                'hover:shadow-lg transition'].join(' ') }>

                {/* photo */}
                <img src={ pokemon.photoUrl }
                     alt={ pokemon.nombre }
                     className="w-20 h-20 object-contain"/>

                {/* info */}
                <div className="flex flex-col">
                    <h3 className="text-l font-bold">{ pokemon.nombre }</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">Weight: { pokemon.weight } kg</p>
                    <p className="text-sm text-gray-600 line-clamp-1">Types: { pokemon.types }</p>
                    <p className="text-sm text-gray-600 line-clamp-1">Abilities: { pokemon.abilities }</p>
                </div>

            </div>
        </Link>
    );
}
