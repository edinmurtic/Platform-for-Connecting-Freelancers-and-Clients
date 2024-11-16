import React, { useEffect, useState } from 'react'
import './Reviews.css'
import Review from '../review/Review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const Reviews = ({serviceId,currentUser}) => {

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [userOrders, setUserOrders] = useState([]);

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
      queryKey: ["reviews"],
      queryFn: () =>
        newRequest.get(`/reviews/${serviceId}`).then((res) => {
          return res.data;
        }),
    });
    const { data: userReviewData } = useQuery({
      queryKey: ["userReview", serviceId, currentUser?._id],
      queryFn: () =>
        currentUser ? newRequest.get(`/reviews/${serviceId}/${currentUser._id}`).then((res) => {
              return res.data;
          }) : Promise.resolve(null),
        enabled: !!currentUser
  });
    const fetchOrdersByBuyerAndService = async () => {
      try {
          const response = await newRequest.get(`/orders/${currentUser._id}/${serviceId}`);
          console.log("response",response)
          return response.data; // Vraćamo podatke iz odgovora
      } catch (error) {
          console.error('Error fetching orders:', error);
          throw new Error('Error fetching orders'); // Možemo ponovo baciti grešku ako dođe do problema s dohvaćanjem narudžbi
      }
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
        const orders = await fetchOrdersByBuyerAndService();
        setUserOrders(orders);
    };

    fetchUserOrders();
}, []);


    const mutation = useMutation({
      mutationFn: (review) => {
        return newRequest.post("/reviews", review);
      },
      onSuccess:()=>{
        queryClient.invalidateQueries(["reviews"])
      }
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const desc = reviewText;
      const star = rating;
      mutation.mutate({ serviceId, desc, star });
    };
  
    const userHasBoughtService = userOrders && userOrders.some(order => order.serviceId === serviceId);
    const userHasReviewedService = userReviewData && userReviewData.length > 0;

console.log("userHasBoughtService",userHasBoughtService)
  return (
    <section id="testimonials">
   {data && data.length > 0 && (
                <div className="testimonial-heading">
                    <span>Recenzije</span>
                    <h1>Klijenti kažu</h1>
                </div>
            )}
    <div className="testimonial-box-container">
    {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      
    </div>
        {userHasBoughtService && !userHasReviewedService  && (<form onSubmit={handleSubmit} className="testimonial-box" >
          <div className="box-top">
          <div className="profile">
                <div className="profile-img">
                    <img src={currentUser.img} alt="Client 1" />
                </div>
                <div className="name-user">
                    <strong>{currentUser.fullName}</strong>
                    <span>@{currentUser.username}</span>
                </div>
            </div>
            <div >
                    Ocijenite servis:
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesomeIcon
                            key={star}
                            icon={faStar}
                            className={star <= rating ? 'star-filled' : ''}
                            onClick={() => handleRatingChange(star)}
                        />
                    ))}
                </div>
        </div>
        <label className="client-comment">
                    <textarea
                    value={reviewText}
                    onChange={handleReviewTextChange}
              name="rev"
              id=""
              placeholder="Unesite svoju recenziju:"
              cols="50"
              rows="6"
            ></textarea>
                </label>
               
                <button type="submit" className="btn btn-success">Dodaj recenziju</button>
            </form>)}
</section>  )
}

export default Reviews