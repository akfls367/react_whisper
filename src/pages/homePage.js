import { useNavigate } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/get-started');
  };

  return (
    <div>
      {/* Header Section */}
      <header className="App-header">
        <div className="logo">고병수 my project</div>
        <nav className="nav-menu">
          <a href="#features">사용 가이드</a>
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
            <button className="btn-primary" onClick={handleGetStartedClick}>
              Get Started Now
            </button>
            <button className="btn-secondary">Watch Video</button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="cards">
          <div className="card">
            <img src="https://via.placeholder.com/100" alt="Avatar" />
            <h3>Meagan Fisher</h3>
            <p>Engineering Manager</p>
            <button className="btn-follow">Follow</button>
            <button className="btn-message">Message</button>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Scenery" />
            <h3>Meagan Fisher</h3>
          </div>
          <div className="card">
            <h3>Login into your account</h3>
            <p>Don't have an account yet? <a href="#create">Create New</a></p>
            <input type="email" placeholder="johndoe@gmail.com" />
            <input type="password" placeholder="Password" />
            <button className="btn-login">Login</button>
          </div>
        </section>
        
      </main>
    </div>
  );
}

export default HomePage;
