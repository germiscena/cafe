import React from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const nameRef = React.useRef();
  const roomRef = React.useRef();
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState(0);

  React.useEffect(() => {
    if (localStorage.hasOwnProperty("Пользователь") == true) {
      navigate("main");
    }
  });
  function acceptParams() {
    localStorage.setItem("Пользователь", `${name}${room}`);
    navigate("/main");
  }
  function onChangeInput() {
    setName(nameRef.current.value);
    setRoom(roomRef.current.value);
  }
  return (
    <div className='register'>
      <div className='register_block'>
        <label className='register_block_label'>Ваше имя</label>
        <input
          ref={nameRef}
          className='register_block_input'
          type='text'
          id='name'
          name='name'
          required
          onChange={() => onChangeInput()}
        />
        <label className='register_block_label'>Ваш номер</label>
        <input
          ref={roomRef}
          className='register_block_input'
          type='number'
          id='room'
          name='room'
          required
          onChange={() => onChangeInput()}
        />
        <button
          onClick={() => acceptParams()}
          className={
            name != "" && room != 0 ? "register_block_accept" : "register_block_accept hidden"
          }>
          Подтвердить
        </button>
      </div>
    </div>
  );
};
export default Register;
