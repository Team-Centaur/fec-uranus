import React, { Component, useEffect, useState } from 'react';
import Overview from './Overview/Overview.jsx';
import ItemsComponent from './ItemsComponent/ItemsComponent.jsx';
import QuesAnswer from './QuesAnswer/QuesAnswer.jsx';
import RatingReview from './RatingReview/RatingReview.jsx';
import { ReviewIdProvider } from './ReviewIdContext.jsx'; // context needed for overview scrool feature
import CurrContext from '../store/curr-item-context.jsx';
import getProductById from '../helperFunctions/App/getProductById.js';
import getReviewMetadata from '../helperFunctions/getReviewMetadata.js';
import getStylesById from '../helperFunctions/App/getStylesById.js';
import getRandomProd from '../helperFunctions/App/getRandomProd.js';
import getAvgRating from '../helperFunctions/App/getAvgRating.js';
import './App.css';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [currId, setCurrId] = useState(40400); // 40400
  const [currItem, setCurrItem] = useState(null);
  const [currReviewMeta, setCurrReviewMeta] = useState(null);
  const [currStyles, setCurrStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState({});
  const [currAvgRating, setCurrAvgRating] = useState(null);

  useEffect(() => {
    getRandomProd()
      .then((data) => {
        setCurrItem(data);
        return data;
      })
      .then((data) => {
        getReviewMetadata(data.id).then((reviewData) => {
          setCurrReviewMeta(reviewData);
          setCurrAvgRating(getAvgRating(reviewData.ratings));
          console.log();
        });
        return data;
      })
      .then((data) => {
        getStylesById(data.id).then((stylesData) => {
          setCurrStyles(stylesData);
          setCurrentStyle(stylesData.results[0]);
        });
      })
      .catch((err) =>
        console.error(`There was an error fetching product info: ${err}`)
      );
  }, []);

  if (!currItem) {
    return <div>Loading...</div>;
  }
  return (
    // Now all current Data can be pulled from this context,
    // First import CurrContext into the file from the store folder in ./src
    // Then add code below into the component
    // `const currCtx = setContext(CurrentContext)`
    // Whenever you want to access any of these just use this object
    // i.e. `currCtx.currItem` or `currCtx.setCurrStyles()`
    <CurrContext.Provider
      value={{
        currItem: currItem,
        currStyles: currStyles,
        currentStyle: currentStyle,
        currReviewMeta: currReviewMeta,
        currAvgRating: currAvgRating,

        setCurrItem: setCurrItem,
        setCurrStyles: setCurrStyles,
        setCurrentStyle: setCurrentStyle,
        setCurrReviewMeta: setCurrReviewMeta,
        setCurrAvgRating: setCurrAvgRating,
      }}
    >
      {/*  // Can use a state within ReviewIdContext in any child component
    // that ReviewIdProvider is wrapped around.
    // no need to send the state as prop through nested children */}
      <ReviewIdProvider>
        <div className="app-container">
          <h1>Hello worlds!</h1>
          <Overview
            currItem={currItem}
            currentStyle={currentStyle}
            setCurrentStyle={setCurrentStyle}
          />
          <ItemsComponent />
          <QuesAnswer product={currItem} />
          <RatingReview currItem={currItem} />
        </div>
      </ReviewIdProvider>
    </CurrContext.Provider>
  );
}

export default App;
