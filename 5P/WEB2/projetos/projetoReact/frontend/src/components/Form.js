import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 150px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2c73d2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1a5fb4;
  }
`;

const Form = ({ onEdit, setOnEdit, getImoveis }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const form = ref.current;

      form.fone.value = onEdit.fone;
      form.preco.value = onEdit.preco;
      form.endereco.value = onEdit.endereco;
      form.corretora.value = onEdit.corretora;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = ref.current;

    if (
      !form.fone.value ||
      !form.preco.value ||
      !form.endereco.value ||
      !form.corretora.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const imovel = {
      fone: form.fone.value,
      preco: form.preco.value,
      endereco: form.endereco.value,
      corretora: form.corretora.value,
    };

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/imoveis${onEdit.id}`, imovel);
        toast.success("Imóvel atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800/imoveis", imovel);
        toast.success("Imóvel cadastrado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao salvar o imóvel.");
    }

    form.reset();
    setOnEdit(null);
    getImoveis();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Fone</Label>
        <Input name="fone" type="text" />
      </InputArea>

      <InputArea>
        <Label>Preço</Label>
        <Input name="preco" type="number" step="0.01" />
      </InputArea>

      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" type="text" />
      </InputArea>

      <InputArea>
        <Label>Corretora</Label>
        <Input name="corretora" type="text" />
      </InputArea>

      <InputArea>
        <Button type="submit">Salvar</Button>
      </InputArea>
    </FormContainer>
  );
};

export default Form;
