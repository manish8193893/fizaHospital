// ComboChart.tsx

import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    type ChartOptions,
    type ChartData,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

import '../styles/ComboChart.css';

/* -------------------------------------------------------------------------- */
/*                             CHART REGISTRATION                             */
/* -------------------------------------------------------------------------- */

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

const ComboChart: React.FC = () => {
    const labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const data: ChartData<'bar' | 'line'> = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Patient',
                // data: [39, 27, 33, 23, 37, 31, 39],
                data: [42, 30, 36, 26, 40, 34, 42],

                borderColor: '#5E72E4',
                borderWidth: 3,
                tension: 0.4,
                fill: false,

                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#5E72E4',
                pointBorderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7,
            },

            {
                type: 'bar',
                label: 'Appointment',
                data: [42, 30, 36, 26, 40, 34, 42],

                backgroundColor: '#FFB156',
                borderRadius: {
                    topLeft: 5,
                    topRight: 5,
                    bottomLeft: 0,
                    bottomRight: 0,
                },
                borderSkipped: false,
                barThickness: 26,
            },
        ],
    };

    const options: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                padding: 12,
                cornerRadius: 10,
                backgroundColor: '#111827',
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                    // drawBorder: false,
                },

                border: {
                    display: false,
                },

                ticks: {
                    color: '#98A2B3',
                    font: {
                        size: 13,
                        weight: 500,
                    },
                },
            },

            y: {
                min: 10,
                max: 50,

                grid: {
                    color: '#EEF2F6',
                    // drawBorder: false,
                },

                border: {
                    display: false,
                },

                ticks: {
                    stepSize: 10,
                    color: '#98A2B3',

                    font: {
                        size: 13,
                    },
                },
            },
        },
    };

    return (
        <div className="combo-chart-card mt-5">
            <div className="d-flex justify-content-between mb-4">
                <div className='d-flex flex-column'>
                    <span className='fs-16 fw-600 pb-1'>Patients</span>
                    <span className='text-muted fw-500 fs-12'>Total Number of Patients is 2556</span>
                </div>
                <div style={{ maxWidth: "fit-content" }}>
                    <select className="custom-week-select">
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>This Year</option>
                        <option>Next Month</option>
                        <option>Next Week</option>
                    </select>
                </div>
            </div>

            <div className="combo-chart-wrapper">
                <Chart type="bar" data={data} options={options} />
            </div>
        </div>
    );
};

export default ComboChart;