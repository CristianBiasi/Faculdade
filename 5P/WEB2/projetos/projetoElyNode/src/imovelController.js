async function connect() {
    try {
        if (global.connection && global.connection.state != 'disconnected') {
            console.log('Conexão inexistente')
            return global.connection;
        }console.log('Iniciando Conexão')
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'imoveisEly',
            port: '3308',
        });
        global.connection = connection;

        console.log('Conexao efetuada')
        const [rows] = await connection.query("SHOW TABLES LIKE 'imoveis'");
        if (rows.length === 0) {
            
            const createTableQuery = `
                CREATE TABLE imoveis (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    endereco VARCHAR(255) NOT NULL,
                    cep VARCHAR(20) NOT NULL,
                    valor DECIMAL(10, 2) NOT NULL,
                    contato VARCHAR(50) NOT NULL,
                    STATUS ENUM('disponivel', 'alugado', 'vendido') DEFAULT 'disponivel'
                )
            `;
            try {
                await connection.query(createTableQuery);
                console.log("Tabela 'imoveis' criada com sucesso!");
            } catch (createError) {
                console.error("Erro ao criar a tabela 'imoveis':", createError);
            }
        } else {
            console.log("Tabela 'imoveis' já existe.");
        }

        return connection;
    } catch (error) {
        console.error('Erro na conexão com o banco de dados:', error);
        throw new Error('Falha ao conectar ao banco de dados.');
    }
}


exports.post = async (req, res, next) => {
    const con = await connect();
    const STATUS = req.body.STATUS || 'disponivel';
    const sql = 'INSERT INTO imoveis'
                + '(endereco, cep, valor, contato, STATUS)'
                + ' VALUES (?, ?, ?, ?, ?)';
    const values = [req.body.endereco, req.body.cep, req.body.valor, req.body.contato, req.body.STATUS];
    await con.query(sql, values);
    res.status(201).send('rota post ok');
};

exports.put = async (req, res, next) => {
    const con = await connect();
    let id = req.params.id;
    
    const sql = 'UPDATE imoveis '
            + 'SET endereco = ?, cep = ?, '
            + 'valor = ?, contato = ?, '
            + 'STATUS = ? '
            + 'WHERE id = ?';

            
    const values = [req.body.endereco, req.body.cep, req.body.valor, req.body.contato, req.body.STATUS, id];
    await con.query(sql, values);
    res.status(201).send('ok put');
};

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = 'DELETE FROM imoveis WHERE id = ?';
    const values = [id];
    await con.query(sql, values);
    res.status(200).send(`Imóvel com id ${id} deletado com sucesso`);

};

exports.get = async (req, res, next) => {
    try {
        console.log('Iniciando consulta aos imóveis...');
        const con = await connect();
        const [rows] = await con.query('SELECT * FROM imoveis');
        console.log('Consulta concluída:', rows);
        res.status(200).send(rows);
    } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
        res.status(500).send('Erro ao buscar imóveis');
    }
};


exports.getById = async (req, res, next) => {
    try {
        let id = req.params.id;
        const con = await connect();
        const sql = 'SELECT * FROM imoveis WHERE id = ?';
        const values = [id];
        const [rows] = await con.query(sql, values);

        if (rows.length == 0) {
            res.status(404).send('Registro não encontrado');
        } else {
            res.status(200).send(rows);
        }
    } catch (error) {
        console.error('Erro ao buscar imóvel por ID:', error);
        res.status(500).send('Erro ao buscar imóvel por ID');
    }
};

