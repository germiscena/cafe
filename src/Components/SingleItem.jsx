import React from "react";
import "./SingleItem.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const SingleItem = ({ props, setItemInfo, setPop }) => {
  function openPopUp(item) {
    setItemInfo(item);
    setPop();
  }
  const dispatch = useDispatch();
  return (
    <div className='item'>
      <h3 className='item_name' onClick={() => openPopUp(props)}>
        {props.name}
      </h3>
      <h4 className='item_price'>Цена: {props.price}</h4>
      <button onClick={() => dispatch(addToCart(props))} className='item_add'>
        Добавить
      </button>
    </div>
  );
};

export default SingleItem;
