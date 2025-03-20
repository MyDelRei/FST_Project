import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const MonthlyInvesmentChart = () => {
    const chartConfig = {
        series: [
            {
                name: 'Sales',
                data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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
            categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        const chartElement = document.querySelector('#line-chart');
        if (chartElement) {
            const chart = new ApexCharts(chartElement, chartConfig);
            chart.render();
            return () => {
                chart.destroy();
            };
        }
    }, []);

    return (
        <div className="relative flex flex-col rounded-[20px] bg-white bg-clip-border text-gray-700  w-[510px] h-[340px]">
            <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden bg-transparent bg-clip-border text-gray-700  md:flex-row md:items-center">
                <h1 className="text-[28px] font-bold font-['Poppins'] px-[10px]">Monthly Invesment</h1>
            </div>
            <div className="p-[10px] flex-1">
                <div id="line-chart" className="w-full h-full"></div>
            </div>
        </div>
    );
};

export default MonthlyInvesmentChart;