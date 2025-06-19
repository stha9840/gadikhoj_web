const vehicles = [
  { name: 'BMW X5', price: '$120/day' },
  { name: 'Audi A6', price: '$100/day' },
  { name: 'Ford Focus', price: '$80/day' },
];

export default function AvailableVehicles() {
  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-semibold text-center mb-8">Available Vehicles for Rent</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle, idx) => (
          <div key={idx} className="border rounded shadow p-4 text-center">
            <img
              src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
              alt={vehicle.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="font-bold mb-2">{vehicle.name}</h3>
            <p>{vehicle.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}