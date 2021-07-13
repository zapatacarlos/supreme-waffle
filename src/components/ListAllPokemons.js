import React from 'react'
import EnhancedTable from './TableAllPokemons'
import "../App.css";

function ListAllPokemons({data}) {
    // console.log(data)
    return (
        <div className="listAllStyling">
            <ul>
                {/* {data && data.map(pokemon => <li key={pokemon.id} >{pokemon.name.english}</li>)} */}

                <EnhancedTable data={data} className="pokemons_table"/>

            </ul>
        </div>
    )
}

export default ListAllPokemons;
