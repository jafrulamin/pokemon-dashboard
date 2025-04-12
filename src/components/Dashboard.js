import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Dashboard({ data, searchQuery, setSearchQuery, filter, setFilter }) {
    const [chartWidth, setChartWidth] = useState(window.innerWidth < 768 ? window.innerWidth - 80 : 400);

    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth < 768 ? window.innerWidth - 80 : 400);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const totalPokemon = data.length;
    const typeCount = data.reduce((acc, pokemon) => {
        pokemon.types.forEach(type => {
            acc[type] = (acc[type] || 0) + 1;
        });
        return acc;
    }, {});

    const averageWeight = Math.round(
        data.reduce((sum, pokemon) => sum + pokemon.weight, 0) / totalPokemon
    ) / 10;

    const typeData = Object.entries(typeCount)
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({
            name,
            value
        }));

    const statAverages = data.reduce((acc, pokemon) => {
        pokemon.stats.forEach(stat => {
            acc[stat.stat.name] = (acc[stat.stat.name] || 0) + stat.base_stat;
        });
        return acc;
    }, {});

    Object.keys(statAverages).forEach(key => {
        statAverages[key] = Math.round(statAverages[key] / totalPokemon);
    });

    const statOrder = [
        { key: 'hp', display: 'hp' },
        { key: 'attack', display: 'attack' },
        { key: 'defense', display: 'defense' },
        // { key: 'special-attack', display: 'special attack' },
        { key: 'special-defense', display: 'special defense' },
        { key: 'speed', display: 'speed' }
    ];

    const statData = statOrder.map(({ key, display }) => ({
        name: display,
        value: statAverages[key] || 0
    }));

    const TYPE_COLORS = {
        grass: '#78C850',
        poison: '#A040A0',
        fire: '#F08030',
        flying: '#A890F0',
        water: '#6890F0',
        bug: '#A8B820',
        normal: '#A8A878',
        electric: '#F8D030',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        steel: '#B8B8D0',
        ice: '#98D8D8',
        ghost: '#705898',
        dragon: '#7038F8'
    };

    const CustomLegend = () => {
        const rows = [];
        const itemsPerRow = 9;

        for (let i = 0; i < typeData.length; i += itemsPerRow) {
            const rowItems = typeData.slice(i, i + itemsPerRow);
            rows.push(
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', justifyContent: 'center' }}>
                    {rowItems.map(({ name }) => (
                        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '40px' }}>
                            <div
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: TYPE_COLORS[name],
                                    marginBottom: '0.5rem'
                                }}
                            />
                            <span style={{ fontSize: '0.85rem', color: '#666' }}>{name}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return <div style={{ marginTop: '1rem' }}>{rows}</div>;
    };

    return (
        <div className="dashboard">
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search by name or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Types</option>
                    {Object.keys(typeCount).sort().map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="stats">
                <div className="stat-card">
                    <h3>Total Pokémon</h3>
                    <p>{totalPokemon}</p>
                </div>
                <div className="stat-card">
                    <h3>Types</h3>
                    <p>{Object.keys(typeCount).length} types</p>
                </div>
                <div className="stat-card">
                    <h3>Avg Weight</h3>
                    <p>{averageWeight} kg</p>
                </div>
            </div>

            <div className="charts">
                <div className="chart">
                    <h3>Type Distribution</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={typeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={chartWidth / 4}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {typeData.map(entry => (
                                    <Cell key={`cell-${entry.name}`} fill={TYPE_COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <CustomLegend />
                </div>

                <div className="chart">
                    <h3>Average Base Stats</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={statData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#FF6B6B" name=" " />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="data-list">
                {data.map((pokemon) => (
                    <Link to={`/detail/${pokemon.id - 1}`} key={pokemon.id} className="data-item">
                        <div className="data-item-content">
                            <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-sprite" />
                            <h3>{pokemon.name}</h3>
                            <div className="type-tags">
                                {pokemon.types.map(type => (
                                    <span key={type} className={`type-tag ${type}`}>{type}</span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;