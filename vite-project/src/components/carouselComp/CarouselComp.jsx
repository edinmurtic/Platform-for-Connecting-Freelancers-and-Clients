import React, { useEffect } from 'react';
import './CarouselComp.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
function CarouselComp({images}) {

  return (
    <Swiper
     modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >

{images.map((image)=> (
  <SwiperSlide key={image}><img src={image} /></SwiperSlide>

))}
   
  </Swiper>
  );
}

export default CarouselComp;
