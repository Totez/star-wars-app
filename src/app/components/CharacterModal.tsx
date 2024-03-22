import React, { useEffect, useState } from 'react';
import { Character } from '../types/Character';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ isOpen, onClose, character }) => {

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content rounded-0">
          <div className="modal-header">
            <h5 className="modal-title">{character.name}</h5>
            <button type="button" className="close btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-6">
                <h5>Karakter tulajdonságai</h5>
                <p>Magasság: {character.height} cm</p>
                <p>Súly: {character.mass} kg</p>
                <p>Születési dátum: {character.birth_year}</p>
              </div>
              <div className="col-6">
                <h5>Szülőföld</h5>
                <>
                  <p>Név: {character.homeworld.name}</p>
                  <p>Terep: {character.homeworld.terrain}</p>
                  <p>Klíma: {character.homeworld.climate}</p>
                </>
              </div>
              <div className="col-6">
                <h5>Filmek</h5>
                <p>{character.films.length} filmben szerepelt:</p>
                <ul>
                  {character.films.map((film, index) => (
                    <li>{film.title}</li>
                  ))}
                </ul>
              </div>
            </div>

            
            
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
