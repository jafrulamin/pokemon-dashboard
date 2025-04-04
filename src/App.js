import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();

        const detailsPromises = data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          return detailResponse.json();
        });

        const allDetails = await Promise.all(detailsPromises);

        setPokemonData(allDetails);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const totalPokemon = pokemonData.length;

  const averageBaseExp = totalPokemon
    ? (pokemonData.reduce((sum, p) => sum + p.base_experience, 0) / totalPokemon).toFixed(2)
    : 0;


  const allTypes = pokemonData.flatMap((p) => p.types.map((t) => t.type.name));
  const typeCountMap = {};
  allTypes.forEach((type) => {
    typeCountMap[type] = (typeCountMap[type] || 0) + 1;
  });
  let mostCommonType = 'N/A';
  if (allTypes.length > 0) {
    mostCommonType = Object.keys(typeCountMap).reduce((a, b) =>
      typeCountMap[a] > typeCountMap[b] ? a : b
    );
  }


  const uniqueTypes = ['All', ...new Set(allTypes)];


  const filteredBySearch = pokemonData.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const filteredByType = filteredBySearch.filter((p) => {
    if (selectedType === 'All') return true;
    return p.types.some((t) => t.type.name === selectedType);
  });

  if (isLoading) {
    return (
      <div className="App">
        <h1>Pokémon Dashboard</h1>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="app-title">Pokémon Dashboard</h1>

      {/* Line-by-Line Summary Stats */}
      <div className="line-stats">
        <p><strong>Total Pokémon:</strong> {totalPokemon}</p>
        <p><strong>Average Base Experience:</strong> {averageBaseExp}</p>
        <p><strong>Most Common Type:</strong> {mostCommonType}</p>
      </div>

      {/* Line-by-Line Filters */}
      <div className="line-filters">
        {/* Search */}
        <div className="line-filter">
          <label htmlFor="search">
            Search by Name:
            <input
              id="search"
              type="text"
              placeholder="e.g., pikachu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        {/* Filter by Type */}
        <div className="line-filter">
          <label htmlFor="type">
            Filter by Type:
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {uniqueTypes.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Pokémon Data Table */}
      <table className="pokemon-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Base Exp</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {filteredByType.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</td>
              <td>{pokemon.base_experience}</td>
              <td>{pokemon.types.map((t) => t.type.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
