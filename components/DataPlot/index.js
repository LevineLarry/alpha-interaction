import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DataPlot = ({title, series, unit}) => {
    const options = {
        chart: {
            id: "Acceleration"
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true,
            borderColor: '#1e3654'
        },
        stroke: {
            show: true,
            width: 1
        },
        xaxis: {
            tickAmount: 10,
            labels: {
                show: true,
                style: {
                    colors: "#5989C1",
                    fontSize: "1.75vh"
                }
            },
            title: {
                text: "Time (s)",
                style: {
                    color: "#5989C1",
                    fontSize: "15px"
                }
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#5989C1",
                    fontSize: "1.75vh"
                },
                formatter: function(value) {
                    return value.toLocaleString("en-us", {minimumFractionDigits: 2})
                }
            },
            title: {
                text: title + ` (${unit})`,
                rotate: -90,
                style: {
                    color: "#5989C1",
                    fontSize: "15px"
                }
            }
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            x: {
                formatter: function(val) {
                    return "T+" + val + "s"
                }
            },
            y: {
                formatter: function(val) {
                    return val + unit
                }
            }
        }
    }

    return (
        <div className="flex flex-col gap-5 chart-card-bg p-5 rounded-2xl">
            <p className="font-[Audiowide] text-3xl text-[#96C6FF]">{title}</p>
            <Chart
                options={options}
                series={series}
                type="area"
            />
        </div>
    )
}

export default DataPlot