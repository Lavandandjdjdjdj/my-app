import { useEffect, useState } from "react";
import "../App.css"; // подключаем стили

function Admin() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/submissions")
      .then(res => {
        if (!res.ok) throw new Error("Ошибка загрузки данных");
        return res.json();
      })
      .then(data => setSubmissions(data))
      .catch(err => {
        alert(err.message);
      });
  }, []);

  const handleDelete = (fileUrl) => {
    const filename = fileUrl.split('/').pop();

    fetch(`http://localhost:8000/submissions/${filename}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
        setSubmissions(submissions.filter(item => item.fileUrl !== fileUrl));
        alert('Файл удалён');
      } else {
        alert('Ошибка при удалении');
      }
    }).catch(() => alert('Ошибка при удалении'));
  };

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <h2>Кабинет администратора</h2>
        {submissions.length === 0 ? (
          <p>Пока нет отправленных файлов</p>
        ) : (
          <ul className="submission-list">
            {submissions.map((item, index) => (
              <li key={index} className="submission-item">
                <p className="submission-user">{item.name}{item.surname} </p>
                <a
                  href={`http://localhost:8000${item.fileUrl}`}
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

export default Admin;