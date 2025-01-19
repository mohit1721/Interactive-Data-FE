"use client"

import React, { useState, useEffect } from "react";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Loader from "@/components/Loader";
import { getDataLists } from "@/services/operations/dataAPI";
import {toast} from "react-hot-toast"
import PrivateRoute from "@/components/PrivateRoute";
const Table = () => {
  const[loading,setLoading] = useState(true);

  const [data, setData] = useState([]); // Full data from the server
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [rowsPerPage] = useState(10); // Rows per page
  const [search, setSearch] = useState(""); // Search query
  const [sortBy, setSortBy] = useState("Domain"); // Sort column
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order (asc/desc)
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [token, setToken] = useState(null);

  // const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
// Setup filters
const [filters, setFilters] = useState({
  sortBy: "Domain", // Default value
  order: "asc", // Default value
  search: "", // Default search term
  page: 1, // Default page
  rowsPerPage: 10, // Default number of rows per page
});
const getLocalStorageValue = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};
useEffect(() => {
  const data = getLocalStorageValue("key");
    setToken(data);
  
}, []);
// Update URL when filters change
useEffect(() => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, value);
    }
  });

  // Update the URL without reloading the page (shallow routing)
  router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });
}, [filters, router, pathname]);

  const fetchData = async () => {
    if (!token) return; // If no token, don't fetch data
    const params = {
      ...filters, // Spread current filters (this includes page, search, sortBy, etc.)
    };
  
  //  const params = new URLSearchParams();

   // Add filter values to URL parameters
  //  params.set("page", currentPage);
  //  params.set("rowsPerPage", rowsPerPage);
  //  if (search) params.set("search", search);
  //  if (sortBy) params.set("sortBy", sortBy);
  //  if (sortOrder) params.set("order", sortOrder);

  //  // Update the URL without reloading the page (shallow routing)
  //  router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });

   // Fetch data from backend
   try {
   
    // console.log("Query Params:", params);
    
    const fetchedData = await getDataLists(token, params);

    if (fetchedData?.data) {
      setData(fetchedData?.data);
      setLoading(false); // Stop loading after data is fetched

      setTotalPages(fetchedData?.totalPages);
    } else {
      console.error("Error: No data found in the response.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false); // Stop loading after data is fetched
  }
 };
  useEffect(() => {
    fetchData();
  }, [filters,token]);
// Pagination handler
const handlePageChange = (newPage) => {
  setFilters((prev) => ({ ...prev, page: newPage }));
};

// Handle search input change
// Handle search input change
const handleSearch = (e) => {
  const searchTerm = e.target.value;

  setFilters((prev) => ({
    ...prev,
    search: searchTerm, // Update search term in filters state
    page: 1, // Reset to the first page when search changes
  }));
};

// Handle sorting
const handleSort = (column) => {
  const order = filters.sortBy === column && filters.order === "asc" ? "desc" : "asc"; // Toggle order
  setFilters((prev) => ({
    ...prev,
    sortBy: column, // Set the column to sort by
    order: order,   // Set the sort order (asc/desc)
  }));
};
  // Update the URL parameters when filters change
  // useEffect(() => {
  //   const params = new URLSearchParams();

  //   // Add filter values to URL parameters
  //   params.set("page", currentPage);
  //   params.set("rowsPerPage", rowsPerPage);
  //   if (search) params.set("search", search);
  //   if (sortBy) params.set("sortBy", sortBy);
  //   if (sortOrder) params.set("order", sortOrder);

  //   // Update the URL without reloading the page (shallow routing)
  //   router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });
  // }, [currentPage, rowsPerPage, search, sortBy, sortOrder]);

//   // Fetch data from backend on filter change or page change
//   useEffect(() => {
//     // const fetchData = async () => {
//     //   try {
        
//     //     const response = await axios.get("https://interactive-data-table-application.onrender.com/api/v1/data", {
//     //       params: {
//     //         page: currentPage,
//     //         rowsPerPage,
//     //         search,
//     //         sortBy,
//     //         order: sortOrder,
//     //       },
//     //     });
//     //     setLoading(false)

//     //     // Log the response to check the data
//     //     console.log("Backend Response:", response.data);

//     //     // Ensure the response has the expected structure
//     //     if (response.data && response.data.data) {
//     //       setData(response.data.data);
//     //       setTotalPages(response.data.totalPages);
//     //     } else {
//     //       console.error("Error: Response data is not in expected format.");
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching data:", error);
//     //   }
//     // };
//    // fetchData();

//     const fetchData = async () => {
//      // Prepare query parameters
//     //  const params = {
//     //   page: currentPage,
//     //   rowsPerPage,
//     //   search,
//     //   sortBy,
//     //   order: sortOrder,
//     // };
//     const params = new URLSearchParams();

//     // Add filter values to URL parameters
//     params.set("page", currentPage);
//     params.set("rowsPerPage", rowsPerPage);
//     if (search) params.set("search", search);
//     if (sortBy) params.set("sortBy", sortBy);
//     if (sortOrder) params.set("order", sortOrder);

//     // Update the URL without reloading the page (shallow routing)
//     router.push(`${pathname}?${params.toString()}`, undefined, { shallow: true });
//       const fetchedData = await getDataLists(params);
//       console.log("Fetched Data:", fetchedData);
//  // Check if data is available
//  if (fetchedData?.data) {
//   setData(fetchedData.data); // Set the data to the state
//   setTotalPages(fetchedData.totalPages); // Set total pages for pagination
// } else {
//   console.error("Error: No data found in the response.");
// }
//     }


//     fetchData()


//   }, [currentPage, rowsPerPage, search, sortBy, sortOrder]);



// useEffect(() => {

//   fetchData();
// }, [currentPage, rowsPerPage, search, sortBy, sortOrder]);


  // Handle search input change
  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  //   setCurrentPage(1); // Reset to the first page
  // };

  // // Handle sorting
  // const handleSort = (column) => {
  //   const order = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
  //   setSortBy(column);
  //   setSortOrder(order);
  // };

  // // Handle pagination
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <PrivateRoute>
      {loading ? <Loader/> : <div className="p-8 bg-gray-100 h-screen">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Domain"
          value={filters.search || ''} // Bind input value to filters.search
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
    disabled={filters.page === 1} // Disable if it's the first page
    onClick={() => handlePageChange(filters.page - 1)} // Pass previous page number
    className="px-4 py-2 bg-blue-500 text-white w-fit rounded disabled:bg-gray-300"
  >
    Previous
  </button>
  <span>
    Page {filters.page} of {totalPages} {/* Display current page and total pages */}
  </span>
  <button
    disabled={filters.page === totalPages} // Disable if it's the last page
    onClick={() => handlePageChange(filters.page + 1)} // Pass next page number
    className="px-4 py-2 bg-blue-500 w-fit text-white rounded disabled:bg-gray-300"
  >
    Next
  </button>
</div>

    </div> }
    </PrivateRoute>
    
  );
};

export default Table;
export const dynamic = "force-dynamic"; // Ensures the page is rendered on the client
