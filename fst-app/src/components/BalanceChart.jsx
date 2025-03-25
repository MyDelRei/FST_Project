import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';

const BalanceChart = () => {
    // Function to generate the last 6 months dynamically
    const getLastSixMonths = () => {
        const today = new Date(); // Current date (e.g., March 25, 2025)
        const months = [];
        const balances = Array(6).fill(0); // Placeholder balances

        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthName = date.toLocaleString('default', { month: 'short' }); // e.g., "Oct"
            months.push(monthName);
        }

        return { months, balances };
    };

    const [balanceData, setBalanceData] = useState(getLastSixMonths());

    useEffect(() => {
        const fetchBalanceData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/balance/state/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setBalanceData(response.data);
            } catch (err) {
                console.error('Error fetching balance data:', err);
            }
        };
        fetchBalanceData();
    }, []);

    const chartConfig = {
        series: [
            {
                name: 'Balance',
                data: balanceData.monthly_balances,
            },
        ],
        chart: {
            type: 'line',
            height: 240,
            toolbar: {
                show: false,
            },
        },
        title: {
            show: '',
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#8B6FF3'],
        stroke: {
            lineCap: 'round',
            curve: 'smooth',
        },
        markers: {
            size: 0,
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#616161',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    fontWeight: 400,
                },
            },
            categories: balanceData.months,
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#616161',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    fontWeight: 400,
                },
                formatter: (value) => `$${value.toFixed(2)}`,
            },
        },
        grid: {
            show: true,
            borderColor: '#dddddd',
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: (value) => `$${value.toFixed(2)}`,
            },
        },
    };

    useEffect(() => {
        const chartElement = document.querySelector('#line-chart');
        if (chartElement) {
            const chart = new ApexCharts(chartElement, chartConfig);
            chart.render();
            return () => {
                chart.destroy();
            };
        }
    }, [balanceData]);

    return (
        <div className="relative flex flex-col rounded-[20px] bg-white bg-clip-border text-gray-700 w-[510px] h-[340px]">
            <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden bg-transparent bg-clip-border text-gray-700 md:flex-row md:items-center">
                <h1 className="text-[28px] font-bold font-['Poppins'] px-[10px]">Balance History</h1>
            </div>
            <div className="p-[10px] flex-1">
                <div id="line-chart" className="w-full h-full"></div>
            </div>
        </div>
    );
};

export default BalanceChart;