"use client";

import React, { useEffect, useState } from 'react';
import CharacterListComponent from './components/CharacterList';
import { Character } from './types/Character';
import { fetchCharacters } from './apis/characters';
import { fetchFilms } from './apis/films';
import { Film } from './types/Film';
import { Planet } from './types/Planet';
import { fetchPlanets } from './apis/planets';
import Image from 'next/image';
import loaderImage from './images/bb8.gif';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [tmpText, setTmpText] = useState<string>('');
  const [selectedFilmTitle, setSelectedFilmTitle] = useState<string>('All Films');
  const [selectedHomeworldName, setSelectedHomeworldName] = useState<string>('All Planets');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  
    Promise.all([
      fetchCharacters(searchText, currentPage),
      fetchFilms(),
      fetchPlanets(),
    ]).then(([charactersData, filmsData, planetsData]) => {
      const { characters, isLastPage } = charactersData;
  
      setCharacters(characters);
      setIsLastPage(isLastPage);
      setFilms(filmsData);
      setPlanets(planetsData);
      setLoading(false);
      console.log(planetsData);
    }).catch(error => {
      setError('Error fetching data: ' + error.message);
      setLoading(false);
    });
  }, [searchText, currentPage]);
  
  

  useEffect(() => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedFilmTitle === "All Films" || character.films.some(film => film.title === selectedFilmTitle)) &&
      (selectedHomeworldName === "All Planets" || character.homeworld.name === selectedHomeworldName)
    );
    setFilteredCharacters(filtered);
  }, [searchText, characters, selectedFilmTitle, selectedHomeworldName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(tmpText.length > 2 || tmpText.length === 0){
        setSearchText(tmpText);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [tmpText]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTmpText(event.target.value);
  };

  const handleFilmFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilmTitle(event.target.value);
  };
  
  const handleHomeworldFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHomeworldName(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="container py-5">
      
      {/* Betöltés jelzése loader animációval */}
      {loading && 
        <div className='loader'>
          <Image src={loaderImage} alt="My Image" />
        </div>
      }
      
      {/* Hibajelzés */}
      {error && <div>{error}</div>}


      {/* Karakterlista komponens és szűrők megjelenítése, ha betöltődött és nincs hiba */}
      {!loading && !error && 
        <>
          <h1 className='text-center text-uppercase mb-4'>Star Wars karakterek</h1>

          <div className="row justify-content-center">
            <div className="col-12 col-md-7">
              <div className="input-group mb-3">
                <span className="input-group-text">Keresés név szerint</span>
                <input className='form-control' type="text" value={tmpText} onChange={handleSearchChange} />
              </div>

              {searchText !== "" && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Szűrés film szerint</span>
                    <select className='form-select' onChange={handleFilmFilterChange}>
                      <option value="All Films">Összes film</option>
                      {films.map((film, index) => (
                        <option key={index} value={film.title}>{film.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Szűrés szülőföld szerint</span>
                    <select className='form-select' onChange={handleHomeworldFilterChange}>
                      <option value="All Planets">Összes bolygó</option>
                      {planets.map((planet, index) => (
                        <option key={index} value={planet.name}>{planet.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}


            </div>
          </div>
          <CharacterListComponent characters={filteredCharacters} />
          
          <div className="row justify-content-center">
            <div className="col-4 d-flex justify-content-between">
              <button className="btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>Előző oldal</button>
              <button className="btn-primary" onClick={handleNextPage} disabled={isLastPage}>Következő oldal</button>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default App;
