// header.jsx
import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";

const Header = () => {
  const [{ basket }] = useContext(DataContext);

  // Corrected reduce syntax and fixed totalItem variable name
  const totalItem = basket?.reduce((amount, item) => {
    return amount + (item.amount || 1);
  }, 0);

  return (
    <>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select>
              <option value="all">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>

          <div className={classes.order_container}>
            <Link to="#" className={classes.language}>
              <img
                src="https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg"
                alt="US Flag"
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>

            <Link to="/auth">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              {/* Fixed display syntax */}
              <span>{totalItem} items</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={classes.fixed}>
        <LowerHeader />
      </section>
    </>
  );
};

export default Header;
