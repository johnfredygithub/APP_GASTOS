const FormatearCantidad = (valor) => {
    return new Intl.NumberFormat(
        'en-US',
        {styled:'currency',currency:'USD' , minimumFractionDigits:3}
    ).format(valor );
}
 
export default FormatearCantidad;