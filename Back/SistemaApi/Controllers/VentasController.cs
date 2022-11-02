﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaApi.DTOs;
using SistemaApi.Entidades;
using SistemaApi.Utilidades;
using System.Net;

namespace SistemaApi.Controllers
{
    [ApiController]
    [Route("api/ventas")]
    public class VentasController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public VentasController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

       
        [HttpGet]
        public async Task<ActionResult<ListadoVentasDTO>> Get()
        {
            var ventas = await context.Ventas.Include(x=>x.VentaProducto).ThenInclude(x=>x.Producto).ToListAsync();
            var resultado = new ListadoVentasDTO();
            resultado.Ventas = mapper.Map<List<VentaDTO>>(ventas);

            return resultado;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<VentaDTO>> Get(int id)
        {
            var venta = await context.Ventas.Include(x => x.VentaProducto).ThenInclude(x => x.Producto).FirstOrDefaultAsync(x=>x.Id == id);

            if (venta == null) { return NotFound(); }

            var dto = mapper.Map<VentaDTO>(venta);
            return dto;
        }

        [HttpGet("filtrar")]
        public async Task<ActionResult<List<VentaDTO>>> Filtrar([FromQuery] VentaFiltrarDTO ventaFiltrarDTO)
        {
            var ventasQueryable = context.Ventas.AsQueryable();

            if (!string.IsNullOrEmpty(ventaFiltrarDTO.NombreCliente))
            { 
                ventasQueryable = ventasQueryable.Where(x => x.NombreCliente.Contains(ventaFiltrarDTO.NombreCliente));
            }

            if (ventaFiltrarDTO.ProductoId != 0)
            {
                ventasQueryable = ventasQueryable
                    .Where(x => x.VentaProducto.Select(y => y.ProductoId)
                    .Contains(ventaFiltrarDTO.ProductoId));
            }

            if (ventaFiltrarDTO.FechaDeVenta != null)
            {

                ventasQueryable = ventasQueryable.Where(x => x.FechaDeVenta.Date == ventaFiltrarDTO.FechaDeVenta.Value.Date);
            }

            await HttpContext.InsertarParametrosPaginacionEnCabecera(ventasQueryable);

            var ventas = await ventasQueryable.Paginar(ventaFiltrarDTO.PaginacionDTO).ToListAsync();
            return mapper.Map<List<VentaDTO>>(ventas);
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] VentaCreacionDTO ventaCreacionDTO)
        {
            double total = 0;

            if(ventaCreacionDTO.ProductosIds.Count == 0)
            {
                return BadRequest("Ingresar al menos un producto");
            }

            foreach (var tuple in ventaCreacionDTO.ProductosIds)
            {
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == tuple[0]);
                if (tuple[1] > producto.Cantidad)
                {
                    return BadRequest("No hay suficientes unidades del producto");
                }
            }


            foreach (var tuple in ventaCreacionDTO.ProductosIds)
            {
                var id = tuple[0];
                var cantidad = tuple[1];
                var producto = await context.Productos.FirstOrDefaultAsync(x => x.Id == id);
                producto.Cantidad = producto.Cantidad - cantidad;
                total = total + (producto.Precio * cantidad);
            }
            var venta = mapper.Map<Venta>(ventaCreacionDTO);
            venta.PrecioTotal = total;
            venta.FechaDeVenta = DateTime.Now;
            context.Add(venta);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<VentasPostGetDTO>> PostGet()
        {
            var productos = await context.Productos
                .Where(x => x.Cantidad > 0)
                .OrderBy(x => x.Nombre)
                .ToListAsync();
            var productosDTO = mapper.Map<List<ProductoDTO>>(productos);
            return new VentasPostGetDTO() { Productos = productosDTO };
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] VentaCreacionDTO ventaCreacionDTO)
        {
            var venta = await context.Ventas.FirstOrDefaultAsync(x => x.Id == id);

            if (venta == null)
            {
                return NotFound();
            }

            venta = mapper.Map(ventaCreacionDTO, venta);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var venta = await context.Ventas.FirstOrDefaultAsync(x => x.Id == id);

            if (venta == null)
            {
                return NotFound();
            }

            context.Remove(venta);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}