import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";  // импорт стилей

function Login() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      localStorage.setItem("student", JSON.stringify({ name, surname }));
      navigate("/student");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Вход</h2>
        <label>
          Роль:
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="login-select"
          >
            <option value="student">Студент</option>
            <option value="admin">Админ</option>
          </select>
        </label>

        {role === "student" && (
          <>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={e => setName(e.target.value)}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Фамилия"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              className="login-input"
            />
          </>
        )}

        <button onClick={handleLogin} className="login-button">
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;