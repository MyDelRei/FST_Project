import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts'; // Import ApexCharts library

const WeeklyExpense = () => {
    // Chart configuration object
    const chartConfig = {
        series: [
            {
                name: 'Sales',
                data: [50, 40, 300, 320, 500, 350, 200],
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
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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

    // Use useEffect to render the chart when the component mounts
    useEffect(() => {
        // Initialize the chart
        const chart = new ApexCharts(document.querySelector('#bar-chart'), chartConfig);
        chart.render();

        // Cleanup: Destroy the chart when the component unmounts
        return () => {
            chart.destroy();
        };
    }, []); // Empty dependency array means it runs once on mount

    return (
        <div className="w-[700px] h-[360px] relative flex flex-col rounded-[20px] bg-white bg-clip-border text-[#1C1C26]">
            <div className="relative flex flex-col px-[25px] pt-[19px] pb-0">
                <h1 className="text-[28px] font-bold font-['Poppins']">This week</h1>
            </div>
            <div className="p-[10px]">
                <div id="bar-chart"></div>
            </div>
        </div>
    );
};

export default WeeklyExpense;