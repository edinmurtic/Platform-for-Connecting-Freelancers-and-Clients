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

      <div className="col-md-6 col-lg-4 pb-1">

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

            <div className='card-footer'>
              <div className='row'>
                <div className='col-7'><p style={{ fontSize: "1.3rem"}}>{item.category}</p></div>
                <div className='col-5' style={{paddingLeft:"1px"}}>{!isNaN(item.totalStars / item.starNumber) && (  <div style={{background: "inherit", borderColor: "inherit", display:"flex"}}><p></p>  {Array(Math.round(item.totalStars / item.starNumber))
 .fill()
 .map((item,i)=>(
   <img src="../img/star.png" style={{marginTop:"3px", marginRight:"3px"}} width={"21px"} height={"21px"} alt="" key={i} />
 ))} <p style={{ fontSize: "1.3rem", fontWeight: "bold", paddingLeft:"2px"}} className="card-text">{ !isNaN(item.totalStars / item.starNumber) &&
           (Math.round(item.totalStars / item.starNumber)) }</p></div>)}</div>

              </div>
              <div className='row'>
                <div className='col-3'><p></p></div>
                <div className='col-9'><p style={{ fontSize: "1.4rem"}} className="card-text">Već od:{item.price}.00KM</p></div>

              </div>
            </div>


          {/* <div className="card-footer" style={{background: "inherit", borderColor: "inherit", display:"flex"}}>
          
          {!isNaN(item.totalStars / item.starNumber) && (  <> <img src="../img/star.png" alt="" style={{marginTop:"2px", marginRight:"5px"}}   width={"20px"} height={"20px"}  /> <p style={{ fontSize: "1.2rem", fontWeight: "bold"}} className="card-text">{ !isNaN(item.totalStars / item.starNumber) &&
           (Math.round(item.totalStars / item.starNumber)) }</p></>)}
            
          <p style={{ fontSize: "1.2rem", paddingTop:"20px", marginLeft:"150px"}} className="card-text">Od:{item.price}.00KM</p>

          </div> */}
        </div>

      </div>

      </Link>

        )
}

export default ServiceCard