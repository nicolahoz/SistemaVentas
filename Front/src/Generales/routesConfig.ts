import CargarCliente from "../Clientes/Components/CargarCliente";
import EditarCliente from "../Clientes/Components/EditarCliente";
import FiltroClientes from "../Clientes/Components/FiltroClientes";
import InfoCliente from "../Clientes/Components/InfoCliente";
import CargarProducto from "../Productos/Components/CargarProducto";
import EditarProducto from "../Productos/Components/EditarProducto";
import FiltroProductos from "../Productos/Components/FiltroProductos";
import Redireccionar from "../utils/Redireccionar";
import CargarVentas from "../Ventas/Components/CargarVentas";
import DetalleVentas from "../Ventas/Components/DetalleVentas";
import EditarVenta from "../Ventas/Components/EditarVenta";
import FiltroVentas from "../Ventas/Components/FiltroVentas";


const rutas = [
    {path: '/', componente: FiltroProductos, exact: true},
    {path: '/productos/cargar', componente: CargarProducto, exact: true},
    {path: '/productos/editar/:id(\\d+)', componente: EditarProducto, exact: true},

    {path: '/ventas', componente: CargarVentas, exact: true},
    {path: '/ventas/editar/:id(\\d+)', componente: EditarVenta, exact: true},
    {path: '/listadoVentas', componente: FiltroVentas, exact: true},
    {path: '/ventas/:id(\\d+)', componente: DetalleVentas, exact: true},

    {path: '/clientes', componente: CargarCliente, exact: true},
    {path: '/listadoClientes', componente: FiltroClientes, exact: true},
    {path: '/clientes/editar/:id(\\d+)', componente: EditarCliente, exact: true},
    {path: '/clientes/:id(\\d+)', componente: InfoCliente, exact: true},
    

    {path: '*', componente: Redireccionar}
]

export default rutas;