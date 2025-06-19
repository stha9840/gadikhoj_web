import React from 'react';

const brands = [
  { name: 'Audi' },
  { name: 'BMW' },
  { name: 'Ford' },
  { name: 'Mercedes Benz' },
  { name: 'Peugeot' },
  { name: 'Volkswagen' },
];

export default function BrandsSection() {
  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#2c2c2c] mb-10">
        Explore Our Premium Brands
      </h2>
      <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="w-24 flex flex-col items-center text-sm font-medium text-[#2c2c2c]"
          >
            <div className="h-16 w-16 rounded-full bg-[#f1f1f1] shadow-inner mb-3 flex items-center justify-center">
              {/* Placeholder for brand logo, replace with <img /> if needed */}
              <span className="text-xs text-gray-500">Logo</span>
            </div>
            <p className="text-center">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
