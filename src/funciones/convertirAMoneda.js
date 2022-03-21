const FormatearCantidad = (valor) => {
    return new Intl.NumberFormat(
        'es-CO',
        {styled:'currency',currency:'COP' , minimumFractionDigits:0}
    ).format(valor );
}
 
export default FormatearCantidad;