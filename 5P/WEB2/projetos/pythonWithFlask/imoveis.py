import pymysql
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint

imovel_bp = Blueprint('imovel', __name__)

@imovel_bp.route('/imovel')
def imovel():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute('SELECT * FROM imoveis')
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(f'Erro ao listar tabela {e}')
    finally:
        cursor.close()
        conn.close()

@imovel_bp.route('/imovel/<id>')
def imovelbyid(id):
    try:
        conn = connect_db()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        cur.execute("SELECT * FROM imoveis WHERE id = %s", (id,))
        rows = cur.fetchall()
        if rows:
            resp = jsonify(rows[0])
            resp.status_code = 200
            return resp
        else:
            return jsonify({'error': 'Imovel não encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@imovel_bp.route('/imovel', methods=['POST'])
def imovelnovo():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        # Pegar dados do json
        imovel = request.json
        endereco = imovel['endereco']
        cep = imovel['cep']
        valor = imovel['valor']
        contato = imovel['contato']
        status = imovel['STATUS']
        cursor.execute("INSERT INTO imoveis (endereco, cep, valor, contato, STATUS) VALUES (%s, %s, %s, %s, %s)",
                        (endereco, cep, valor, contato, status))
        conn.commit()
        resp = jsonify({'message':'Imovel cadastrado com sucesso'})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@imovel_bp.route('/imovel/<id>', methods=["PUT"])
def imovelalterar(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        #pegar os dados do JSON
        imovel = request.json
        endereco = imovel['endereco']
        cep = imovel['cep']
        valor = imovel['valor']
        contato = imovel['contato']
        status = imovel['STATUS']
        cursor.execute(
                    "UPDATE imoveis SET endereco = %s, cep = %s, valor = %s, contato = %s, STATUS= %s WHERE id = %s",
                    (endereco, cep, valor, contato, status, id)
)

        conn.commit()
        resp = jsonify({"message": "Imovel alterado com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@imovel_bp.route('/imovel/<id>', methods=["DELETE"])
def imovelexcluir(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute("DELETE FROM imoveis WHERE id = %s ", (id,))

        conn.commit()
        resp = jsonify({"message": "Imovel excluído com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()