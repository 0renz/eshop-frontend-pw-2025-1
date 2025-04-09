import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Carregando({ carregando, children }) {
    return (
        <>
            {carregando &&
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                </div>
            }
            {!carregando && children}
        </>
    );
}

export default Carregando;