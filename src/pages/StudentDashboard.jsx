import { useState } from "react";
import "../App.css"; // импорт стилей (если нужно)

function StudentDashboard() {
  const storedStudent = localStorage.getItem("student");
  const student = storedStudent ? JSON.parse(storedStudent) : { name: '', surname: '' };
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (!file) {
      alert("Пожалуйста, выберите файл для отправки");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", student.name);
    formData.append("surname", student.surname);

    fetch("http://localhost:5000/submissions", {
      method: "POST",
      body: formData,
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка при отправке');
        return res.json();
      })
      .then(() => {
        alert("Отправлено");
        setFile(null);  // очистить выбранный файл после отправки
      })
      .catch(err => {
        alert("Ошибка: " + err.message);
      });
  };

  return (
    <div className="student-container">
      <div className="student-dashboard">
        <h2>Кабинет студента</h2>
        <p className="student-greeting">
          Привет, {student.name || 'Гость'} {student.surname || ''}
        </p>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="file-input"
        />
        <button onClick={handleSend} className="send-button">
          Отправить диплом/олимпиаду
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;