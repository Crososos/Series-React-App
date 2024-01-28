import React, { useEffect, useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const someCondition = true;

  useEffect(() => {
    
    if (someCondition) {
      setModalOpen(true);
    }
  }, [someCondition]);

  const handleLogin = () => {
    if (username === "crososos" && password === "c123456") {
      console.log("Giriş başarılı!");
      setModalOpen(false);
      onClose(); 
    } else {
      console.log("Giriş başarısız!");
    }
  };
  

  return (
    <div className={`login-container ${modalOpen ? "open" : ""}`}>
      <div className="login">
        <span className="login-close" onClick={handleLogin}>
          &times;
        </span>
        <h2>Giriş Yap</h2>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className="input-kullanici"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
       <br />
        <input
          type="password"
          className="input-sifre"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="button-giris" onClick={handleLogin}>Giriş Yap</button>
      </div>
    </div>
  );
};

export default LoginModal;
