// LowerHeader.jsx
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

function LowerHeader() {
  return (
    <div className="lower_container">
      <ul style={{ listStyle: "none", display: "flex", gap: "10px", margin: 0, padding: 0 }}>
        <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <AiOutlineMenu />
          <span>All</span>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
