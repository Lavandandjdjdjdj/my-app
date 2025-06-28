import { useEffect, useState } from "react";
import "../App.css";

function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin1") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Неверный пароль");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetch("http://localhost:5000/submissions")
      .then(res => {
        if (!res.ok) throw new Error("Ошибка загрузки данных");
        return res.json();
      })
      .then(data => setSubmissions(data))
      .catch(err => {
        alert(err.message);
      });
  }, [isAuthenticated]);

  const handleDelete = (fileUrl) => {
    const filename = fileUrl.split('/').pop();

    fetch(`http://localhost:5000/submissions/${filename}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        setSubmissions(submissions.filter(item => item.fileUrl !== fileUrl));
        alert('Файл удалён');
      } else {
        alert('Ошибка при удалении');
      }
    }).catch(() => alert('Ошибка при удаления'));
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Вход для администратора</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className="password-input"
          />
          <button type="submit" className="login-button">
            Войти
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <h2>Кабинет администратора</h2>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="logout-button"
        >
          Выйти
        </button>
        {submissions.length === 0 ? (
          <p>Пока нет отправленных файлов</p>
        ) : (
          <ul className="submission-list">
            {submissions.map((item, index) => (
              <li key={index} className="submission-item">
                <p className="submission-user">{item.name} {item.surname}</p>
                <a
                  href={`http://localhost:5000${item.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="download-link"
                >
                  Скачать: {item.originalName}
                </a>
                <button 
                  onClick={() => handleDelete(item.fileUrl)} 
                  className="delete-button"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;