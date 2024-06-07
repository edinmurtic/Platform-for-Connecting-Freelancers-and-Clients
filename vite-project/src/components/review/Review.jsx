import React from 'react';
import './Review.css'; // Importaj CSS file
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
function Review({ review }) {
    const { isLoading, error, data } = useQuery(
        {
          queryKey: [review.userId],
          queryFn: () =>
            newRequest.get(`/users/${review.userId}`).then((res) => {
              return res.data;
            }),
        },
      );
    return (
        <div className="testimonial-box">
         {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="box-top">
            <div className="profile">
                <div className="profile-img">
                    <img src={data.img} alt="Client 1" />
                </div>
                <div className="name-user">
                    <strong>{data.fullName}</strong>
                    <span>@{data.username}</span>
                </div>
            </div>
            <div className="reviews">
            {Array(review.star)
          .fill()
          .map((item, i) => (
            <FontAwesomeIcon icon={faStar} key={i} />

            
          ))}
          <span>{review.star}</span>
            </div>
        </div> )}
        <div className="client-comment">
            <p>{review.desc}</p>
        </div>
    </div>
    );
}

export default Review;