namespace GiftStore.Domain;

public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? NameEn { get; set; }
    public string? DescriptionEn { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public string? ImageUrl { get; set; }
    public string Category { get; set; } = "عام";
    public string? CategoryEn { get; set; }
    public DateTime CreatedAt { get; set; }
}