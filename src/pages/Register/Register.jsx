import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../../api/api"
import styled from "styled-components";


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
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  outline: none;
  resize: none;
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
export default function Register() {
  const [film, setFilm] = useState("")
  const [description, setDescription] = useState("")
  const [banner, setBanner] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!film || !description || !banner) {
    alert("Todos os campos devem ser preenchidos");
    return;
  }

  try {
    setLoading(true);
    const response = await api.post("/films", {
      title: film,
      description,
      banner,
    });

    console.log("Filme cadastrado:", response.data);
    alert("Filme cadastrado com sucesso!");
    navigate("/");
  } catch (error) {
    console.error("Erro ao cadastrar filme:", error);
    alert("Erro ao cadastrar filme. Verifique o console.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container>
      <Title>Cadastrar Filme ou Série 🎬</Title>
      <Form onSubmit={handleSubmit}>
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

        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </Button>
      </Form>
    </Container>
  );
}
