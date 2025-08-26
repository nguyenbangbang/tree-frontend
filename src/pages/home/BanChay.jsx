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


const removeVietnameseTones = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};
const categories = ["Chọn loại", "Trong nhà", "Mọng nước", "Có hoa", "Bonsai"]
const BanChay = () => {
   
    const [selectedCategory, setSelectedCategory] = useState("Chọn loại");

    const  {data: trees =[]}=useFetchAllTreesQuery();
    

        const filteredTrees  = selectedCategory === "" ? trees : trees.filter(tree =>removeVietnameseTones(tree.category) === removeVietnameseTones(selectedCategory)
    );

    
  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'>Bán chạy nhất</h2>
        {/*  Danh sách loại cây */}
         <div className='mb-8 flex items-center'>
                <select
                   onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>
            
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
               filteredTrees.length > 0 && filteredTrees.map((tree, index) => (
                <SwiperSlide key={index}>
                    <TreeCard tree={tree} />
                </SwiperSlide>))        
                }
            </Swiper>
    </div>
  )
}

export default BanChay