import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconoFlecha } from './../imagenes/flecha.svg';
import {useHistory} from 'react-router-dom';


const Btn = styled.button`
    display: block;
    width: 3.12rem; /* 50px */
    height: 3.12rem; /* 50px */
    line-height: 3.12rem; /* 50px */
    text-align: center;
    margin-right: 0.25rem; /* 20px */
    border: none;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.31rem; /* 5px */
    cursor: pointer;
 
    @media(max-width: 60rem){ /* 950px */
        width: 2.5rem; /* 40px */
        height: 2.5rem; /* 40px */
        line-height: 2.5rem; /* 40px */
    }
`;
 
const Icono = styled(IconoFlecha)`
    width: 50%;
    height: auto;
    fill: #fff;
`;

const BtnRegresar = ({ruta='/'}) => {
    const history =useHistory()
    return (  
        <Btn onClick={() =>history.push(ruta)}><Icono/></Btn>

    );
}
 
export default BtnRegresar;
