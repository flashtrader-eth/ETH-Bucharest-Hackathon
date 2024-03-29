"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ArrowPathIcon, BugAntIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [isBotRunning, setIsBotRunning] = useState(false);
  const [isManipulateRunning, setIsManipulateRunning] = useState(false);
  const handleStartBot = async () => {
    try {
      const response = await fetch("/api/startBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.message); // Log the response message
      // Optionally, handle the response in the UI, such as displaying a success message
    } catch (error) {
      console.error("Failed to start the bot:", error);
      // Handle the error in the UI
    }
    setIsBotRunning(true);
  };

  const handleStartManipulate = async () => {
    try {
      const response = await fetch("/api/startManipulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.message); // Log the response message
      // Optionally, handle the response in the UI
    } catch (error) {
      console.error("Failed to start manipulation:", error);
      // Handle the error in the UI
    }
    setIsManipulateRunning(true);
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <p className="text-center text-lg">
            Get started by running{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              Arbitrage Bot
            </code>
          </p>
          <p className="text-center text-lg">
            Then run{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              Manipulate
            </code>{" "}
            to unbalance the{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              Uniswap DEX
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {isBotRunning ? (
                <div className="flex justify-center items-center mt-2">
                  <span className="loading loading-spinner loading"></span>
                </div>
              ) : (
                <button onClick={handleStartBot}>
                  <ArrowPathIcon className="h-8 w-8 fill-secondary" />
                </button>
              )}
              <p>
                Start the{" "}
                <Link href="/" passHref className="link">
                  Arbitrage Bot
                </Link>{" "}
                and check for opportunities.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {isManipulateRunning ? (
                <div className="flex justify-center items-center mt-2">
                  <span className="loading loading-spinner loading"></span>
                </div>
              ) : (
                <button onClick={handleStartManipulate}>
                  <BugAntIcon className="h-8 w-8 fill-secondary" />
                </button>
              )}
              <p>
                Manipulate the{" "}
                <Link href="/" passHref className="link">
                  Uniswap DEX
                </Link>{" "}
                to inject over 4B SHIB tokens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
