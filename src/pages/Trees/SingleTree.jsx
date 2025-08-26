import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useFetchTreeByIdQuery } from '../../redux/features/trees/treesApi'

const SingleTree = () => {
  const { id } = useParams()
  const { data: tree, isLoading, isError } = useFetchTreeByIdQuery(id)

  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Đã xảy ra lỗi khi tải thông tin cây</div>

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{tree.title}</h1>

      <div>
        <div>
          <img
            src={getImgUrl(tree.coverImage)}
            alt={tree.title}
            className="mb-8"
          />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Loại:</strong> {tree?.category}
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Giá:</strong>{' '}
            <span className="text-red-600 font-bold text-lg">
              {tree.newPrice.toLocaleString('vi-VN')}₫
            </span>{' '}
            {tree.oldPrice && tree.oldPrice > tree.newPrice && (
              <span className="line-through text-gray-500 ml-2">
                {tree.oldPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </p>

          <p className="text-gray-700">
            <strong>Mô tả:</strong> {tree.description}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(tree)}
          className="btn-primary px-6 space-x-1 flex items-center gap-1"
        >
          <FiShoppingCart />
          <span>Thêm vào giỏ hàng</span>
        </button>
      </div>
    </div>
  )
}

export default SingleTree