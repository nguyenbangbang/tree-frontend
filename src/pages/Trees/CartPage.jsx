import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import {
  clearCart,
  removeFromCart,
  addToCart,
} from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Tính tổng tiền (số, chưa format)
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.newPrice * item.quantity,
    0
  );

  // Hàm format tiền VND
  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">Giỏ hàng</div>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              onClick={handleClearCart}
              className="py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
            >
              <span>Xóa giỏ hàng</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product?._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product?.title}
                        src={getImgUrl(product?.coverImage)}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to="/">{product?.title}</Link>
                          </h3>
                          <p className="sm:ml-4">
                            {formatVND(product?.newPrice)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Mặt hàng: </strong>
                          {product?.category}
                        </p>
                      </div>

                      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => dispatch(removeFromCart(product))}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            –
                          </button>

                          <span className="px-2">{product?.quantity}</span>

                          <button
                            onClick={() => dispatch(addToCart(product))}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có sản phẩm nào</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Tổng</p>
          <p>{formatVND(totalPrice)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Phí vận chuyển và thuế được tính khi thanh toán.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Thanh toán
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Tiếp tục mua hàng
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
