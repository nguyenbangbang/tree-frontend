import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const email = currentUser?.email;

  const formatVND = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(email, {
    skip: !email,
  });

  if (!email) return <div>Vui lòng đăng nhập để xem đơn hàng.</div>;
  if (isLoading) return <div>Đang tải đơn hàng...</div>;
  if (isError) return <div>Lỗi khi lấy dữ liệu đơn hàng.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Đơn hàng của bạn</h2>

      {orders.length === 0 ? (
        <div>Không có đơn hàng nào!</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={order._id} className="border p-4 rounded shadow-sm">
              <p className="text-sm font-medium text-white bg-indigo-600 px-2 py-1 inline-block rounded mb-2">
                # {index + 1}
              </p>
              <h3 className="font-bold text-lg mb-1">
                Mã đơn hàng: {order._id}
              </h3>
              <p>
                <strong>Họ và tên:</strong> {order.name}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order.phone}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {formatVND(order.totalPrice)}
              </p>
              <p>
                <strong>Ngày đặt:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString("vi-VN")}
              </p>

              <h4 className="mt-3 font-semibold">Sản phẩm đã đặt:</h4>
              {Array.isArray(order.products) && order.products.length > 0 ? (
                <ul className="list-disc pl-5">
                  {order.products.map((product, idx) => (
                    <li key={idx}>
                      {product.title} — Số lượng : {product.quantity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Không có sản phẩm nào trong đơn hàng này.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
