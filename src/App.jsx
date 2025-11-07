import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import Catalog from "./pages/Catalog/Catalog";
import Register from "./pages/Register/Register";
import EditFilm from "./pages/Edit/EditFilm";
import FilmDetails from "./pages/Details/FilmDetails";
import { Film, PlusCircle, Home } from "lucide-react";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <Film size={26} />
            <span>CineBase</span>
          </Link>
          <nav className="nav-links">
            <Link to="/" className="nav-item">
              <Home size={18} />
              <span>Catálogo</span>
            </Link>
            <Link to="/cadastrar" className="nav-item highlight">
              <PlusCircle size={18} />
              <span>Novo Filme</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/cadastrar" element={<Register />} />
          <Route path="/editar/:id" element={<EditFilm />} />
          <Route path="/filme/:id" element={<FilmDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
