import React from 'react';
import './AboutUser.css'
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
const AboutUser = ({id,professionalArea,fullName,username,email,img, phone, country, desc,isSeller,myDate}) => {
    console.log(id)
    console.log(isSeller)

    const {  data: servicesData,isLoading: servicesLoading, isError: servicesError } = useQuery({
        queryKey: ["services",id],
        queryFn: () =>
          newRequest.get(`/services?userId=${id}&isActive=true` ).then((res) => {
            return res.data.length;
        }),
      });
    console.log("serviceData",servicesData)
    const { data: orderData, isLoading: ordersLoading, isError: ordersError } = useQuery({
        queryKey: ["orders", id, isSeller],
        queryFn: () =>
          newRequest.get(`/orders/countOrders`, { params: { userId: id, isSeller } }).then((res) => res.data.count),
      });
      
      console.log("orderData", orderData);
      return (
    <section className="section about-section gray-bg" id="about">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-6">
            <div className="about-text go-to">
              <h3 className="dark-color">O meni</h3>
              <h6 className="theme-color lead">Ja sam {fullName} i moja strast je {professionalArea}  </h6>
              <div className="small-font"  dangerouslySetInnerHTML={{ __html: desc }} />              <div className="row about-list">
                <div className="col-md-6">
                  <div className="media">
                    <label>Ime i prezime</label>
                    <p>{fullName}</p>
                  </div>
                  <div className="media">
                    <label>E-mail</label>
                    <p>{email}</p>
                  </div>
                
                
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <label>Korisničko ime</label>
                    <p>{username}</p>
                  </div>
                  <div className="media">
                    <label>Telefon</label>
                    <p>{phone}</p>
                  </div>
                 
                
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-avatar">
              <img src={img} title="" alt="" />
            </div>
          </div>
        </div>
  
                  <div className="counter">
          <div className="row">
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
              {ordersLoading ?("isLoading"): ordersError ? ("error"):( 
                <h6 className="count h4" data-to="500" data-speed="500">{orderData}</h6>)}
                <p className="m-0px font-w-600">Završenih servisa</p>
              </div>
            </div> 
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
              {servicesLoading ?("isLoading"): servicesError ? ("error"):( 
                <h6 className="count h4" data-to="150" data-speed="150">{servicesData}</h6>)}
                <p className="m-0px font-w-600">Trenutnih servisa</p>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
              {ordersLoading ?("isLoading"): ordersError ? ("error"):( 
                <h6 className="count h4" data-to="850" data-speed="850">{country}</h6>)}
                <p className="m-0px font-w-600">Država</p>
              </div>
            </div> 
            <div className="col-6 col-lg-3">
              <div className="count-data text-center">
              {servicesLoading ?("isLoading"): servicesError ? ("error"):( 
                <h6 className="count h4" data-to="190" data-speed="190">{myDate}</h6>)}
                <p className="m-0px font-w-600">Datum pridruživanja</p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </section>
 
  );
}

export default AboutUser;
