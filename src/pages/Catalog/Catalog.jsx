import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styled from "styled-components";
import { Trash, Pencil } from "lucide-react";

const Container = styled.div`
  padding: 2rem;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const FilmList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const FilmCard = styled.div`
  background: #1e1e1e;
  border-radius: 10px;
  width: 280px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #03e9f4;
  text-align: center;
`;

const FilmTitle = styled.h2`
  font-size: 18px;
  margin-top: 10px;
  color: #ffffff;
  text-align: center;
`;

const Description = styled.p`
  font-size: 14px;
  color: #cfcfcf;
  margin-top: 10px;
  text-align: justify;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const StyledIcon = styled.div`
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s ease, transform 0.2s;

  &:hover {
    color: ${(props) => props.hoverColor || "#03e9f4"};
    transform: scale(1.2);
  }
`;

export default function Catalog() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      const response = await api.get("/films");
      setFilms(response.data.films || []);
    } catch (err) {
      console.error("Erro ao buscar filmes:", err.message);
      setError("Erro ao buscar filmes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleDeleteFilm = async (id, title) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja deletar o filme "${title}"?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/films/${id}`);
      alert(`O filme "${title}" foi deletado com sucesso!`);
      setFilms((prev) => prev.filter((film) => film.id !== id));
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      alert("Erro ao deletar o filme. Verifique o console.");
    }
  };

  const handleEditFilm = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleOpenFilm = (id) => {
    navigate(`/filme/${id}`);
  };

  if (loading) return <Container>Carregando...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Title>Catálogo de Filmes e Séries</Title>
      <FilmList>
        {films.length > 0 ? (
          films.map((film) => (
            <FilmCard key={film.id} onClick={() => handleOpenFilm(film.id)}>
              <IconContainer>
                <StyledIcon
                  hoverColor="#00bcd4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditFilm(film.id);
                  }}
                >
                  <Pencil size={20} />
                </StyledIcon>

                <StyledIcon
                  hoverColor="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFilm(film.id, film.title);
                  }}
                >
                  <Trash size={20} />
                </StyledIcon>
              </IconContainer>

              <Banner
                src={
                  film.banner ||
                  "https://via.placeholder.com/280x350?text=Sem+Imagem"
                }
                alt={film.title}
              />
              <FilmTitle>{film.title}</FilmTitle>
              <Description>
                {film.description?.length > 150
                  ? film.description.slice(0, 150) + "..."
                  : film.description}
              </Description>
            </FilmCard>
          ))
        ) : (
          <p>Nenhum filme encontrado.</p>
        )}
      </FilmList>
    </Container>
  );
}
