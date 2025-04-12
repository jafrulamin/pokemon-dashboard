import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DetailView from './components/DetailView';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch first 151 Pokemon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const results = response.data.results;

        // Fetch detailed data for each Pokemon
        const detailedData = await Promise.all(
          results.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            return {
              id: detailResponse.data.id,
              name: detailResponse.data.name,
              types: detailResponse.data.types.map(type => type.type.name),
              height: detailResponse.data.height,
              weight: detailResponse.data.weight,
              abilities: detailResponse.data.abilities.map(ability => ability.ability.name),
              stats: detailResponse.data.stats.map(stat => ({
                stat: {
                  name: stat.stat.name
                },
                base_stat: stat.base_stat
              })),
              sprite: detailResponse.data.sprites.front_default,
              species_url: detailResponse.data.species.url
            };
          })
        );
        setData(detailedData);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data
    .filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.types.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(pokemon => !filter || pokemon.types.includes(filter));

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  data={filteredData}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filter={filter}
                  setFilter={setFilter}
                />
              }
            />
            <Route path="/detail/:id" element={<DetailView data={data} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;