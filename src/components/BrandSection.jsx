import React from 'react';
import bmwLogo from '../assets/BrandSection/BMW.png';
// import audiLogo from '../assets/BrandSection/ford.png';
import fordLogo from '../assets/BrandSection/ford.png';
import mercLogo from '../assets/BrandSection/mercedes.png';
import peugeotLogo from '../assets/BrandSection/peugeot.png';
import vwLogo from '../assets/BrandSection/volkswagen.png';
import hyundaiLogo from '../assets/BrandSection/hyundaiLogo.png';
import toyotaLogo from '../assets/BrandSection/toyotaLogo.png';
import kiaLogo from '../assets/BrandSection/kia.png';
// import vwLogo from '../assets/BrandSection/volkswagen.png';

const brands = [
  // { name: 'Audi', logo: audiLogo },
  { name: 'BMW', logo: bmwLogo },
  { name: 'Ford', logo: fordLogo },
  { name: 'Mercedes Benz', logo: mercLogo },
  { name: 'Peugeot', logo: peugeotLogo },
  { name: 'Volkswagen', logo: vwLogo },
  { name: 'Hyundai', logo: hyundaiLogo },
  { name: 'Toyota', logo: toyotaLogo },
  // { name: 'Nissan', logo: nissanLogo },
  // { name: 'Kia', logo: kiaLogo },
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
            <div className="h-16 w-16 rounded-full bg-[#f1f1f1] shadow-inner mb-3 flex items-center justify-center overflow-hidden">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 w-10 object-contain"
              />
            </div>
            <p className="text-center">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
