<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import { chart } from "svelte-apexcharts";
    import { addCommas } from "../../scripts/js/methods";

    export let startDate;

    export let endDate;

    export let currentlyFilteredBranch;

    let performanceTrendLoading = false;

    let branchSales = [];

    let options;

    $: {
        if (startDate && endDate) {
            getbranchSalesPerformanceTrend();
        }
    }

    $: {
        if (branchSales.length > 1) {
            options = {
                colors: ["#009933", "#e60000"],
                series: [
                    {
                        name: "Sale Value",
                        data: branchSales.map((s) => {
                            return {
                                x: new Date(s.date).getTime(),
                                y: s.retail,
                            };
                        }),
                    },

                    {
                        name: "Cost Value",
                        data: branchSales.map((s) => {
                            return {
                                x: new Date(s.date).getTime(),
                                y: s.cost,
                            };
                        }),
                    },
                ],

                chart: {
                    type: "area",
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
                    text: "Branch Sales Trends",
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

    const getbranchSalesPerformanceTrend = async () => {
        performanceTrendLoading = true;

        let dt = {
            start: startDate,
            end: endDate,
            branch: currentlyFilteredBranch,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getBranchPerformanceTrend.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            performanceTrendLoading = false;

            branchSales = res;

            console.log(branchSales);
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
                {#if branchSales.length > 1}
                    <div use:chart={options} />
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
</style>
