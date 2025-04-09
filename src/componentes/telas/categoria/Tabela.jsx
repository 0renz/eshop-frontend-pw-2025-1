import { useContext } from 'react'
import CategoriaContext from './CategoriaContext';
import Table from 'react-bootstrap/Table';
import Alerta from '../../comuns/Alerta';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, loading } = useContext(CategoriaContext);

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
                <p>Carregando categorias...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Categorias</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()} className="mb-3">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {(!listaObjetos || listaObjetos.length === 0) && (<h4>Nenhuma categoria encontrada</h4>)}
            {listaObjetos && listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                            <th style={{ width: '80px' }}>Código</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <Button variant="info" title="Editar"
                                        onClick={() => editarObjeto(objeto.codigo)}
                                        style={{ marginRight: '5px' }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" title="Remover"
                                        onClick={() => remover(objeto.codigo)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;