import React from 'react'
import "./ServiceCard.css"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { Link } from 'react-router-dom'

const ServiceCard = ({item }) => {
   const { isLoading, error, data } = useQuery({
     queryKey: ['item.userId'],
     queryFn: () =>
       newRequest.get(
         `/users/${item.userId}`
       ).then((res) => {
         return res.data
       })
   })
  return (
    <Link to={`/service/${item._id}`}>
   <div className="card">
    <img className="card-img-top" src={item.cover}  style={{ maxWidth: '100%', maxHeight: '200px' }} />
    <div className="card-body">
    {isLoading ? ("loading") : error ? ("Something went wrong!") : (
      <>
        <h5 className="card-title">{item.title}</h5>
        <div className="user-info">
          <img src={data.img} className="profile-img"  style={{ maxWidth: '30px', maxHeight: '30px' }} />
          <p>{data.username}</p>
        </div>
      </>
    )}
      <p className="card-text" style={{minHeight:'50px', maxHeight: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.desc}</p>
      <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
       <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '5px' }}>Cijena od:</p>
          <div style={{ fontSize: '14px', marginTop: '-5px' }}>{item.price}KM</div>
        </div>   </div>
  </div></Link>
        )
}

export default ServiceCard