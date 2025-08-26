import React, { useEffect, useState } from 'react'
import TreeCard from '../Trees/TreeCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllTreesQuery } from '../../redux/features/trees/treesApi';


const Recommended = () => {
       const  {data: trees =[]}=useFetchAllTreesQuery();
   
  return (
    <div>
        <h2 className='text-3xl font-semibold mb-6'>Recommended for you </h2>


        <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

               {
               trees.length > 0 && trees.slice(1,9).map((tree, index) => (
                <SwiperSlide key={index}>
                    <TreeCard tree={tree} />
                </SwiperSlide>))        
                }
            </Swiper>
    </div>
  )
}

export default Recommended