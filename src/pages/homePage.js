import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import { useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    if (file) {
      console.log("Uploaded file:", file.name);
      setLoading(true);
      
      // FormData 생성
      const formData = new FormData();
      formData.append("file", file);

      try {
        // 백엔드 API 호출
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setTranscription(data.transcription); // 변환된 텍스트 표시
        } else {
          console.error("오류 발생:", response.statusText);
          alert("변환 실패");
        }
      } catch (error) {
        console.error("에러 발생:", error);
        alert("파일 업로드 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault(); // 기본 동작 방지
    event.stopPropagation(); // 이벤트 전파 방지
    const files = event.dataTransfer?.files; // 안전하게 dataTransfer 접근
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        handleFileUpload(file);
      } else {
        alert('오디오 파일만 업로드할 수 있습니다.');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // 기본 동작 방지
    event.stopPropagation(); // 이벤트 전파 방지
  };

  return (
    <div>
      {/* Header Section */}
      <header className="App-header">
        <div className="logo">my project</div>
        <nav className="nav-menu">
          <Link to="/get-started">사용 가이드</Link>
          <a href="#github">요금제</a>
          <a href="#designers">자주 묻는 질문</a>
          <a href="#documentation" className="highlighted">로그인</a>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="App-main">
        <section className="hero">
          <h1>음성을 텍스트로</h1>
          <p>모든 음성 파일을 텍스트로 변환하세요.</p>
          <div className="hero-buttons">
            <label htmlFor="file-upload" className="btn-primary">
              Upload Audio File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".mp3, audio/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </div>
        </section>

        {/* Cards Section */}
        <section className="cards">
          <div
            className="card"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: '2px dashed #ccc',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9',
            }}
          >
            <img src="/img/img_download.png" alt="Avatar" className="card-img" />
            <h3>MP3 TO TEXT</h3>
            <p>여기로 파일을 끌어다 놓으세요.</p>
            <label htmlFor="card-file-upload" className="btn-follow">
              업로드
            </label>
            <input
              id="card-file-upload"
              type="file"
              accept=".mp3, audio/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
