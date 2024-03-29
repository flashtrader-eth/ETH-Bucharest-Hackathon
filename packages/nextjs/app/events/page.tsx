"use client";

import type { NextPage } from "next";
// import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Events: NextPage = () => {
  const { data: tradeExecuted, isLoading: isTradeExecutedLoading } = useScaffoldEventHistory({
    contractName: "FlashLoan",
    eventName: "TradeExecuted",
    fromBlock: 5490887n,
  });

  //   const { data: loanedReturned, isLoading: isLoanedReturnedEventsLoading } = useScaffoldEventHistory({
  //     contractName: "FlashLoan",
  //     eventName: "LoanedReturned",
  //     fromBlock: 5490887n,
  //   });

  //   const { data: swappedOnUniswap, isLoading: isSwappedOnUniswapEventsLoading } = useScaffoldEventHistory({
  //     contractName: "FlashLoan",
  //     eventName: "SwappedOnUniswap",
  //     fromBlock: 5490887n,
  //   });

  //   const { data: swappedOnSushiswap, isLoading: isSwappedOnSushiswapEventsLoading } = useScaffoldEventHistory({
  //     contractName: "FlashLoan",
  //     eventName: "SwappedOnSushiswap",
  //     fromBlock: 5490887n,
  //   });

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
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.sender} />
                          </td>
                          <td>{event.args.token}</td>
                          {/* <td>{parseFloat(formatEther(event.args.amount)).toFixed(4)}</td> */}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* {isTokenToEthEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Balloons To ETH Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount of Balloons In</th>
                    <th className="bg-primary">Amount of ETH Out</th>
                  </tr>
                </thead>
                <tbody>
                  {!tokenToEthEvents || tokenToEthEvents.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    tokenToEthEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.swapper} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.tokensInput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.ethOutput)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLiquidityApprovedEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Liquidity Approved Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Owner</th>
                    <th className="bg-primary">Spender</th>
                    <th className="bg-primary">Liquidity Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {!liquidityApprovedEvents || liquidityApprovedEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    liquidityApprovedEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.owner} />
                          </td>
                          <td className="text-center">
                            <Address address={event.args.spender} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.value)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLiquidityProvidedEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Liquidity Provided Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount of ETH In</th>
                    <th className="bg-primary">Amount of Balloons In</th>
                    <th className="bg-primary">Liquidity Minted</th>
                  </tr>
                </thead>
                <tbody>
                  {!liquidityProvidedEvents || liquidityProvidedEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    liquidityProvidedEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.liquidityProvider} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.ethInput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.tokensInput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.liquidityMinted)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isLiquidityRemovedEventsLoading ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="mt-8 mb-8">
            <div className="text-center mb-4">
              <span className="block text-2xl font-bold">Liquidity Removed Events</span>
            </div>
            <div className="overflow-x-auto shadow-lg mb-5">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="bg-primary">Address</th>
                    <th className="bg-primary">Amount of ETH Out</th>
                    <th className="bg-primary">Amount of Balloons Out</th>
                    <th className="bg-primary">Liquidity Withdrawn</th>
                  </tr>
                </thead>
                <tbody>
                  {!liquidityRemovedEvents || liquidityRemovedEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    liquidityRemovedEvents?.map((event, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <Address address={event.args.liquidityRemover} />
                          </td>
                          <td>{parseFloat(formatEther(event.args.ethOutput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.tokensOutput)).toFixed(4)}</td>
                          <td>{parseFloat(formatEther(event.args.liquidityWithdrawn)).toFixed(4)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div> */}
        {/* </div> */}
        {/* )} */}
      </div>
    </>
  );
};

export default Events;
