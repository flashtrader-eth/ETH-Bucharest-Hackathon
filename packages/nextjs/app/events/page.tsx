"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Events: NextPage = () => {
  const { data: tradeExecuted, isLoading: isTradeExecutedLoading } = useScaffoldEventHistory({
    contractName: "FlashLoan",
    eventName: "TradeExecuted",
    fromBlock: 0n,
  });

  const { data: loanedReturned, isLoading: isLoanedReturnedEventsLoading } = useScaffoldEventHistory({
    contractName: "FlashLoan",
    eventName: "LoanedReturned",
    fromBlock: 0n,
  });

  const { data: swappedOnUniswap, isLoading: isSwappedOnUniswapEventsLoading } = useScaffoldEventHistory({
    contractName: "FlashLoan",
    eventName: "SwappedOnUniswap",
    fromBlock: 0n,
  });

  const { data: swappedOnSushiswap, isLoading: isSwappedOnSushiswapEventsLoading } = useScaffoldEventHistory({
    contractName: "FlashLoan",
    eventName: "SwappedOnSushiswap",
    fromBlock: 5490887n,
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {isTradeExecutedLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Trade Execute Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Sender</th>
                    <th className="bg-primary">Token</th>
                    <th className="bg-primary">Loan Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {!tradeExecuted || tradeExecuted.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    tradeExecuted?.map((event, index) => {
                      console.log(event.args, "@@@args");
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.sender} />
                          </td>
                          <td>{event.args.token}</td>
                          <td>{parseFloat(formatEther(event.args.amount as bigint)).toFixed(4)} WETH</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLoanedReturnedEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Loaned Returned Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Sender</th>
                    <th className="bg-primary">Token</th>
                    <th className="bg-primary">Returned Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {!loanedReturned || loanedReturned.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    loanedReturned?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.sender} />
                          </td>
                          <td>{event.args.token}</td>
                          <td>{parseFloat(formatEther(event.args.amount as bigint)).toFixed(4)} WETH</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isSwappedOnUniswapEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Swapped On Uniswap Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Token In</th>
                    <th className="bg-primary">Token Out</th>
                    <th className="bg-primary">Amount In</th>
                    <th className="bg-primary">Amount Out</th>
                  </tr>
                </thead>
                <tbody>
                  {!swappedOnUniswap || swappedOnUniswap.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    swappedOnUniswap?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.path0} />
                          </td>
                          <td className="text-center">
                            <Address address={event.args.path1} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.amountIn as bigint)).toFixed(4)} WETH</td>
                          <td>{parseFloat(formatEther(event.args.amountOut as bigint)).toFixed(4)} SHIB</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isSwappedOnSushiswapEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Swapped On Sushiswap Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Token In</th>
                    <th className="bg-primary">Token Out</th>
                    <th className="bg-primary">Amount In</th>
                    <th className="bg-primary">Amount Out</th>
                  </tr>
                </thead>
                <tbody>
                  {!swappedOnSushiswap || swappedOnSushiswap.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    swappedOnSushiswap?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.path0} />
                          </td>
                          <td className="text-center">
                            <Address address={event.args.path1} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.amountIn as bigint)).toFixed(4)} SHIB</td>
                          <td>{parseFloat(formatEther(event.args.amountOut as bigint)).toFixed(4)} WETH</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Events;
