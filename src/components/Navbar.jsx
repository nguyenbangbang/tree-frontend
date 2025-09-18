import { Link, useNavigate } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { getImgUrl } from "../utils/getImgUrl";

// Menu điều hướng cho dropdown

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { currentUser, logout } = useAuth();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const getNavigation = () => {
    return [
      { name: "Dashboard", href: "/user-dashboard" },
      { name: "Hóa đơn", href: "/orders" },
      { name: "Giỏ hàng", href: "/cart" },
      {
        name: "Thanh toán",
        href: totalQuantity > 0 ? "/checkout" : "#",
        disabled: totalQuantity === 0,
      },
    ];
  };

  // Fetch dữ liệu cây từ file tĩnh hoặc API
  useEffect(() => {
    fetch("http://localhost:5000/api/trees")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể lấy dữ liệu cây");
        return res.json();
      })
      .then((data) => setTreeData(data))
      .catch((err) => console.error("Lỗi khi fetch cây:", err));
  }, []);

  // Xử lý tìm kiếm
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = treeData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  // Xử lý đăng xuất
  const handleLogOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>

          {/* Search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute left-3 top-2 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm cây cảnh..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 bg-white w-full mt-1 rounded-md shadow-md max-h-60 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setSearchTerm("");
                      setSuggestions([]);
                      navigate(`/trees/${item._id}`);
                    }}
                  >
                    <img
                      src={getImgUrl(item.coverImage)}
                      alt={item.title}
                      className="w-6 h-6 object-cover rounded"
                    />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {getNavigation().map((item) => (
                        <li key={item.name}>
                          {item.disabled ? (
                            <span className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed">
                              {item.name}
                            </span>
                          ) : (
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 border-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart />
            <span className="text-sm font-semibold sm:ml-1">
              {totalQuantity}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
