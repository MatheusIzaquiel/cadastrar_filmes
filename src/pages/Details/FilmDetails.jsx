import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";

const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
`;

const Banner = styled.img`
  height: 400px;
  border-radius: 10px;
`;

const Title = styled.h1`
  margin-top: 1.5rem;
  color: #03e9f4;
`;

const Description = styled.p`
  margin-top: 1rem;
  color: #ccc;
  line-height: 1.6;
  text-align: justify;
`;

const BackButton = styled.button`
  background: none;
  color: #03e9f4;
  border: 1px solid #03e9f4;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: #03e9f4;
    color: #121212;
  }
`;

export default function FilmDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await api.get(`/films/${id}`);
        setFilm(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        alert("Não foi possível carregar as informações do filme.");
      } finally {
        setLoading(false);
      }
    };
    fetchFilm();
  }, [id]);

  if (loading) return <Container>Carregando detalhes...</Container>;
  if (!film) return <Container>Filme não encontrado.</Container>;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Voltar
      </BackButton>
      <Banner src={film.banner || "https://via.placeholder.com/900x400"} />
      <Title>{film.title}</Title>
      <Description>{film.description}</Description>
    </Container>
  );
}
