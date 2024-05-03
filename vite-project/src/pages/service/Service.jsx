import {useEffect, useState}  from 'react';
import './Service.css';
import CarouselComp from '../../components/carouselComp/CarouselComp';
import SearchBar from '../../components/searchComponent/SearchComponent';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import Reviews from '../../components/reviews/Reviews';
import RecommendedService from '../../components/recommendedService/RecommendedService';
import getCurrentUser from '../../utils/getCurrentUser';

function Service() {
  const [activeTab, setActiveTab] = useState('Specification');
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["service"],
    queryFn: () =>
      newRequest.get(`/services/single/${id}`).then((res) => {
        return res.data;
      }),
    });
    console.log("data",data)
  
  const userId = data?.userId;
  const getCategory=data?.category;
  console.log("categorija:",getCategory);

   const {
   isLoading: userisLoading,
   error: usererror,
     data: dataUser,
   } = useQuery({
     queryKey: ["user"],
     queryFn: () =>
       newRequest.get(`/users/${userId}`).then((res) => {
         return res.data;
       }),
     enabled: !!userId,
   });
   console.log(dataUser)
   
   const handleContact = async () => {
    const sellerId = dataUser._id;
    const buyerId = currentUser._id;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

   const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const { isLoading:isLoadingCategory, error:errorCategory, data: dataCategory,refetch } = useQuery({
    queryKey: ["serviceCat"],
    queryFn: () =>
      newRequest.get(`/services?search=&category=${getCategory}&isActive=true`).then((res) => {
        return res.data;
      }),
    });
    console.log("dataCategoryNiz",dataCategory)
    useEffect(() => {
      refetch();
    }, [activeTab]);  return (
<div className="container">
{ isLoading ? ("loading") : error ? ("Something went wrong") : (
<>
    {/* <div className="service-container">
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
          <Link to= {`/pay/${id}`}> <button className="btn btn-primary continue-button">NASTAVI</button></Link>
         
          <button className="btn btn-primary contact-button">KONTAKTIRAJTE NAS</button>

        </div>
      </div>
      
      </div>  */}
      <section className="py-5">
  <div className="container">
    <div className="row gx-5">
      <aside className="col-lg-6">
        <div className="border rounded-4 mb-3 d-flex justify-content-center">
         <CarouselComp images={data.images} />
        </div>
      
      </aside>
      <main className="col-lg-6">
        <div className="ps-lg-3">
          <h4 className="title text-dark">
            {data.title}
          </h4>
          <div className="d-flex flex-row my-3">
            <div className="text-warning mb-1 me-2">
            {!isNaN(data.totalStars / data.starNumber) && (
 <div className="star">
 {Array(Math.round(data.totalStars / data.starNumber))
 .fill()
 .map((item,i)=>(
   <img src="../img/star.png" width="20px" alt="" key={i} />
 ))}
           
            <span className="ms-1">
    { Math.round(data.totalStars / data.starNumber) }
            </span>
          </div>)}
            
              {/* <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fas fa-star-half-alt"></i> */}
            
            </div>
            <span className="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>{data.starNumber}</span>
            <span className="text-success ms-2">RECENZIJA</span>
          </div>

          <div className="mb-3">
            <span className="h5">{data.price}KM</span>
          </div>

          <p>
          <div dangerouslySetInnerHTML={{ __html: data.shortDesc }} />
          </p>

           <div className="row">
            <dt className="col-3">Isporuka za:</dt>
            <dd className="col-9">{data.deliveryTime} dana</dd>

            <dt className="col-3">Revizije:</dt>
            <dd className="col-9">{data.revisionNumber} besplatne</dd>

            {getCategory==="Grafika i dizajn" &&(<><dt className="col-3">Logo stil:</dt>
            <dd className="col-9">{data.serviceStyle}</dd>

            <dt className="col-3">Format dokumenta</dt>
            <dd className="col-4">{data.serviceFormat}</dd></>)}
            {getCategory==="Softver inzinjering" &&(<><dt className="col-3">Programski jezik:</dt>
            <dd className="col-9">{data.serviceStyle}</dd>

            <dt className="col-3">Format dokumenta</dt>
            <dd className="col-9">{data.serviceFormat}</dd></>)}
          </div> 

          <hr />

         
         <Link to= {`/pay/${id}`}> <button className="btn btn-warning shadow-0">NASTAVI</button></Link>
       
         <button style={{marginLeft:"10px"}} onClick={() => handleContact()} className="btn btn-light border border-secondary py-2 icon-hover px-3">KONTAKTIRAJTE NAS</button>

</div>
</main>
</div>

  </div>
</section>
<section className="bg-light border-top py-4">
  <div className="container">
    <div className="row gx-4">
      <div className="col-lg-8 mb-4">
        <div className="border rounded-2 px-3 py-2 bg-white">
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  <li className="nav-item d-flex" role="presentation">
    <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === 'Specification' ? 'active' : ''}`} id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected={activeTab === 'Specification'} onClick={() => handleTabClick('Specification')}>Opis usluge</a>
  </li>
  <li className="nav-item d-flex" role="presentation">
    <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === 'Warranty info' ? 'active' : ''}`} id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected={activeTab === 'Warranty info'} onClick={() => handleTabClick('Warranty info')}>Informacije o garanciji</a>
  </li>
  <li className="nav-item d-flex" role="presentation">
    <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === 'Shipping info' ? 'active' : ''}`} id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab" aria-controls="ex1-pills-3" aria-selected={activeTab === 'Shipping info'} onClick={() => handleTabClick('Shipping info')}>Podaci o dostavi</a>
  </li>
  <li className="nav-item d-flex" role="presentation">
    <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === 'Seller profile' ? 'active' : ''}`} id="ex1-tab-4" data-mdb-toggle="pill" href="#ex1-pills-4" role="tab" aria-controls="ex1-pills-4" aria-selected={activeTab === 'Seller profile'} onClick={() => handleTabClick('Seller profile')}>Račun prodavaoca</a>
  </li>
</ul>
<div className="tab-content" id="ex1-content">
  <div className={`tab-pane fade ${activeTab === 'Specification' ? 'show active' : ''}`} id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                <div dangerouslySetInnerHTML={{ __html: data.desc }} />

  </div>
  <div className={`tab-pane warranty fade ${activeTab === 'Warranty info' ? 'show active' : ''}`} id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
  <ul>  <p>Sve usluge iz kategorije {data.category} koje se nude na ovoj platformi su podložne sljedećim garancijama:</p>
            <li><strong>Kvalitet:</strong> Garantiramo da će svi dizajni biti izrađeni s pažnjom i stručnošću kako bi odgovarali vašim specifikacijama. Ako niste zadovoljni kvalitetom pružene usluge, obvezujemo se da ćemo pružiti ispravak ili refundaciju.</li>
            <li><strong>Pravovremenost:</strong> Trudimo se isporučiti sve usluge u dogovorenom roku. U slučaju kašnjenja izvan dogovorenog roka, obvezujemo se komunicirati s vama i ponuditi alternativne rješenja.</li>
            <li><strong>Zadovoljstvo kupca:</strong> Vaše zadovoljstvo našim uslugama je naš prioritet. Ako niste potpuno zadovoljni pruženom uslugom, molimo vas da nas odmah kontaktirate kako bismo riješili eventualne probleme.</li>
            <li><strong>Ispravci:</strong> Ukoliko primijetite bilo kakve nedostatke ili promjene koje su potrebne nakon isporuke dizajna, molimo vas da nas kontaktirate. Pružit ćemo vam besplatne ispravke kako bi osigurali da vaš dizajn odgovara vašim potrebama.</li>
            <li><strong>Privatnost:</strong> Svi podaci koje nam povjerite u vezi s vašim projektom bit će tretirani s povjerenjem i neće biti dijeljeni s trećim stranama bez vašeg izričitog odobrenja.</li>
        </ul>  </div>
  <div className={`tab-pane fade ${activeTab === 'Shipping info' ? 'show active' : ''}`} id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
  <ul>       <p></p>
            <li><strong>Vrijeme isporuke:</strong> Očekivano vrijeme isporuke za usluge u kategoriji online {data.category} varira ovisno o složenosti projekta i trenutnoj dostupnosti. Prosječno, većina usluga bit će isporučena u roku od {data.deliveryTime} radnih dana od datuma potvrde narudžbe.</li>
            <li><strong>Broj revizija:</strong> U standardnom paketu usluge uključen je određeni broj revizija. Nakon prve isporuke dizajna, imate pravo na {data.revisionNumber} revizija kako biste osigurali da dizajn odgovara vašim očekivanjima. Dodatne revizije mogu biti dostupne uz dodatnu naknadu ili u skladu s paketom usluga.</li>
            <li><strong>Hitne narudžbe:</strong> Za hitne projekte ili potrebe za brzom isporukom, kontaktirajte nas kako bismo pružili mogućnosti ubrzane usluge ili rješenja prema vašim potrebama. Dodatne naknade mogu se primjenjivati za hitne narudžbe izvan standardnih uvjeta isporuke.</li>
        </ul>  </div>
  <div className={`tab-pane fade ${activeTab === 'Seller profile' ? 'show active' : ''}`} id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
{  userisLoading ? ("loading") : usererror ? ("something went wrong") :(          <div className="item">
              <img
                src={dataUser.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{dataUser.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{dataUser.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mobitel:</span>
                  <span className="itemValue">{dataUser.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Država:</span>
                  <span className="itemValue">{dataUser.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pozicija:</span>
                  <span className="itemValue">
                  {dataUser.isSeller ? "Prodavac" : "Kupac"}
                  </span>
                </div>
               
              </div> 
            </div>)}
  </div>
</div>
         
        </div>
      </div>
       <div className="col-lg-4">
        <div className="px-0 border rounded-2 shadow-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Slični servisi</h5>
              {isLoadingCategory ? ("isLoading") : errorCategory ? ("error") : (
  dataCategory.slice(0, 4).map((categoryItem) => (
    <RecommendedService key={categoryItem._id} categoryItem={categoryItem} />
  ))
)}
               

            
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</section>

          <hr />
      
   
   
      </>)}
 
   <Reviews serviceId={id} />
        </div>
  );
  }

export default Service;
