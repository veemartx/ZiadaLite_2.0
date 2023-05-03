<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import { chart } from "svelte-apexcharts";
    import { addCommas } from "../../scripts/js/methods";

    export let startDate;

    export let endDate;

    export let user;

    let performanceTrendLoading = false;

    let userSales = [];

    let options;

    $: {
        if (startDate && endDate) {
            getUserSalesPerformanceTrend();
        }
    }

    $: {
        if (userSales.length > 1) {
            options = {
                colors: ["#009933", "#e60000"],
                series: [
                    {
                        name: "Sale Value",
                        data: userSales.map((s) => {
                            return {
                                x: new Date(s.date).getTime(),
                                y: s.retail,
                            };
                        }),
                    },

                    // {
                    //     name: "Cost Value",
                    //     data: userSales.map((s) => {
                    //         return {
                    //             x: new Date(s.date).getTime(),
                    //             y: s.cost,
                    //         };
                    //     }),
                    // },
                ],

                chart: {
                    type: "line",
                    stacked: false,
                    height: 450,
                    colors: ["#009933", "#ff4d4d"],
                    zoom: {
                        type: "x",
                        enabled: true,
                        autoScaleYaxis: true,
                    },
                    toolbar: {
                        autoSelected: "zoom",
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                markers: {
                    size: 2,
                    colors: ["#009933", "#ff4d4d"],
                },
                title: {
                    text: "Sales Trends",
                    align: "left",
                },
                fill: {
                    colors: ["#009933", "#ff4d4d"],
                },

                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return addCommas(val / 1000, 0);
                        },
                    },
                    title: {
                        text: "Sales/Cost (Thousands)",
                    },
                },
                xaxis: {
                    type: "datetime",
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val) {
                            return addCommas(val, 0);
                        },
                    },
                },
            };
        }
    }

    const getUserSalesPerformanceTrend = async () => {
        performanceTrendLoading = true;

        let dt = {
            start: startDate,
            end: endDate,
            user: user,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getUserPerformanceTrend.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            performanceTrendLoading = false;

            userSales = res;

            console.log(userSales);
        } catch (err) {
            performanceTrendLoading = false;
            console.log(err);
        }
    };

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <br />
            <div class="contentBar">
                {#if userSales.length > 1}
                    <div use:chart={options} />
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
</style>
