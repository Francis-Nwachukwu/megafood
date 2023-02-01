import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { BiMinus, BiPlus } from "react-icons/bi";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
let items = [];

const CartItem = ({ cartItem, setFlag, flag }) => {
  const [qty, setQty] = useState(cartItem.qty);

  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((cartItem) => {
          if (cartItem.id === id) {
            cartItem.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={cartItem.imageUrl}
        alt="Cart item"
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />

      {/* Cart Item name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{cartItem?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          ${cartItem?.price * qty}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", cartItem?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", cartItem?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
