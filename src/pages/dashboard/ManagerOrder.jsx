import React from "react";
import { useGetAllOrdersQuery } from "../../redux/features/orders/ordersApi";

const ManageOrders = () => {
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();

  if (isLoading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Đã xảy ra lỗi khi tải đơn hàng</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📦 Danh sách đơn hàng</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Mã đơn</th>
            <th className="p-2 border">Khách hàng</th>
            <th className="p-2 border">Địa chỉ</th>
            <th className="p-2 border">Số điện thoại</th>
            <th className="p-2 border">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const total = order.totalPrice || 0;
            const address = order.address
              ? `${order.address.city}, ${order.address.state}, ${order.address.country} (${order.address.zipcode})`
              : "—";
            const phone = order.phone ? `0${order.phone.toString()}` : "—";

            return (
              <tr key={order._id}>
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">{order.name}</td>
                <td className="p-2 border">{address}</td>
                <td className="p-2 border">{phone}</td>
                <td className="p-2 border">{total.toLocaleString("vi-VN")}₫</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
