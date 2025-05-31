// ProductCard.jsx
import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currency/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import classes from "./Product.module.css";

function ProductCard({ product, flex = false, renderDesc = false }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>

      <div className={classes.card_content}>
        <h3>{title}</h3>

        {renderDesc && (
          <p style={{ maxWidth: "750px", marginBottom: "10px" }}>
            {description}
          </p>
        )}

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0} reviews</small>
        </div>

        <CurrencyFormat amount={price} />

        {/* Hide button when item is shown in cart */}
        {!renderDesc && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

// //
