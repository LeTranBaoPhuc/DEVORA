import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
