import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'

import { useDispatch } from'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'



const TreeCard = ({ tree }) => {
  const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    // Hàm format tiền VND
    const formatVND = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[200px] flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
        
        {/* Ảnh cây */}
        <Link to={`/trees/${tree._id}`} className="sm:w-40 sm:h-40 flex-shrink-0">
          <img
            src={getImgUrl(tree?.coverImage)}
            alt={tree?.title}
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Nội dung cây */}
        <div className="flex flex-col justify-between flex-grow">
          <Link to={`/trees/${tree._id}`}>
            <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 mb-2">
              {tree?.title}
            </h3>
          </Link>

          <p className="text-gray-600 text-sm mb-3">
            {tree?.description.length > 80
              ? `${tree.description.slice(0, 80)}...`
              : tree?.description}
          </p>

          <p className="text-green-700 font-bold mb-3">
              {formatVND(tree?.newPrice)}            
            <span className="text-gray-500 line-through font-normal ml-2">
               {formatVND(tree?.oldPrice)}
            </span>
          </p>

           <button
            onClick={() => handleAddToCart(tree)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded-md flex items-center gap-1 w-fit transition-colors duration-200"
            >
                <FiShoppingCart className="text-sm" />
                <span>Thêm vào giỏ hàng</span>
            </button>
        </div>
      </div>
    </div>
  )
}

export default TreeCard