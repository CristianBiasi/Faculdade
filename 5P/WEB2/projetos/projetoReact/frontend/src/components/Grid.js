import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-word;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr``;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
`;

const Grid = ({ imoveis, setImoveis, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/imoveis" + id);
      const newArray = imoveis.filter((i) => i.id !== id);
      setImoveis(newArray);
      toast.success("Imóvel deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar o imóvel.");
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Fone</Th>
          <Th>Preço</Th>
          <Th>Endereço</Th>
          <Th>Corretora</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {imoveis.map((item, index) => (
          <Tr key={index}>
            <Td>{item.fone}</Td>
            <Td>{item.preco}</Td>
            <Td>{item.endereco}</Td>
            <Td>{item.corretora}</Td>
            <Td alignCenter>
              <FaEdit onClick={() => handleEdit(item)} style={{ cursor: "pointer", marginRight: "10px" }} />
              <FaTrash onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
