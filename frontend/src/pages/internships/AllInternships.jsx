import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import FilterInterns from "./FilterInterns";

const AllInternships = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);

  useEffect(() => {
    // Fetch internships from the backend
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/company/internships"); // Adjust the API endpoint as needed
        setInternships(response.data);
        setFilteredInternships(response.data);
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };
    fetchInternships();
  }, []);

  const handleFilter = (filters) => {
    // Filter logic here based on filters
    let filteredInternships = internships;

    if (filters.title) {
      filteredInternships = filteredInternships.filter((internship) =>
        internship.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.location) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.location === filters.location
      );
    }

    if (filters.company) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.company === filters.company
      );
    }

    if (filters.industry) {
      filteredInternships = filteredInternships.filter((internship) =>
        internship.role.toLowerCase().includes(filters.industry.toLowerCase())
      );
    }

    if (filters.type.fullTime) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.type === "Full time"
      );
    }

    if (filters.type.partTime) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.type === "Part time"
      );
    }

    if (filters.type.remote) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.type === "Remote"
      );
    }

    if (filters.payment.free) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.payment === "free"
      );
    }

    if (filters.payment.paid) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.payment === "paid"
      );
    }

    setFilteredInternships(filteredInternships);
  };

  const handleClearFilter = () => {
    setFilteredInternships(internships);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
        All Available Internships
      </h2>
      <div className="flex">
        <div className="w-1/3 p-4">
          <FilterInterns onFilter={handleFilter} onClear={handleClearFilter} />
        </div>
        <div className="w-2/3 p-4 h-screen overflow-y-auto">
          {filteredInternships.map((internship, index) => (
            <div
              key={index}
              className="relative border rounded-lg p-4 mb-4 bg-white shadow-sm"
            >
              <div className="flex">
                <img src={internship.logo} className="w-8 mr-1" alt="logo" />
                <h3 className="font-bold text-lg text-gray-700">
                  {internship.title}
                </h3>
              </div>
              <p className="text-blue-600">{internship.role}</p>
              <p className="text-gray-600 font-medium">{internship.duration}</p>

              <div className="absolute top-12 right-6">
                <p className="text-gray-600 font-medium ">
                  {internship.location}
                </p>
              </div>

              <p className="text-gray-500">{internship.description}</p>
              <div className="absolute top-4 right-6">
                <p className="text-blue-800 font-semibold font-serif capitalize">
                  {internship.payment}
                </p>
              </div>
              <p className="text-gray-800 capitalize">{internship.type}</p>
              <div className="text-yellow-500 text-xl flex justify-between">
                {"★".repeat(internship.rating) +
                  "☆".repeat(5 - internship.rating)}
                <button
                  className="bg-blue-600 text-white px-6 py-1 rounded-md mt-4 hover:bg-blue-700"
                  onClick={() => navigate(`/internship/${internship._id}`)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllInternships;
