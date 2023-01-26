import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = async () => {
    setIsMenu((prevState) => !prevState);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen bg-primary p-3 px-4 md:p-6 md:px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex justify-between w-full h-full">
        <Link
          to={"/"}
          className="flex items-center gap-2"
          onClick={() => setIsMenu(false)}
        >
          <img className="w-[32px] object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">MegaFood</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute -top-[2px] -right-[2px] w-[16px] h-[16px] rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-[10px] min-w-[40px] h-[10px] min-h-[40px] rounded-full drop-shadow-xl cursor-pointer"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0"
              >
                {user && user.email === "francisnwachukwu100@gmail.com" && (
                  <Link to="/createItem" onClick={() => setIsMenu(false)}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-red-500 text-base"
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-[32px] object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">MegaFood</p>
        </Link>

        <div className="relative flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="absolute -top-[2px] -right-[2px] w-[16px] h-[16px] rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-[10px] min-w-[40px] h-[10px] min-h-[40px] rounded-full drop-shadow-xl cursor-pointer"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl flex flex-col rounded-lg absolute top-12 right-0"
            >
              {user && user.email === "francisnwachukwu100@gmail.com" && (
                <Link to="/createItem">
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item
                    <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col gap-2">
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2">
                  Home
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2">
                  Menu
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2">
                  About Us
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out px-4 py-2">
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out text-red-500 text-base"
                onClick={logout}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
