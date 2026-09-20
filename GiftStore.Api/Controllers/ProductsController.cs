using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GiftStore.Api.DTOs;
using GiftStore.Domain;
using GiftStore.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;

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
                NameEn = p.NameEn,
                DescriptionEn = p.DescriptionEn,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
                ImageUrl = p.ImageUrl,
                Category = p.Category,
                CategoryEn = p.CategoryEn
            })
            .ToListAsync();

        return Ok(products);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct(ProductDto dto)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            NameEn = dto.NameEn,
            DescriptionEn = dto.DescriptionEn,
            Price = dto.Price,
            StockQuantity = dto.StockQuantity,
            ImageUrl = dto.ImageUrl,
            Category = dto.Category,
            CategoryEn = dto.CategoryEn,
            CreatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        dto.Id = product.Id;
        return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, dto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(Guid id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        var dto = new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            NameEn = product.NameEn,
            DescriptionEn = product.DescriptionEn,
            Price = product.Price,
            StockQuantity = product.StockQuantity,
            ImageUrl = product.ImageUrl,
            Category = product.Category,
            CategoryEn = product.CategoryEn
        };

        return Ok(dto);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(Guid id, ProductDto dto)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.NameEn = dto.NameEn;
        product.DescriptionEn = dto.DescriptionEn;
        product.Price = dto.Price;
        product.StockQuantity = dto.StockQuantity;
        product.ImageUrl = dto.ImageUrl;
        product.Category = dto.Category;
        product.CategoryEn = dto.CategoryEn;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}