import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [imoveis, setImoveis] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getImoveis = async () => {
    try {
      const res = await axios.get("http://localhost:8800/imoveis");
      setImoveis(res.data);
    } catch (error) {
      toast.error("Erro ao buscar imóveis.");
    }
  };

  useEffect(() => {
  getImoveis();
}, []);

useEffect(() => {
  console.log("Imóveis carregados:", imoveis); // Adicione isto
}, [imoveis]);

  return (
    <>
      <Container>
        <Title>IMÓVEIS</Title>
        <p style={{ backgroundColor: 'red', color: 'white' }}>Renderizando!</p>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getImoveis={getImoveis} />
        <Grid setOnEdit={setOnEdit} imoveis={imoveis} setImoveis={setImoveis} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}
export default App;
