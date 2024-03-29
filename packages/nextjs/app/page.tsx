// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE
"use client";

// import Link from "next/link";
// import { Address } from "~~/components/scaffold-eth";
// import { formatEther } from "viem";
// import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ArchiveBoxXMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";
// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }
//   .flex-grow {
//     flex-grow: 1;
//   }
//   .flex-col {
//     flex-direction: column;
//   }
//   .flex-row {
//     flex-direction: row;
//   }
//   .justify-center {
//     justify-content: center;
//   }
//   .items-center {
//     align-items: center;
//   }
//   .gap-12 {
//     gap: 12px;
//   }
//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }
//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }
//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }
//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }
//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }
//   .text-center {
//     text-align: center;
//   }
//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }
//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }
//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }
//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }
//   .break-all {
//     word-wrap: break-word;
//   }
//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }
//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }
//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }
//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;
// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }
// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }
// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };
// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };
// export default Home;
//GOOD CODE

// "use client";

// import React from "react";
// import type { NextPage } from "next";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// const styles = `
//   /* Your CSS styles here */
//   .flex {
//     display: flex;
//   }

//   .flex-grow {
//     flex-grow: 1;
//   }

//   .flex-col {
//     flex-direction: column;
//   }

//   .flex-row {
//     flex-direction: row;
//   }

//   .justify-center {
//     justify-content: center;
//   }

//   .items-center {
//     align-items: center;
//   }

//   .gap-12 {
//     gap: 12px;
//   }

//   .px-8 {
//     padding-left: 8px;
//     padding-right: 8px;
//   }

//   .py-12 {
//     padding-top: 12px;
//     padding-bottom: 12px;
//   }

//   .max-w-xs {
//     max-width: 20rem; /* Adjust as needed */
//   }

//   .rounded-3xl {
//     border-radius: 1.5rem; /* Adjust as needed */
//   }

//   .bg-base-100 {
//     background-color: #dddddd; /* Adjust as needed */
//   }

//   .text-center {
//     text-align: center;
//   }

//   .h-8 {
//     height: 2rem; /* Adjust as needed */
//   }

//   .w-8 {
//     width: 2rem; /* Adjust as needed */
//   }

//   .fill-secondary {
//     fill: #888; /* Adjust as needed */
//   }

//   .link {
//     color: blue; /* Adjust as needed */
//     text-decoration: underline;
//   }

//   .break-all {
//     word-wrap: break-word;
//   }

//   .cards {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }

//   .card {
//     flex: 0 0 calc(33.33% - 16px);
//     margin: 8px;
//   }

//   @media (max-width: 768px) {
//     .card {
//       flex: 0 0 calc(50% - 16px);
//     }
//   }

//   @media (max-width: 480px) {
//     .card {
//       flex: 0 0 calc(100% - 16px);
//     }
//   }
// `;

// interface CardWithExchangeAndAddress {
//   icon: React.ReactNode;
//   exchange: string;
//   address: string;
// }

// interface CardWithExchangeAndCoinAndValue {
//   icon: React.ReactNode;
//   exchange: string;
//   coin: string;
//   value: number;
// }

// const Home: NextPage = () => {
//   return (
//     <div className="flex items-center flex-col flex-grow pt-10 justify-center">
//       {" "}
//       {/* Added justify-center class */}
//       <style>{styles}</style>
//       <div className="overflow-x-auto shadow-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="bg-primary">Address</th>
//               <th className="bg-primary">Amount of ETH in</th>
//               <th className="bg-primary">Amount of Balloons out</th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//       <div className="px-5"></div>
//       <div className="flex-grow w-full mt-16 px-8 py-12">
//         <div className="cards">
//           {/* Cards with exchange and coin */}
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithEA
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             address="0x473548591500E2b474828aAfB159Df49b4a4632F"
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="UniSwap"
//             coin="Shiba"
//             value={100}
//           />
//           <CardWithECV
//             icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
//             exchange="SushiSwap"
//             coin="WETH"
//             value={100}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} :
//         <br />
//         <span className="break-all">{address}</span>
//       </p>
//     </div>
//   );
// };

// const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
//   return (
//     <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
//       {icon}
//       <p className="mt-4">
//         {exchange} : {coin} : {value}
//       </p>
//     </div>
//   );
// };

// export default Home;

//GOOD CODE

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

interface CardWithExchangeAndAddress {
  icon: React.ReactNode;
  exchange: string;
  address: string;
}

interface CardWithExchangeAndCoinAndValue {
  icon: React.ReactNode;
  exchange: string;
  coin: string;
  value: number;
}

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching transactions...");
        const validAddress = ethers.utils.isAddress(connectedAddress as string) ? connectedAddress : "";
        if (!validAddress) {
          console.error("Error: Invalid Ethereum address format");
          return;
        }

        const response = await axios.get(
          `https://api.etherscan.io/api?module=account&action=txlist&address=0x1AB4973a48dc892Cd9971ECE8e01DcC7688f8F23&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
        );
        const result = response.data.result;

        if (Array.isArray(result)) {
          // setTransactions(result);
          console.log("DA");
        } else {
          console.error("Received data is not an array:", result);
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [connectedAddress]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const transactionsPerPage = 10;
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentPageTransactions = transactions.slice(startIndex, endIndex);
  return (
    <div className="flex items-center flex-col flex-grow pt-10 justify-center">
      {/* Your JSX code here */}
      <style>{styles}</style>
      <div className="overflow-x-auto shadow-lg">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="bg-primary">From</th>
                <th className="bg-primary">To</th>
                <th className="bg-primary">Value</th>
                <th className="bg-primary">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {currentPageTransactions.length > 0 ? (
                currentPageTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      {/* {transaction.from} */}
                      {"DA"}
                    </td>
                    <td className="text-center">
                      {/* {transaction.to} */}
                      {"DA"}
                    </td>
                    <td className="text-center">
                      {/* {transaction.value} */}
                      {"DA"}
                    </td>
                    <td className="text-center">
                      {/* {transaction.timeStamp} */}
                      {"DA"}
                    </td>
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
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-page">Page {currentPage}</span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPageTransactions.length < transactionsPerPage}
        >
          Next
        </button>
      </div>
      <div className="px-5"></div>
      <div className="flex-grow w-full mt-16 px-8 py-12">
        <div className="cards">
          {/* Cards with exchange and coin */}
          <CardWithEA
            icon={<ArchiveBoxXMarkIcon className="h-12 w-12 fill-secondary" />}
            exchange="UniSwap"
            address="0x473548591500E2b474828aAfB159Df49b4a4632F"
          />
          <CardWithEA
            icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
            exchange="SushiSwap"
            address="0x473548591500E2b474828aAfB159Df49b4a4632F"
          />
          <CardWithECV
            icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
            exchange="UniSwap"
            coin="Shiba"
            value={100}
          />
          <CardWithECV
            icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
            exchange="SushiSwap"
            coin="WETH"
            value={100}
          />
          <CardWithECV
            icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
            exchange="UniSwap"
            coin="Shiba"
            value={100}
          />
          <CardWithECV
            icon={<MagnifyingGlassIcon className="h-12 w-12 fill-secondary" />}
            exchange="SushiSwap"
            coin="WETH"
            value={100}
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        {/* <button className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md" onClick={runBotScript}>
          Run bot.js
        </button>
        <button className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md" onClick={runManipulateScript}>
          Run manipulate.js
        </button> */}
      </div>
    </div>
  );
};

const CardWithEA: React.FC<CardWithExchangeAndAddress> = ({ icon, exchange, address }) => {
  return (
    <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
      {icon}
      <p className="mt-4">
        {exchange} :
        <br />
        <span className="break-all">{address}</span>
      </p>
    </div>
  );
};

const CardWithECV: React.FC<CardWithExchangeAndCoinAndValue> = ({ icon, exchange, coin, value }) => {
  return (
    <div className="card bg-base-100 px-5 py-8 text-center items-center max-w-xs rounded-xl">
      {icon}
      <p className="mt-4">
        {exchange} : {coin} : {value}
      </p>
    </div>
  );
};

export default Home;
