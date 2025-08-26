import React from 'react';
import bannerImg from "../../assets/Banner.png";

const Banner = () => {
  return (
    <div
      className="py-24 px-6 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="bg-black/30 p-10 rounded-lg max-w-3xl mx-auto text-center">
        <h1 className="md:text-5xl text-3xl font-extrabold mb-6">
          Thêm cây mới - Thêm không gian xanh
        </h1>
        <p className="mb-8 text-lg leading-relaxed">
          Khám phá những loại cây cảnh mới nhất để tô điểm không gian sống của bạn —
          từ các loại xương rồng dễ chăm sóc đến cây nhiệt đới xanh mướt.
          Bộ sưu tập tuần này có đủ lựa chọn cho mọi tín đồ yêu cây.
        </p>
        
      </div>
    </div>
  );
};

export default Banner;