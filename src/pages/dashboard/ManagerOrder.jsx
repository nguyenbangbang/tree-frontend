import React from "react";
import { useGetAllOrdersQuery } from "../../redux/features/orders/ordersApi";
const ManageOrders = () => {
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();

  if (isLoading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Đã xảy ra lỗi khi tải đơn hàng </p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📦 Danh sách đơn hàng</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Mã đơn</th>
            <th className="p-2 border">Khách hàng</th>
            <th className="p-2 border">Sản phẩm</th>
            <th className="p-2 border">Số lượng</th>
            <th className="p-2 border">Tổng tiền</th>
            <th className="p-2 border">Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="p-2 border">{order._id}</td>
              <td className="p-2 border">{order.name}</td>
              <td className="p-2 border">{order.products[0]?.title || "—"}</td>
              <td className="p-2 border">{order.products[0]?.quantity || 0}</td>
              <td className="p-2 border">
                {order.products[0]?.totalPrice?.toLocaleString() || "0"}₫
              </td>
              <td className="p-2 border">
                {new Date(order.products[0]?.createdAt).toLocaleDateString(
                  "vi-VN"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
