import React from 'react';

const StarFilter = ({ stars, numOfVotes, sumOfVotes, onFilterClick }) => {
  const starFilterStyles = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px'
  }

  const starBarStyles = {
    height: '8px',
    width: '70%',
    backgroundColor: 'LightGray',
    borderRadius: '50px',
    margin: '0px',
    display: 'inline-block'
  };

  const starBarFillStyles = {
    height: '100%',
    width: (!!numOfVotes ? (numOfVotes / sumOfVotes * 100 + '%') : 0), // do not render if NaN
    backgroundColor: 'MediumSeaGreen',
    borderRadius: 'inherit',
  };


  return (
    <div className='starFilter' value={stars} style={starFilterStyles} role='button' onClick={onFilterClick}>
      <span> {stars} {(stars === '1') ? 'Star' : 'Stars'} </span>
      <div className='starBar' style={starBarStyles}>
        <div className='starBarFill' style={starBarFillStyles}>
        </div>
      </div>
      <span> {numOfVotes || '0'} </span>
    </div>
  );
};

export default StarFilter;