'use client'

import Image from "next/image";

import { useState, useEffect } from 'react';

const cardsData = [
  { id: 1, image: '/flip1.png' },
  { id: 2, image: '/flip2.png' },
  { id: 3, image: '/flip3.png' },
  { id: 4, image: '/flip4.png' },
  { id: 5, image: '/flip5.png' },
  { id: 6, image: '/flip6.png' },
  { id: 7, image: '/flip7.png' },
  { id: 8, image: '/flip8.png' },
];

const shuffleCards = (cards: typeof cardsData) => {
  return [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({ ...card, id: index }));
};

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleCards(cardsData));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].image === cards[second].image) {
        setMatchedCards((prevMatchedCards) => [
          ...prevMatchedCards,
          cards[first].id,
          cards[second].id,
        ]);
        setScore((prevScore) => prevScore + 10);
      } else {
        setScore((prevScore) => prevScore - 1);
      }
      setMoves((prevMoves) => prevMoves + 1);
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards, matchedCards, moves, score]); // Add missing dependencies
  

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(cards[index].id)) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const handleReset = () => {
    setCards(shuffleCards(cardsData));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-yellow-100 to-pink-200">
      <div className="max-w-4xl w-full p-8 rounded-xl bg-white bg-image shadow-lg flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center text-teal-500 mb-6">Memory Matching Game</h1>
  
        <div className="flex justify-between items-center w-full mb-6">
          <div className="text-xl text-blue-500 font-extrabold">Moves: {moves}</div>
          <div className="text-xl text-red-500 font-extrabold">Score: {score}</div>
        </div>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {cards.map((card, index) => (
            <div key={card.id} className="relative">
              <div
                className={`w-20 h-20 flex justify-center items-center bg-gray-200 rounded-lg shadow-lg cursor-pointer transform duration-300
                  ${flippedCards.includes(index) || matchedCards.includes(card.id) ? 'bg-white' : 'bg-gray-200'}`}
                onClick={() => handleCardClick(index)}
              >
                {flippedCards.includes(index) || matchedCards.includes(card.id) ? (
                  <Image
                    src={card.image}
                    alt={`card-${card.id}`}
                    height={200}
                    width={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-300 rounded-lg" />
                )}
              </div>
            </div>
          ))}
        </div>
  
        <button
          onClick={handleReset}
          className="mt-6 px-6 py-2 font-bold bg-teal-500 text-white text-lg rounded-lg hover:bg-pink-300 transition duration-300"
        >
          Restart Game
        </button>
        <h4 className="font-bold mt-4">Author:Azmat Ali</h4>
      </div>
    </div>
  );
  
};

export default MemoryGame;
