namespace AdsWebsiteAPI.Data.Entities
{
    public class Car
    {
        public int Id { get; set; }
        public DateTime FirstRegistration { get; set; }
        public int Mileage { get; set; }
        public float Engine { get; set; }
        public int Power { get; set; }
        public BodyType? Body { get; set; }
        public FuelType? Fuel { get; set; }
        public GearboxType? Gearbox { get; set; }
        public Model? Model { get; set; }
        public Shop? Shop { get; set; }
    }
}
