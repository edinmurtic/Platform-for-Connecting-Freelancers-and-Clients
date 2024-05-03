import React from 'react'
import "./ServiceCard.css"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { Link } from 'react-router-dom'

const ServiceCard = ({item }) => {
  const { isLoading, error, data } = useQuery({
     queryKey: [item.userId],
     queryFn: () =>
       newRequest.get(
         `/users/${item.userId}`
       ).then((res) => {
         return res.data
       })
   })
  return (
    <Link to={`/service/${item._id}`}>
   <div className="container">
      <section className="mx-auto my-5" style={{ maxWidth: '23rem' }}>
        <div className="card">
          <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img src={item.cover} className="img-fluid" alt="Restaurant" />
           
          </div>
          <div className="card-body">
            <h5 className="card-title font-weight-bold" style={{minHeight: "50px"}}>{item.shortTitle}</h5>
           
            {isLoading ? ("loading") : error ? ("Something went wrong!") : (

            < > 
      <div className="user-info">
          <img src={data.img} className="profile-img"  style={{ maxWidth: '30px', maxHeight: '30px' }} />
          <p>{data.fullName}</p>
        </div>
        <div style={{display:"flex"}}> <p style={{ fontSize: '34px', marginTop: '-5px' }}>{item.price}KM</p>  {!isNaN(item.totalStars / item.starNumber) && (
 <div className="star" style={{marginTop: "5px", marginLeft: "10px"}}>
 {Array(Math.round(item.totalStars / item.starNumber))
 .fill()
 .map((items,i)=>(
   <img src="../img/star.png" alt="" key={i} width="25px"  />
 ))}
           
            <span >
    { Math.round(item.totalStars / item.starNumber) }
            </span>
            </div>)}</div>
      </>)}
     
         
            <hr className="my-4" />

            {/* <p className="lead"><strong>Stil</strong></p>
            <ul className="list-unstyled list-inline d-flex justify-content-between">
              <li className="list-inline-item me-0">
                <div className="chip me-0">{item.serviceStyle}</div>
              </li>
              <li className="list-inline-item me-0">
                <div className="chip bg-secondary text-white me-0">7:30PM</div>
              </li>
              <li className="list-inline-item me-0">
                <div className="chip me-0">8:00PM</div>
              </li>
              <li className="list-inline-item me-0">
                <div className="chip me-0">9:00PM</div>
              </li>
            </ul> */}
            {/* <a href="#!" className="btn btn-link link-secondary p-md-1 mb-0">Button</a> */}
          </div>
        </div>
      </section>
    </div>
   {/* <div className="card ">
    <img className="card-img-top" src={item.cover}   />
    <div className="card-body sccolor">
    {isLoading ? ("loading") : error ? ("Something went wrong!") : (
      <>
      <div className="user-info">
          <img src={data.img} className="profile-img"  style={{ maxWidth: '30px', maxHeight: '30px' }} />
          <p>{data.username}</p>
        </div>
        <h5 className="card-title">{item.title}</h5>
      
      </>
    )}
      {!isNaN(item.totalStars / item.starNumber) && (
 <div className="star">
 {Array(Math.round(item.totalStars / item.starNumber))
 .fill()
 .map((items,i)=>(
   <img src="../img/star.png" alt="" key={i} width="20px"/>
 ))}
           
            <span>
    { Math.round(item.totalStars / item.starNumber) }
            </span>
          </div>)}
       <div style={{ textAlign: 'right' }}>
          <p style={{ marginBottom: '5px' }}>Cijena od:</p>
          <div style={{ fontSize: '14px', marginTop: '-5px' }}>{item.price}KM</div>
        </div>   </div>
  </div> */}
  
  </Link>
        )
}

export default ServiceCard