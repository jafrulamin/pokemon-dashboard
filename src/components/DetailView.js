import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function DetailView({ data }) {
    const { id } = useParams();
    const pokemon = data[parseInt(id)];
    const [speciesInfo, setSpeciesInfo] = useState(null);

    useEffect(() => {
        const fetchSpeciesInfo = async () => {
            if (pokemon) {
                try {
                    const response = await axios.get(pokemon.species_url);
                    setSpeciesInfo(response.data);
                } catch (error) {
                    console.error('Error fetching species info:', error);
                }
            }
        };
        fetchSpeciesInfo();
    }, [pokemon]);

    if (!pokemon) {
        return (
            <div className="detail-view">
                <h2>Pokémon not found</h2>
                <Link to="/" className="back-link">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="detail-view">
            <Link to="/" className="back-link">Back to Dashboard</Link>

            <div className="detail-content">
                <div className="pokemon-header">
                    <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite large" />
                    <div className="pokemon-title">
                        <h2>{pokemon.name}</h2>
                        <div className="type-tags">
                            {pokemon.types.map(type => (
                                <span key={type} className={`type-tag ${type}`}>{type}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pokemon-stats">
                    <h3>Base Stats</h3>
                    <div className="stats-grid">
                        {pokemon.stats.map(stat => (
                            <div key={stat.stat.name} className="stat-bar">
                                <span className="stat-name">{stat.stat.name.replace('-', ' ')}</span>
                                <div className="stat-bar-container">
                                    <div
                                        className="stat-bar-fill"
                                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                    >
                                        {stat.base_stat}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pokemon-info">
                    <div className="info-section">
                        <h3>Physical Characteristics</h3>
                        <ul>
                            <li>Height: {pokemon.height / 10} m</li>
                            <li>Weight: {pokemon.weight / 10} kg</li>
                        </ul>
                    </div>

                    <div className="info-section">
                        <h3>Abilities</h3>
                        <ul>
                            {pokemon.abilities.map(ability => (
                                <li key={ability}>{ability.replace('-', ' ')}</li>
                            ))}
                        </ul>
                    </div>

                    {speciesInfo && (
                        <>
                            <div className="info-section">
                                <h3>Species Info</h3>
                                <p>{speciesInfo.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text}</p>
                            </div>

                            <div className="info-section">
                                <h3>Additional Details</h3>
                                <ul>
                                    <li>Generation: {speciesInfo.generation.name.replace('-', ' ')}</li>
                                    <li>Habitat: {speciesInfo.habitat?.name || 'Unknown'}</li>
                                    <li>Growth Rate: {speciesInfo.growth_rate.name.replace('-', ' ')}</li>
                                    <li>Capture Rate: {speciesInfo.capture_rate}</li>
                                    <li>Base Happiness: {speciesInfo.base_happiness}</li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailView;