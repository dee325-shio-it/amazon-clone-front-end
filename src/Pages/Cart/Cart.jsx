// Cart.jsx
import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import CurrencyFormat from "../../Components/Currency/CurrencyFormat";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const total = basket.reduce(
    (amount, item) => amount + item.price * (item.amount || 1),
    0
  );

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <h2>Hello</h2>
        <h3>Your Shopping Basket</h3>
        <hr />

        <div className={classes.content}>
          {/* LEFT SIDE: Cart Items */}
          <div className={classes.cart_container}>
            {basket.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              basket.map((item, i) => (
                <section key={i} className={classes.cart_product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <FaArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <FaArrowDown size={20} />
                    </button>
                  </div>
                </section>
              ))
            )}
          </div>

          {/* RIGHT SIDE: Subtotal */}
          {basket.length > 0 && (
            <div className={classes.subtotal}>
              <h3>
                Subtotal (
                {basket.reduce((acc, item) => acc + (item.amount || 1), 0)}{" "}
                items): <strong>${total.toFixed(2)}</strong>
              </h3>
              {/* <button className={classes.checkoutBtn}>
                Proceed to Checkout
              </button> */}
              <button
                className={classes.checkoutBtn}
                onClick={() => navigate("/payments")}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;
