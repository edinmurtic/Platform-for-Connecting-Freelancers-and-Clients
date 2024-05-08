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

      <div className="col-md-6 col-lg-4 pb-3">

          <div className="card card-custom bg-white border-white border-0" style={{height: "500px"}}>
          <div className="card-custom-img" style={{backgroundImage: `url(${item.cover})`}}></div>
          <div className="card-custom-avatar">
          {isLoading ? ("loading") : error ? ("Something went wrong!") : (

            <img className="img-fluid"  src={data.img} alt="Avatar" />)}
          </div>
          <div className="card-body" style={{overflowY: "auto"}}>
            <h4 className="card-title">{item.shortTitle}</h4>
            <div dangerouslySetInnerHTML={{ __html: item.shortDesc }} />
          </div>
          <hr className="my-2" />

          <div className="card-footer" style={{background: "inherit", borderColor: "inherit", display:"flex"}}>
          
          <img src="../img/star.png" alt="" style={{marginTop:"2px", marginRight:"5px"}}   width={"20px"} height={"20px"}  /> <p style={{ fontSize: "1.2rem", fontWeight: "bold"}} className="card-text">{ !isNaN(item.totalStars / item.starNumber) && (Math.round(item.totalStars / item.starNumber)) }</p>

          <p style={{ fontSize: "1.2rem", paddingTop:"20px", paddingLeft:"150px"}} className="card-text">Od:{item.price}.00KM</p>

          {/* {isLoading ? ("loading") : error ? ("Something went wrong!") : (

<>  <div style={{display:"flex"}}> <p style={{ fontSize: '34px', marginTop: '-5px' }}>{item.price}KM</p>  {!isNaN(item.totalStars / item.starNumber) && (
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
      </>)} */}

           
     
     
         
          </div>
        </div>

      </div>

      </Link>

        )
}

export default ServiceCard