import React from 'react';
import { Character } from '../types/Character';
import CharacterCard from './CharcterCard';

interface CharacterListComponentProps {
  characters: Character[];
}

const CharacterListComponent: React.FC<CharacterListComponentProps> = ({ characters }) => {
  return (
    <div className="row character-list my-5 justify-content-center">
      {characters.map(character => (
        <div className='col-12 col-md-4 col-lg-3 my-2'>
          <CharacterCard key={character.id} character={character} />
        </div>
      ))}
    </div>
  );
};

export default CharacterListComponent;
