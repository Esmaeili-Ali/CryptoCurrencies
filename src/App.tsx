import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-daisyui";
export type Crypto = {
  ath: number;
  atl: number;
  current_price: number;
  id: string;
  name: string;
  symbol: string;
  high_24h: number;
  low_24h: number;
};
const App = () => {
  const [cryptos, getCryptos] = useState<Crypto[] | null>();
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    axios.get(url).then((res) => {
      return getCryptos(res.data);
    });
  }, []);
  return (
    <div className="overflow-x-auto">
      <Table zebra>
        <Table.Head>
          <span>Name</span>
          <span>Symbol</span>
          <span>Current Price</span>
          <span>At Highest</span>
        </Table.Head>

        <Table.Body>
          {cryptos
            ? cryptos.map((crypto) => {
                return (
                  <Table.Row>
                    <span>{crypto.name}</span>
                    <span>{crypto.symbol}</span>
                    <span>{crypto.current_price + "$"}</span>
                    <span>{crypto.ath + "$"}</span>
                  </Table.Row>
                );
              })
            : null}
        </Table.Body>
      </Table>
    </div>
  );
};

export default App;
