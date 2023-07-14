import React, { useContext } from 'react';
import ReviewTile from './ReviewTile.jsx';
import SortOrderButton from './SortOrderButton.jsx';
import './ReviewsListModule.css';
import CurrContext from '../../../store/curr-item-context.jsx';

const ReviewsList = ({ reviews, page, loadMoreReviews, allReviewsLoaded, changeSortOrder }) => {
  const currCtx = useContext(CurrContext);
  return (
    <div className={`reviewsComponent ${currCtx.currTheme}`} data-testid='reviewsList'>
      <h2> REVIEWS </h2>
      <SortOrderButton changeSortOrder={changeSortOrder} />
      <div className='reviewsListModule reviewsList'>
        {reviews.map((review) => <ReviewTile review={review} key={review.id} />)}
        {!allReviewsLoaded && <button type='button' onClick={loadMoreReviews}>Show more reviews</button>}
      </div>
    </div>
)};
export default ReviewsList;
