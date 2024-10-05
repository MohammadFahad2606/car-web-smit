import React, { useState } from "react";

// Array of car objects
const cars = [
  { brand: "Toyota", model: "Camry", year: 2020, color: "Red" },
  { brand: "Honda", model: "Civic", year: 2018, color: "Blue" },
  { brand: "Ford", model: "Mustang", year: 2021, color: "Black" },
  { brand: "Tesla", model: "Model S", year: 2022, color: "White" },
  { brand: "Toyota", model: "Corolla", year: 2019, color: "Green" },
];

function Test() {
  // State to hold the search input value
  const [search, setSearch] = useState("");

  // State to determine sorting order
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle sorting order change
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter and sort cars based on search query and sort order
  const filteredAndSortedCars = cars
    .filter(
      (car) =>
        car.year.toString().includes(search.toLowerCase()) ||
        car.brand.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "asc" ? a.year - b.year : b.year - a.year));

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Input Field */}
      <h2>Car Search & Sort</h2>
      <input
        type="text"
        placeholder="Search by year, brand, or model"
        value={search}
        onChange={handleSearchChange}
        style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
      />

      {/* Button to Toggle Sorting Order */}
      <button onClick={toggleSortOrder} style={{ marginBottom: "20px" }}>
        Sort by Year ({sortOrder === "asc" ? "Low to High" : "High to Low"})
      </button>

      {/* Displaying Filtered and Sorted Cars */}
      <h3>Filtered and Sorted Cars:</h3>
      <ul>
        {filteredAndSortedCars.map((car, index) => (
          <li key={index}>
            {car.year} {car.brand} {car.model} ({car.color})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
