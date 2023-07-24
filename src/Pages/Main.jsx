import React from "react";
import Header from "../Components/Header";
import "./Main.scss";
import SingleItem from "../Components/SingleItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFood } from "../redux/slices/foodSlice";
import { addToCart, clearCart, deleteFromCart } from "../redux/slices/cartSlice";
import axios from "axios";
const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.foodSlice);
  const price = useSelector((state) => state.cartSlice.price.toFixed(2));
  const makeOrder = useSelector((state) => state.cartSlice.items);
  const [order, setOrder] = React.useState(false);
  const [popUp, setpopUp] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  function postFood(items) {
    axios.post("https://64b50065f3dbab5a95c6792e.mockapi.io/orders", items);
    setOrder(false);
    dispatch(clearCart());
  }
  React.useEffect(() => {
    if (localStorage.hasOwnProperty("Пользователь") == false) {
      navigate("/");
    }
  });
  function popUpTimeout() {
    setpopUp(true);
    setTimeout(() => {
      setpopUp(false);
    }, 3000);
  }
  React.useEffect(() => {
    dispatch(fetchFood());
    window.scrollTo(0, 0);
    if (items) {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      <Header />
      {!loading ? (
        <div className={order || popUp ? "main blur" : "main"}>
          {items.map((item) => {
            return <SingleItem key={item.id} props={item} />;
          })}
          <div className={makeOrder.length !== 0 ? "main_order" : "main_order blur"}>
            <h3 onClick={() => setOrder(true)}>Сделать заказ</h3>
          </div>
        </div>
      ) : (
        <div className='loading'>Загрузка...</div>
      )}
      {order && (
        <div className='myOrder'>
          <button onClick={() => setOrder(false)} className='popUp_close'>
            X
          </button>
          <div className='myOrder_header'>
            <p>Блюдо</p>
            <p>Цена</p>
            <p>Кол-во</p>
          </div>
          <div className='myOrder_main'>
            {makeOrder.map((item) => {
              return (
                <div key={item.id} className='myOrder_main_orderInfo'>
                  <p className='myOrder_main_orderInfo_paragraph'>{item.name}</p>
                  <p className='myOrder_main_orderInfo_paragraph'>{item.price}</p>
                  <p className='myOrder_main_orderInfo_paragraph'>{item.count}</p>
                  <p
                    onClick={() => dispatch(addToCart(item))}
                    className='myOrder_main_orderInfo_add'>
                    +
                  </p>
                  <p
                    onClick={() => dispatch(deleteFromCart(item))}
                    className='myOrder_main_orderInfo_add'>
                    -
                  </p>
                </div>
              );
            })}
            <p>Итого: {price}</p>
          </div>
          <h3
            onClick={() => {
              postFood([makeOrder, localStorage.getItem("Пользователь"), price]);
              popUpTimeout();
            }}
            className={makeOrder != false ? "myOrder_button" : "myOrder_button blur"}>
            Заказать
          </h3>
        </div>
      )}
      {popUp && <div className='popUp'>Ваш заказ доставлен. Спасибо!</div>}
    </div>
  );
};

export default Main;
