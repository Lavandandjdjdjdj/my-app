import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError(""); // Сбрасываем ошибку перед новой проверкой
    
    if (role === "admin") {
      if (password === "admin1") { 
        navigate("/admin");
      } else {
        setError("Неверный пароль");
      }
    } else {
      // Проверка на пустые поля имени и фамилии
      if (!name.trim() || !surname.trim()) {
        setError("Пожалуйста, введите имя и фамилию");
        return;
      }
      
      localStorage.setItem("student", JSON.stringify({ name, surname }));
      navigate("/student");
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2>СПБГАСУ</h2>
        <label>
          Войти как:
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError(""); // Сбрасываем ошибку при смене роли
            }}
            className="login-select"
          >
            <option value="student">Студент</option>
            <option value="admin">Админ</option>
          </select>
        </label>

        {role === "student" ? (
          <>
            <input
              type="text"
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
                setError(""); // Сбрасываем ошибку при вводе
              }}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(""); // Сбрасываем ошибку при вводе
              }}
              className="login-input"
            />
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Сбрасываем ошибку при вводе
              }}
              className="login-input"
            />
          </>
        )}

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleLogin} className="login-button">
          Вход
        </button>
      </div>
    </div>
  );
}

export default Login;