import React from "react";
import "./SingleItem.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const SingleItem = ({ props }) => {
  const dispatch = useDispatch();
  return (
    <div className='item'>
      <div className='item_mainInfo'>
        <h3 className='item_mainInfo_name'>{props.name}</h3>
        <h4 className='item_mainInfo_price'>Цена: {props.price}</h4>
      </div>
      <h4 className='item_info'>{props.info}</h4>
      <button onClick={() => dispatch(addToCart(props))} className='item_add'>
        Добавить
      </button>
    </div>
  );
};

export default SingleItem;
