import React, { useState } from 'react';

const TextWithToggle = ({ text, maxWords }) => {
  const [showAll, setShowAll] = useState(false);

  // Separa el texto en palabras
  const words = text.split(' ');

  // Muestra solo las primeras palabras hasta maxWords
  const displayedWords = showAll ? words : words.slice(0, maxWords);

  // Cambia entre mostrar todas las palabras y solo las primeras maxWords
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <p>
        {displayedWords.join(' ')}
        {!showAll && words.length > maxWords && (
          <span
            onClick={toggleShowAll}
            style={{ cursor: 'pointer', display: 'block' }}
            className="text-own-dark mt-2 text-sm"
          >
            {' '}
            Show more...
          </span>
        )}
        {showAll && (
          <span
            onClick={toggleShowAll}
            style={{ cursor: 'pointer', display: 'block' }}
            className="text-own-dark mt-2 text-sm"
          >
            {' '}
            Show less
          </span>
        )}
      </p>
    </div>
  );
};

export default TextWithToggle;
