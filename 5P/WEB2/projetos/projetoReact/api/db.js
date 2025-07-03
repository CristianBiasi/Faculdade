import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "imobiliaria",
    port: 3306
})

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso ✅");
  }
});