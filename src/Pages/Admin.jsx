import React from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";
import Order from "../Components/Order";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/slices/adminSlice";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const { items, status } = useSelector((state) => state.adminSlice);
  const { id, ...itemsWithoutId } = items;
  const normalItems = items.map((obj) => obj[0]);
  let arrOfOrders = [];
  for (let i = 0; i < normalItems.length; i++) {
    for (let j = 0; j < normalItems[i].length; j++) {
      arrOfOrders.push(normalItems[i][j]);
    }
  }
  const orderDishes = {};
  arrOfOrders.forEach((obj) => {
    const { count, name } = obj;
    if (orderDishes[name]) {
      orderDishes[name] += count;
    } else {
      orderDishes[name] = count;
    }
  });
  const totalItems = Object.entries(orderDishes);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    dispatch(fetchOrders());
    if (items) {
      setLoading(false);
    }
  }, []);
  React.useEffect(() => {
    if (localStorage.hasOwnProperty("Пользователь") == false) {
      navigate("/");
    } else if (localStorage.getItem("Пользователь") != "Пашок228") {
      navigate("/main");
    }
  });
  return (
    <div>
      <Header />
      {!loading ? (
        <div className='adminBlock'>
          {items.map((obj) => {
            return <Order key={obj.id} props={obj} />;
          })}
          <div className='adminBlock_total'>
            <h3>Итого</h3>
            {/* <h3>{totalPrice}</h3> */}
            <div className='adminBlock_total_items'>
              {totalItems.map((item) => {
                return (
                  <div key={item[0]} className='adminBlock_total_items_single'>
                    <p>{item[0]}</p>
                    <p>{item[1]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='loading'>Загрузка...</div>
      )}
    </div>
  );
};

export default Admin;
