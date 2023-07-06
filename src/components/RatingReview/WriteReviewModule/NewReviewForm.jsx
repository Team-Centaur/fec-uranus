import React, { useState } from 'react';
import ReactDom from 'react-dom';
import CharacteristicInput from './CharacteristicInput.jsx';
import RecommendInput from './RecommendInput.jsx';
import ReviewerInfoInput from './ReviewerInfoInput.jsx';
import ReviewBodyInput from './ReviewBodyInput.jsx';
import PhotoUpload from './PhotoUpload.jsx';
import StarRatingInput from './StarRatingInput.jsx';
import './NewReviewForm.css';

const ReviewFormStyles = {
  position: 'fixed',
  bottom: '50%',
  left: '50%',
  transform: 'translate(-50%, 50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  width: '50vw',
  height: '90vh',
  overflowY: 'auto',
  textAlign: 'center',
  borderRadius: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '10px',
  zIndex:  2001
};

const FormOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 2001
};

const NewReviewForm = ({ onClose, characteristics }) => {
  let charaList = Object.entries(characteristics);
  const [starRating, setStarRating] = useState(0);
  const [recommendInput, setRecommendInput] = useState(true);
  const [characteristicsInput, setCharacteristicsInput] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
    console.log(starRating, recommendInput, characteristicsInput);
    onClose();
  };

  return ReactDom.createPortal(
    <div style={FormOverlayStyles}>
      <form style={ReviewFormStyles} onSubmit={onSubmit}>
        <button onClick={onClose}>X</button>
        <h3>Write a new review</h3>

        <div className='ratingInput'>
          <h4>Overall rating</h4>
          <StarRatingInput setStarRating={setStarRating} />
        </div>

        <div className='recommendInput'>
          <RecommendInput setRecommendInput={setRecommendInput}/>
        </div>

        <div className='characteristicsInput'>
          {charaList.map((chara) =>
            <CharacteristicInput
              chara={chara}
              key={chara}
              characteristicsInput={characteristicsInput}
              setCharacteristicsInput={setCharacteristicsInput}
            />)}
        </div>

        <div className='summaryInput'>
          <h4>Review Summary</h4>
          <textarea
            maxLength='60'
            style={{width: '300px', height: '50px'}}
            placeholder='Example: Best purchase ever!'
          >
          </textarea>
        </div>

        <div className='bodyInput'>
          <ReviewBodyInput />
        </div>

        <div className='photoUpload'>
          <PhotoUpload />
        </div>

        <div className='reviewerInfo'>
          <ReviewerInfoInput />
        </div>

        <input type='submit' value='Submit'></input>
      </form>
    </div>,
    document.getElementById('portal')
  );
};

export default NewReviewForm;