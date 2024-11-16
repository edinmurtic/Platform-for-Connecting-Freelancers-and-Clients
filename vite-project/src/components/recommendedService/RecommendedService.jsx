import React from 'react'
import { Link } from 'react-router-dom'

const RecommendedService = ({categoryItem}) => {
  return (
    <div className="d-flex mb-3 ">
    <Link to={`/service/${categoryItem._id}`} className="me-2">               
        <img src={categoryItem.cover} style={{minWidth:'100px', height: '90px'}}
         className="img-md img-thumbnail" />
</Link>
 <div className="info">
                <p style={{fontSize:"12px"}}>{categoryItem.title}</p> 
                  <strong className="text-dark"> {categoryItem.price} KM </strong>
                </div></div>  )
}

export default RecommendedService