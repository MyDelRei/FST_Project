import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';

const WeeklyExpense = () => {
    const [weeklyData, setWeeklyData] = useState({
        weekly_spending: [0, 0, 0, 0, 0, 0, 0],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    });

    useEffect(() => {
        const fetchWeeklyData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/transactions/state/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setWeeklyData(response.data);
            } catch (err) {
                console.error('Error fetching weekly spending:', err);
            }
        };
        fetchWeeklyData();
    }, []);

    const chartConfig = {
        series: [
            {
                name: 'Spending',
                data: weeklyData.weekly_spending,
            },
        ],
        chart: {
            type: 'bar',
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
        colors: ['#34A0EB'],
        plotOptions: {
            bar: {
                columnWidth: '30%',
                borderRadius: 2,
            },
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
            categories: weeklyData.days,
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#616161',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    fontWeight: 400,
                },
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
        },
    };

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector('#bar-chart'), chartConfig);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [weeklyData]); // Re-render chart when weeklyData changes

    return (
        <div className="w-[700px] h-[360px] relative flex flex-col rounded-[20px] bg-white bg-clip-border text-[#1C1C26]">
            <div className="relative flex flex-col px-[25px] pt-[19px] pb-0">
                <h1 className="text-[28px] font-bold font-['Poppins']">This Week's Spending</h1>
            </div>
            <div className="p-[10px]">
                <div id="bar-chart"></div>
            </div>
        </div>
    );
};

export default WeeklyExpense;