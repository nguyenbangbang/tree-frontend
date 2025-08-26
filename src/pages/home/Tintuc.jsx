import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import { Link } from 'react-router-dom';

import news1 from "../../assets/news/news-1.png";
import news2 from "../../assets/news/news-2.png";
import news3 from "../../assets/news/news-3.png";
import news4 from "../../assets/news/news-4.png";
import news5 from "../../assets/news/news-5.png";

const news = [
  {
    id: 1,
    title: "Những loại cây chịu nắng tốt, dễ trồng ở ban công chung cư",
    description: "Chọn đúng loại cây chịu nhiệt tốt cho ban công vừa giúp giảm nhiệt lại vừa tăng tính thẩm mỹ cho không gian sống.",
    image: news1,
    url: "https://vnexpress.net/nhung-loai-cay-chiu-nang-tot-de-trong-o-ban-cong-chung-cu-4918000.html",

  },
  {
    id: 2,
    title: "Bán 60 gốc mai vàng 'có sẵn ngoài vườn' thu về 3 tỷ đồng",
    description: "Cha mẹ tôi quyết định phá một khu vườn cây ăn trái, trồng hơn trăm gốc mai vàng từ những cây có sẵn trong vườn.",
    image: news2,
    url: "https://vnexpress.net/ban-60-goc-mai-vang-co-san-ngoai-vuon-thu-ve-3-ty-dong-4844920.html"
  },
  {
    id: 3,
    title: "4 cây cảnh thanh lọc không khí, hút tài lộc năm mới",
    description: "Cây hoa mai, hoa cúc, phát tài và quất không chỉ giúp không gian ngôi nhà rực rỡ, thu hút tài lộc mà còn thanh lọc, loại bỏ những độc tố trong không khí.",
    image: news3,
    url: "https://vnexpress.net/4-cay-canh-thanh-loc-khong-khi-hut-tai-loc-nam-moi-4839737.html"
  },
  {
    id: 4,
    title: "Xu hướng làm vườn treo trong nhà phố",
    description: "Vườn treo với lối thiết kế phủ kín mảng tường bằng hệ cây cảnh đang được nhiều người ưa chuộng vì đáp ứng về một không gian xanh mát nhưng ít tốn diện tích nhà phố.",
    image: news4,
    url: "https://vnexpress.net/xu-huong-lam-vuon-treo-trong-nha-pho-4787624.html"
  },
  {
    id: 5,
    title: "6 loại cây giúp bạn ngủ ngon hơn mỗi đêm",
    description: "Các loại cây như lưỡi hổ, nha đam và hoa oải hương không chỉ làm đẹp phòng ngủ mà còn giúp thanh lọc không khí và tạo cảm giác thư giãn, hỗ trợ giấc ngủ sâu hơn.",
    image: news5,
    url: "https://vnexpress.net/loai-cay-dat-phong-ngu-giup-ngon-giac-4576055.html"
  }
];

const Tintuc = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Tin tức 🌿</h2>

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
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
         <SwiperSlide key={index}>
  <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
    
    {/* Ảnh bên trái */}
    <div className="w-full sm:w-40 h-28 flex-shrink-0 overflow-hidden rounded-md">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
    </div>

    {/* Nội dung bên phải */}
    <div className="flex flex-col justify-between flex-grow">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-base font-semibold text-gray-800 hover:text-green-600 mb-2">
          {item.title}
        </h3>
      </a>
      <div className="w-10 h-[3px] bg-green-500 mb-3"></div>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  </div>
</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Tintuc;  