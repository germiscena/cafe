import React from "react";
import "./Order.scss";

const Order = ({ props }) => {
  const { id, ...othProps } = props;
  const order = othProps[0];
  const name = othProps[1];
  const price = othProps[2];

  return (
    <div className='order'>
      <h3>{name}</h3>
      <h3>{price}р</h3>
      <div className='order_list'>
        {order.map((item) => {
          return (
            <div key={item.id} className='order_list_single'>
              <p>{item.name}</p>
              <p>{item.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
