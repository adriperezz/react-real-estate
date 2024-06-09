import React from 'react';

const GridFeatures = ({ p1, p2, capitalize }) => {
  return (
    <>
      <div className="border-b border-neutral-300 py-2 grid grid-cols-2 gap-10">
        <div className="text-sm font-mono text-neutral-500">
          <p>{p1}</p>
        </div>
        <div className="text-neutral-700">
          <p className={capitalize}>{p2}</p>
        </div>
      </div>
    </>
  );
};

export default GridFeatures;
