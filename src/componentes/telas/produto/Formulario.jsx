import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ProdutoContext from './ProdutoContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';
import CampoEntradaTextArea from '../../comuns/CampoEntradaTextArea';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaCategorias } = useContext(ProdutoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Produto"
            idform="formulario" acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={4}>
                <CampoEntrada value={objeto.codigo}
                    id="txtCodido" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5} />
            </Col>
            <Col xs={12} md={8}>
                <CampoEntrada value={objeto.nome}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o nome"
                    requerido={true} readonly={false}
                    maxCaracteres={40} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntradaTextArea value={objeto.descricao}
                    id="txtDescricao" name="descricao" label="Desrição"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a descrição"
                    requerido={false} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.quantidade_estoque}
                    id="txtEstoque" name="quantidade_estoque" label="Estoque"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a quantidade em estoque"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.valor}
                    id="txtValor" name="valor" label="Valor"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o valor"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.data_cadastro}
                    id="txtDataCadastro" name="data_cadastro" label="Data de cadastro"
                    tipo="date" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data de cadastro"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoSelect value={objeto.ativo}
                    id="txtAtivo" name="ativo" label="Ativo"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe se está ativo"
                    requerido={true}>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                </CampoSelect>
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect value={objeto.categoria}
                    id="txtCategoria" name="categoria" label="Categoria"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a categoria"
                    requerido={true}>
                    {listaCategorias.map((cat) => (
                        <option key={cat.codigo} value={cat.codigo}>
                            {cat.nome}
                        </option>
                    ))}
                </CampoSelect>
            </Col>
        </Dialogo>
    )
}

export default Formulario;