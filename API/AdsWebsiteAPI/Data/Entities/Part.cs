namespace AdsWebsiteAPI.Data.Entities
{
    public class Part
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public Car? Car { get; set; }
    }
}
