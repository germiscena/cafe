import React from "react";
import "./Header.scss";
import Menu from "../menu.svg";
import Back from "../back.svg";
import { useNavigate } from "react-router-dom";
import Logout from "../logout.svg";
const Header = () => {
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("Пользователь");
    navigate("/");
  }
  return (
    <div className='header'>
      <img onClick={() => logOut()} className='header_img' src={Logout} alt='logout' />
      <h1 className='header_name'>Кофейня</h1>
      {localStorage.getItem("Пользователь") == "Пашок228" && (
        <img
          onClick={() => navigate(window.location.pathname == "/admin" ? "/main" : "/admin")}
          className='header_img'
          src={window.location.pathname == "/admin" ? Back : Menu}
          alt='admin'
        />
      )}
    </div>
  );
};

export default Header;
