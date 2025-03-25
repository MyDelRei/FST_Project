import React, { useState, useEffect } from 'react';

const StockPriceTracker = () => {
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const stocks = ['NFLX', 'TSLA', 'AAPL', 'MSFT', 'GOOGL']; // Netflix, Tesla, Apple, Microsoft, Google

    const fetchStockPrices = async () => {
        try {
            const response = await fetch(
                `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stocks.join(',')}`
            );
            const data = await response.json();
            console.log('API Response:', data); // Debug: Check response in console
            if (data.quoteResponse && data.quoteResponse.result) {
                const formattedData = {};
                data.quoteResponse.result.forEach(stock => {
                    formattedData[stock.symbol] = {
                        price: stock.regularMarketPrice,
                        changePercent: stock.regularMarketChangePercent,
                    };
                });
                setStockData(formattedData);
                setLoading(false);
            } else {
                throw new Error('No stock data available');
            }
        } catch (err) {
            setError(`Failed to fetch stock prices: ${err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockPrices();
        const interval = setInterval(fetchStockPrices, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price) => price.toLocaleString(undefined, { maximumFractionDigits: 2 });
    const formatChange = (change) => change.toFixed(2);

    if (loading) return <div className="flex items-center justify-center h-[260px] w-[510px] bg-white rounded-[20px]">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-[260px] w-[510px] bg-white rounded-[20px] text-red-500">{error}</div>;

    return (
        <div className="w-[510px] h-[260px] bg-white rounded-[20px] p-4 overflow-y-scroll scrollbar-none">
            <h2 className="text-lg font-bold text-center mb-4">Stock Prices</h2>
            <table className="w-full bg-transparent">
                <thead>
                <tr className="text-center">
                    <th className="py-2 text-sm font-semibold text-gray-600">No</th>
                    <th className="py-2 text-sm font-semibold text-gray-600">Symbol</th>
                    <th className="py-2 text-sm font-semibold text-gray-600">Price (USD)</th>
                    <th className="py-2 text-sm font-semibold text-gray-600">Change (%)</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map((stock, index) => (
                    stockData[stock] && (
                        <tr key={stock} className="text-center">
                            <td className="py-2 text-sm font-semibold text-gray-600">
                                {String(index + 1).padStart(2, '0')}
                            </td>
                            <td className="py-2 text-sm font-semibold">
                                {stock}
                            </td>
                            <td className="py-2 text-lg font-medium">
                                ${formatPrice(stockData[stock].price)}
                            </td>
                            <td
                                className={`py-2 text-sm ${
                                    stockData[stock].changePercent > 0 ? 'text-green-500' : 'text-red-500'
                                }`}
                            >
                                {formatChange(stockData[stock].changePercent)}%
                            </td>
                        </tr>
                    )
                ))}
                </tbody>
            </table>
            <p className="text-xs text-gray-500 text-center mt-4">
                Last updated: {new Date().toLocaleTimeString()}
            </p>
        </div>
    );
};

export default StockPriceTracker;