import { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";

// ======= ESTILOS =======
const Container = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  background: #2c2c2c;
  color: #fff;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  min-height: 100px;
  outline: none;
  resize: none;
  background: #2c2c2c;
  color: #fff;
`;

const Button = styled.button`
  background: #03e9f4;
  color: #121212;
  border: none;
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00bcd4;
    transform: scale(1.05);
  }
`;

const Loading = styled.p`
  color: #ccc;
  text-align: center;
`;

// ======= COMPONENTE PRINCIPAL =======
export default function EditFilm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const [loading, setLoading] = useState(true);

  // Carrega dados do filme no início
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await api.get(`/films/${id}`);
        const { title, description, banner } = response.data;
        setFilm(title || "");
        setDescription(description || "");
        setBanner(banner || "");
      } catch (error) {
        console.error("Erro ao carregar filme:", error);
        if (error.response?.status === 404) {
          alert("Filme não encontrado!");
          navigate("/");
        } else {
          alert("Erro ao buscar informações do filme. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id, navigate]);

  // Atualiza o filme
  const handleEditFilm = async (e) => {
    e.preventDefault();

    if (!film.trim() || !description.trim()) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const confirmEdit = window.confirm(
      `Tem certeza que deseja atualizar o filme "${film}"?`
    );
    if (!confirmEdit) return;

    try {
      await api.put(`/films/${id}`, {
        title: film,
        description,
        banner,
      });

      alert(`O filme "${film}" foi atualizado com sucesso!`);
      navigate("/");
    } catch (error) {
      console.error("Erro ao editar filme:", error);
      if (error.response?.status === 404) {
        alert("Filme não encontrado!");
        navigate("/");
      } else {
        alert("Erro ao editar o filme. Verifique o console para mais detalhes.");
      }
    }
  };

  if (loading) return <Loading>Carregando informações...</Loading>;

  return (
    <Container>
      <Title>Editar Filme</Title>
      <Form onSubmit={handleEditFilm}>
        <Input
          type="text"
          placeholder="Título"
          value={film}
          onChange={(e) => setFilm(e.target.value)}
        />
        <TextArea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="URL do Banner"
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
        />
        <Button type="submit">Atualizar</Button>
      </Form>
    </Container>
  );
}
