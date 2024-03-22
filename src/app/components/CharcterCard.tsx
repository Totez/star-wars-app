import React, { useState } from 'react';
import CharacterModal from './CharacterModal';
import { Character } from '../types/Character';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card rounded-0" onClick={handleOpenModal}>
        <div className="card-image">
          <img className="w-100" src={character.image} alt="Character" />
        </div>
        <div className="card-header">
          <h5 className='text-center'>{character.name}</h5>
        </div>
      </div>
      <CharacterModal isOpen={isModalOpen} onClose={handleCloseModal} character={character} />
    </>
  );
};

export default CharacterCard;
