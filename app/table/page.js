"use client"

import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Loader from "@/components/Loader";
const Table = () => {
  const[loading,setLoading] = useState(true);

  const [data, setData] = useState([]); // Full data from the server
  const [filteredData, setFilteredData] = useState([]); // Data after filters/sorting/pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [rowsPerPage] = useState(10); // Rows per page
  const [search, setSearch] = useState(""); // Search query
  const [sortBy, setSortBy] = useState("Domain"); // Sort column
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order (asc/desc)
  const [totalPages, setTotalPages] = useState(1); // Total pages
  // const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Update the URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add filter values to URL parameters
    params.set("page", currentPage);
    params.set("rowsPerPage", rowsPerPage);
    if (search) params.set("search", search);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("order", sortOrder);

    // Update the URL without reloading the page (shallow routing)
    router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  }, [currentPage, rowsPerPage, search, sortBy, sortOrder]);

  // Fetch data from backend on filter change or page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://interactive-data-table-application.onrender.com/data", {
          params: {
            page: currentPage,
            rowsPerPage,
            search,
            sortBy,
            order: sortOrder,
          },
        });
        setLoading(false)

        // Log the response to check the data
        console.log("Backend Response:", response.data);

        // Ensure the response has the expected structure
        if (response.data && response.data.data) {
          setData(response.data.data);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Error: Response data is not in expected format.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, rowsPerPage, search, sortBy, sortOrder]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle sorting
  const handleSort = (column) => {
    const order = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(order);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      {loading ? <Loader/> : <div className="p-8 bg-gray-100 h-screen">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Domain"
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Sort By Dropdown */}
      <div className="relative mb-4">
        <select
          name="sortBy"
          value={`${sortBy}_${sortOrder}`}
          onChange={(e) => {
            const [column, order] = e.target.value.split("_");
            setSortBy(column);
            setSortOrder(order);
          }}
          className="border p-2 rounded"
        >
          <option value="Domain_asc">Domain: Asc</option>
          <option value="Domain_desc">Domain: Desc</option>
          <option value="Traffic_asc">Traffic: Asc</option>
          <option value="Traffic_desc">Traffic: Desc</option>
          <option value="Price_asc">Price: Asc</option>
          <option value="Price_desc">Price: Desc</option>
          <option value="Spam Score_asc">Spam Score: Asc</option>
          <option value="Spam Score_desc">Spam Score: Desc</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="cursor-pointer p-3 border" onClick={() => handleSort("Domain")}>
              Domain
            </th>
            <th className="cursor-pointer p-3 border" onClick={() => handleSort("Traffic")}>
              Traffic
            </th>
            <th className="cursor-pointer p-3 border" onClick={() => handleSort("Price")}>
              Price
            </th>
            <th className="cursor-pointer p-3 border" onClick={() => handleSort("Spam Score")}>
              Spam Score
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border">
              <td className="p-3 border">{row.Domain}</td>
              <td className="p-3 border">{row.Traffic}</td>
              <td className="p-3 border">{row.Price}</td>
              <td className="p-3 border">{row["Spam Score"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white w-fit rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 w-fit text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div> }
    </main>
    
  );
};

export default Table;
