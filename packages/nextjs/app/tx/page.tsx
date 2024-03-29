"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

dotenv.config();

const styles = `
  /* Your CSS styles here */
  .flex {
    display: flex;
  }

  .flex-grow {
    flex-grow: 1;
  }

  .flex-col {
    flex-direction: column;
  }

  .flex-row {
    flex-direction: row;
  }

  .justify-center {
    justify-content: center;
  }

  .items-center {
    align-items: center;
  }

  .gap-12 {
    gap: 12px;
  }

  .px-8 {
    padding-left: 8px;
    padding-right: 8px;
  }

  .py-12 {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .max-w-xs {
    max-width: 20rem; /* Adjust as needed */
  }

  .rounded-3xl {
    border-radius: 1.5rem; /* Adjust as needed */
  }

  .bg-base-100 {
    background-color: #dddddd; /* Adjust as needed */
  }

  .text-center {
    text-align: center;
  }

  .h-8 {
    height: 2rem; /* Adjust as needed */
  }

  .w-8 {
    width: 2rem; /* Adjust as needed */
  }

  .fill-secondary {
    fill: #888; /* Adjust as needed */
  }

  .link {
    color: blue; /* Adjust as needed */
    text-decoration: underline;
  }

  .break-all {
    word-wrap: break-word;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .card {
    flex: 0 0 calc(33.33% - 16px);
    margin: 8px;
  }

  .pagination-button {
    border: 1px solid #000;
    padding: 5px 10px;
    margin: 0 5px; /* Adjust as needed */
  }
  
  .pagination-page {
    padding: 5px 10px;
  }

  .title{
    text-align: center;
  }

  @media (max-width: 768px) {
    .card {
      flex: 0 0 calc(50% - 16px);
    }
  }

  @media (max-width: 480px) {
    .card {
      flex: 0 0 calc(100% - 16px);
    }
  }
`;

interface Transaction {
  from: string;
  to: string;
  value: string;
  timeStamp: string;
}

const Tx: NextPage = () => {
  const UNISWAP_WALLET = "0x811beEd0119b4AfCE20D2583EB608C6F7AF1954f";
  const SUSHISWAP_WALLET = "0x24D3dD4a62e29770cf98810b09F89D3A90279E7a";

  const { address: connectedAddress } = useAccount();
  // State for first table
  const [transactions1, setTransactions1] = useState<Transaction[]>([]);
  const [loading1, setLoading1] = useState(true);
  const [currentPage1, setCurrentPage1] = useState(1);

  // State for second table
  const [transactions2, setTransactions2] = useState<Transaction[]>([]);
  const [loading2, setLoading2] = useState(true);
  const [currentPage2, setCurrentPage2] = useState(1);

  const [isFinished1, setIsFinished1] = useState(false);

  const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    const getData = async () => {
      await fetchData1();
    };

    if (connectedAddress) getData();
  }, [connectedAddress]); // Fetch data when connectedAddress changes

  useEffect(() => {
    const getData = async () => {
      await delay(5000);
      await fetchData2();
    };

    if (connectedAddress && isFinished1) {
      getData();
    }
  }, [connectedAddress, isFinished1]);

  // Function to fetch data for first table
  const fetchData1 = async () => {
    try {
      setLoading1(true);
      // Fetch data for the first table
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${UNISWAP_WALLET}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
      );
      const result = response.data.result;
      if (Array.isArray(result)) {
        setTransactions1(result as any);
      } else {
        console.error("Received data is not an array:", result);
        setTransactions1([]);
      }
    } catch (error) {
      console.error("Error fetching transactions for table 1:", error);
      setTransactions1([]);
    } finally {
      setIsFinished1(true);
      setLoading1(false);
    }
  };

  // Function to fetch data for second table
  const fetchData2 = async () => {
    try {
      setLoading2(true);
      // Fetch data for the second table
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${SUSHISWAP_WALLET}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
      );
      const result = response.data.result;
      if (Array.isArray(result)) {
        setTransactions2(result as any);
      } else {
        console.error("Received data is not an array:", result);
        setTransactions2([]);
      }
    } catch (error) {
      console.error("Error fetching transactions for table 2:", error);
      setTransactions2([]);
    } finally {
      setLoading2(false);
    }
  };

  // Function to handle pagination for the first table
  const handlePageChange1 = (pageNumber: number) => {
    setCurrentPage1(pageNumber);
  };

  // Function to handle pagination for the second table
  const handlePageChange2 = (pageNumber: number) => {
    setCurrentPage2(pageNumber);
  };

  const transactionsPerPage = 10;
  const startIndex1 = (currentPage1 - 1) * transactionsPerPage;
  const endIndex1 = startIndex1 + transactionsPerPage;
  const currentPageTransactions1 = transactions1.slice(startIndex1, endIndex1);

  // Calculate which transactions to display for the second table
  const startIndex2 = (currentPage2 - 1) * transactionsPerPage;
  const endIndex2 = startIndex2 + transactionsPerPage;
  const currentPageTransactions2 = transactions2.slice(startIndex2, endIndex2);

  return (
    <div className="flex items-center flex-col flex-grow pt-10 justify-center">
      <div className="flex justify-between">
        <div className="column" style={{ marginBottom: 20 }}>
          <div className="overflow-x-auto shadow-lg">
            <p className="title">DEX Liquidity Pool</p>
            {loading1 ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-zebra w-full" style={{ fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    <th className="bg-primary">Name</th>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">WETH</th>
                    <th className="bg-primary">Shiba</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>UniSwap</td>
                    <td>0x811beEd0119b4AfCE20D2583EB608C6F7AF1954f</td>
                    <td>100</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>SushiSwap</td>
                    <td>0x24D3dD4a62e29770cf98810b09F89D3A90279E7a</td>
                    <td>100</td>
                    <td>100</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="px-5"></div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="column">
          <style>{styles}</style>
          <div className="overflow-x-auto shadow-lg" style={{ maxWidth: "600px" }}>
            <p className="title">UNISWAP Transactions Table</p>
            {loading1 ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-zebra w-full" style={{ fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    <th className="bg-primary">From</th>
                    <th className="bg-primary">To</th>
                    <th className="bg-primary">Value</th>
                    <th className="bg-primary">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageTransactions1.length > 0 ? (
                    currentPageTransactions1.map((transaction, index) => (
                      <tr key={index}>
                        <td className="text-center">{transaction.from}</td>
                        <td className="text-center">{transaction.to}</td>
                        <td className="text-center">{transaction.value}</td>
                        <td className="text-center">{transaction.timeStamp}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="px-5"></div>

          <div className="flex justify-center mt-8">
            {/* Pagination */}
            <button
              className="pagination-button"
              onClick={() => handlePageChange1(currentPage1 - 1)}
              disabled={currentPage1 === 1}
            >
              Previous
            </button>
            <span className="pagination-page">Page {currentPage1}</span>
            <button
              className="pagination-button"
              onClick={() => handlePageChange1(currentPage1 + 1)}
              disabled={currentPageTransactions1.length < transactionsPerPage}
            >
              Next
            </button>
          </div>
        </div>

        {/* Second column */}
        <div className="column" style={{ marginLeft: "20px" }}>
          <style>{styles}</style>
          <div className="overflow-x-auto shadow-lg" style={{ maxWidth: "600px" }}>
            <p className="title">SUSHISWAP Transactions Table</p>
            {loading2 ? (
              <p>Loading...</p>
            ) : (
              <table className="table table-zebra w-full" style={{ fontSize: "0.8rem" }}>
                <thead>
                  <tr>
                    <th className="bg-primary">From</th>
                    <th className="bg-primary">To</th>
                    <th className="bg-primary">Value</th>
                    <th className="bg-primary">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageTransactions2.length > 0 ? (
                    currentPageTransactions2.map((transaction, index) => (
                      <tr key={index}>
                        <td className="text-center">{transaction.from}</td>
                        <td className="text-center">{transaction.to}</td>
                        <td className="text-center">{transaction.value}</td>
                        <td className="text-center">{transaction.timeStamp}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="px-5"></div>

          <div className="flex justify-center mt-8">
            {/* Pagination */}
            <button
              className="pagination-button"
              onClick={() => handlePageChange2(currentPage2 - 1)}
              disabled={currentPage2 === 1}
            >
              Previous
            </button>
            <span className="pagination-page">Page {currentPage2}</span>
            <button
              className="pagination-button"
              onClick={() => handlePageChange2(currentPage2 + 1)}
              disabled={currentPageTransactions2.length < transactionsPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tx;
