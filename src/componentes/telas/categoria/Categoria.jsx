import { useState, useEffect } from 'react';
import CategoriaContext from './CategoriaContext';
import {
    getCategoriasAPI, getCategoriaPorCodigoAPI,
    deleteCategoriaPorCodigoAPI, cadastraCategoriaAPI
} from '../../../servicos/CategoriaServico';
import Tabela from './Tabela';
import Formulario from './Formulario'; // <--- Import the Formulario component
import Alerta from '../../comuns/Alerta';

function Categoria() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false); // State to control form visibility
    const [objeto, setObjeto] = useState({
        codigo: "", nome: ""
    });

    const recuperaCategorias = async () => {
        setListaObjetos(await getCategoriasAPI());
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
        setExibirForm(true); // Show the form
    };

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getCategoriaPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true); // Show the form
        } catch (error) {
            console.error("Erro ao buscar categoria para edição:", error);
            setAlerta({ status: "error", message: "Erro ao carregar dados da categoria para edição." });
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            // Don't necessarily set the object from the return if using a modal;
            // just close the form and refresh the list
            // setObjeto(retornoAPI.objeto); // Maybe remove or adjust this
            if (!editar) {
                // If it was a new item, maybe clear the form state or keep it if needed
                // setEditar(true); // Might not be needed if closing form
            }
            setExibirForm(false); // Close the form on successful save
            recuperaCategorias(); // Refresh the list
        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: "Erro ao salvar categoria." }); // Provide feedback
        }
        // Consider moving recuperaCategorias() outside the try if you want it to run even on error
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteCategoriaPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaCategorias();
            } catch (error) {
               console.error("Erro ao remover categoria:", error);
               setAlerta({ status: "error", message: "Erro ao remover categoria." });
            }
        }
    };

    // Function to explicitly set the form visibility (needed by Formulario's close button)
    const toggleForm = (show) => {
        setExibirForm(show);
        if (!show) {
            // Optionally reset alert when closing form manually
             setAlerta({ status: "", message: "" });
        }
    }

    useEffect(() => {
        recuperaCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={
            {
                // Provide all necessary states and functions
                listaObjetos, alerta, setAlerta, remover, objeto, setObjeto,
                editarObjeto, acaoCadastrar, handleChange, novoObjeto,
                exibirForm, toggleForm, // Pass exibirForm and the toggle function
                editar // Pass editar status if needed in Formulario (e.g., for title)
            }
        }>
            {/* Render Tabela which shows the list and triggers actions */}
            <Tabela />
            {/* Render Formulario which shows the modal */}
            <Formulario />
        </CategoriaContext.Provider>
    );
}

export default Categoria;