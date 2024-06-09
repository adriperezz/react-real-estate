import React from 'react';

const FeatureBadge = ({ feature }) => {
  return (
    <>
      <span className="inline-flex items-center rounded-full bg-zinc-300 px-2 py-1 text-neutral-700 ring-1 ring-inset ring-zinc-300">
        {feature}
      </span>
    </>
  );
};

export default FeatureBadge;
