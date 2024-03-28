import {useState}  from 'react';
import './Service.css';
import CarouselComp from '../../components/carouselComp/CarouselComp';
import SearchBar from '../../components/searchComponent/SearchComponent';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import Reviews from '../../components/reviews/Reviews';

function Service() {
  
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["service"],
    queryFn: () =>
      newRequest.get(`/services/single/${id}`).then((res) => {
        return res.data;
      }),
    });
    console.log(data)
  
  const userId = data?.userId;

   const {
     isLoading: isLoadingUser,
     error: errorUser,
     data: dataUser,
   } = useQuery({
     queryKey: ["user"],
     queryFn: () =>
       newRequest.get(`/users/${userId}`).then((res) => {
         return res.data;
       }),
     enabled: !!userId,
   });
 

  const [activeButton, setActiveButton] = useState(1);
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    
  };
  return (
<div className="container">
{ isLoading ? ("loading") : error ? ("Something went wrong") : (
<>
    <div className="service-container">
   <div className="carousel-container" style={{ width: '60%' }}>
        <CarouselComp images={data.images} />
      </div>

      <div className="info-container">
        <h2>{data.title}</h2>
        <p>Cijena: {data.price}KM</p>
        <p>Dani isporuke: {data.deliveryTime} dana</p>        <p>Broj mogućih revizija: {data.revisionNumber}</p> 
        {!isNaN(data.totalStars / data.starNumber) && (
 <div className="star">
 {Array(Math.round(data.totalStars / data.starNumber))
 .fill()
 .map((item,i)=>(
   <img src="../img/star.png" alt="" key={i} />
 ))}
           
            <span>
    { Math.round(data.totalStars / data.starNumber) }
            </span>
          </div>)}
        <p>{data.shortDesc} </p>
        <div className="button-container">
          <button className="btn btn-primary continue-button">NASTAVI</button>
          <button className="btn btn-primary contact-button">KONTAKTIRAJTE NAS</button>

        </div>
      </div>
      
      </div> 
      <div>    <button
      className={ activeButton === 1 ? "active" : ""}
      onClick={() => handleButtonClick(1)}
    >
      Opis usluge
    </button>
    <button
      className={activeButton === 2 ? "active" : ""}
      onClick={() => handleButtonClick(2)}
    >
      Button 2
    </button></div>
      <div className='row'>
      <div className='col-6'>
          <div className="buttons-container">

  </div>
  <div className="text-container">
    {activeButton === 1 ? (
      <p>{data.desc}</p>
    ) : (
      <p>Tekst koji se prikazuje kad je aktivan drugi button.</p>
    )}
  </div>
        </div>
        <div className='col-6'>
        <div className="additional-text">
    <p>Preporuka sličnih poslova</p>
  </div>
        </div>
      </div>
      </>)}
 
   <Reviews serviceId={id} />
        </div>
  );
  }

export default Service;
