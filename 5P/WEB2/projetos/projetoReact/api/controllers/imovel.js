import { db } from "../db.js";

export const getImoveis = (_, res) => {
  const q = "SELECT * FROM imovel";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addImovel = (req, res) => {
  const q =
    "INSERT INTO imovel(`fone`, `preco`, `endereco`, `corretora`) VALUES(?)";

  const values = [
    req.body.fone,
    req.body.preco,
    req.body.endereco,
    req.body.corretora,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Imovel criado com sucesso.");
  });
};

export const updateImovel = (req, res) => {
  const q =
    "UPDATE imovel SET `fone` = ?, `preco` = ?, `endereco` = ?, `corretora` = ? WHERE `id` = ?";

  const values = [
    req.body.fone,
    req.body.preco,
    req.body.endereco,
    req.body.corretora,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Imovel atualizado com sucesso.");
  });
};

export const deleteImovel = (req, res) => {
  const q = "DELETE FROM imovel WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Imovel deletado com sucesso.");
  });
};
