import React from "react";
import Header from "../Components/Header";
import "./Main.scss";
import SingleItem from "../Components/SingleItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFood } from "../redux/slices/foodSlice";
import { addToCart, clearCart } from "../redux/slices/cartSlice";
import axios from "axios";
const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (localStorage.hasOwnProperty("Пользователь") == false) {
      navigate("/");
    }
  });
  const [loading, setLoading] = React.useState(true);
  const { items, status } = useSelector((state) => state.foodSlice);
  const [popUp, setPopUp] = React.useState(false); // открыть информацию о блюде
  const [order, setOrder] = React.useState(false); // открыть информацию о заказе
  const [itemInfo, setItemInfo] = React.useState({}); // информация о блюде в поп-апе
  const makeOrder = useSelector((state) => state.cartSlice.items);
  function postFood(items) {
    axios.post("https://64b50065f3dbab5a95c6792e.mockapi.io/orders", items);
    setOrder(false);
    dispatch(clearCart());
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
        <div className={popUp || order ? "main blur" : "main"}>
          {items.map((item) => {
            return (
              <SingleItem
                key={item.id}
                props={item}
                setItemInfo={(obj) => setItemInfo(obj)}
                setPop={() => setPopUp(true)}
              />
            );
          })}
          <div className={makeOrder.length !== 0 ? "main_order" : "main_order blur"}>
            <h3 onClick={() => setOrder(true)}>Сделать заказ</h3>
          </div>
        </div>
      ) : (
        <div className='loading'>Загрузка...</div>
      )}
      {popUp && (
        <div className='popUp'>
          <button onClick={() => setPopUp(false)} className='popUp_close'>
            X
          </button>
          <div className='popUp_main'>
            <div className='popUp_main_information'>
              <h3>{itemInfo.name}</h3>
              <h4>{itemInfo.info}</h4>
              <h4>Цена: {itemInfo.price}</h4>
            </div>
          </div>
        </div>
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
                </div>
              );
            })}
          </div>
          <h3
            onClick={() => postFood([makeOrder, localStorage.getItem("Пользователь")])}
            className='myOrder_button'>
            Заказать
          </h3>
        </div>
      )}
    </div>
  );
};

export default Main;
