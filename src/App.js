import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
    const [busqueda, guardarBusqueda] = useState('');
    const [imagenes, guardarImagenes] = useState([]);
    const [paginaactual, guardarPaginaActual] = useState(1);
    const [totalpaginas, guardarTotalPaginas] = useState(1);

    useEffect(() => {
        if (busqueda.trim() === '') return;

        const consultarAPI = async () => {
            const paginas = 30;
            const key = '15392331-4d99a64ff2b1153222e1a5cbf';
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${paginas}&page=${paginaactual}`;

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            guardarImagenes(resultado.hits);
            guardarTotalPaginas(Math.ceil(resultado.totalHits / paginas));

            document.querySelector('.jumbotron').scrollIntoView({ behavior: 'smooth' });
        };
        consultarAPI();
    }, [busqueda, paginaactual]);

    const paginaAnterior = () => {
        const nuevaPaginaActual = paginaactual - 1;
        if (nuevaPaginaActual === 0) return;
        guardarPaginaActual(nuevaPaginaActual);
    };

    const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaactual + 1;
        if (nuevaPaginaActual > totalpaginas) return;
        guardarPaginaActual(nuevaPaginaActual);
    };

    return (
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de imágenes</p>
                <Formulario guardarBusqueda={guardarBusqueda}></Formulario>
            </div>
            <div className="row justify-content-center">
                <ListadoImagenes imagenes={imagenes}></ListadoImagenes>
                {paginaactual === 1 ? null : (
                    <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>
                        &laquo; Anterior
                    </button>
                )}

                {paginaactual === totalpaginas ? null : (
                    <button type="button" className="btn btn-info" onClick={paginaSiguiente}>
                        Siguiente &raquo;
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
