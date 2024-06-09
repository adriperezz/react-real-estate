import React from 'react';

const SectionHomePage = ({
  firstWord,
  secondWord,
  flexDirection,
  textAlign,
  marginTop,
  p1,
  p2,
}) => {
  return (
    <div
      className={`flex text-justify border-y border-stone-400 p-12 items-center ${flexDirection} ${marginTop}`}
    >
      <div className="flex-initial w-64 ">
        <h2
          className={`text-5xl font-bold text-own-medium-dark uppercase ${textAlign}`}
        >
          {firstWord}
          <span className="font-light block text-3xl">{secondWord}</span>
        </h2>
      </div>
      <div className="flex-1 ">
        <p>{p1}</p>
        <p>{p2}</p>
      </div>
    </div>
  );
};

export default SectionHomePage;
