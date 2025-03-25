import React, { useState, useEffect } from 'react';

const CryptoPriceTracker = () => {
    const [cryptoData, setCryptoData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cryptoIds = ['bitcoin', 'ethereum', 'binancecoin', 'ripple', 'cardano','solana', 'dogecoin', 'polkadot', 'chainlink', 'avalanche-2'];

    const fetchCryptoPrices = async () => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds.join(',')}&vs_currencies=usd&include_24hr_change=true`
            );
            const data = await response.json();
            setCryptoData(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch crypto prices');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoPrices();
        const interval = setInterval(fetchCryptoPrices, 300000); // Keeping 30s as original
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="flex items-center justify-center h-[260px] w-[510px] bg-white rounded-[20px]">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-[260px] w-[510px] bg-white rounded-[20px] text-red-500">{error}</div>;

    return (
        <div className="no-scrollbar w-[510px] h-[510px] bg-white rounded-[20px] p-4 overflow-y-scroll scrollbar-none">
            <h2 className="text-lg font-bold text-left mb-4">Crypto Prices</h2>
            <table className="w-full bg-transparent">
                <thead>
                <tr className="text-center">
                    <th className="py-2 text-sm font-semibold text-gray-600">Sl No</th>
                    <th className="py-2 text-sm font-semibold text-gray-600">Name</th>
                    <th className="py-2 text-sm font-semibold text-gray-600">Price</th>
                    <th className="py-2 text-sm font-semibold text-gray-600">24h Change</th>
                </tr>
                </thead>
                <tbody>
                {cryptoIds.map((crypto, index) => (
                    cryptoData[crypto] && (
                        <tr key={crypto} className="text-center">
                            <td className="py-2 text-sm font-semibold text-gray-600">
                                {String(index + 1).padStart(2, '0')}
                            </td>
                            <td className="py-2 text-sm font-medium">
                                {crypto.charAt(0).toUpperCase() + crypto.slice(1)}
                            </td>
                            <td className="py-2 text-sm font-medium">
                                ${cryptoData[crypto].usd.toLocaleString()}
                            </td>
                            <td
                                className={`py-2 text-sm ${
                                    cryptoData[crypto].usd_24h_change > 0
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            >
                                24h: {cryptoData[crypto].usd_24h_change.toFixed(2)}%
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

export default CryptoPriceTracker;