using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GiftStore.Api.DTOs;
using GiftStore.Domain;
using GiftStore.Infrastructure.Data;

namespace GiftStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    {
        var products = await _context.Products
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
                ImageUrl = p.ImageUrl
            })
            .ToListAsync();

        return Ok(products);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(ProductDto dto)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            StockQuantity = dto.StockQuantity,
            ImageUrl = dto.ImageUrl,
            CreatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        dto.Id = product.Id;
        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, dto);
    }
}
