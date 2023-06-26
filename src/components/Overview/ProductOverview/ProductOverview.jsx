/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Stars from './Stars/Stars.jsx';

const ProductOverview = ({ dataObj }) => {
  const avgRating = (ratingObj) => {
    let sumRatings = 0;
    let reviewTotal = 0;
    Object.keys(ratingObj).forEach((key) => {
      const multiply = key * ratingObj[key];
      sumRatings += multiply;
      reviewTotal += parseInt(ratingObj[key], 10);
    });
    return sumRatings / reviewTotal;
  };

  if (dataObj) {
    return (
      <div className="product-overview-container">
        <Stars avgRating={avgRating(dataObj.ratings)} />
        <div className="product-category">
          { dataObj.category }
        </div>
        <h2 className="product-name">
          { dataObj.name}
        </h2>
        <div className="product-price">
          { dataObj.defaultPrice }
        </div>
        <div className="product-sale-price"></div>
      </div>

    );
  }
  return null;
};
export default ProductOverview;