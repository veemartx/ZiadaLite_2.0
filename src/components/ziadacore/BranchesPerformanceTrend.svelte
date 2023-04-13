<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import { chart } from "svelte-apexcharts";
    import { addCommas } from "../../scripts/js/methods";

    export let startDate;

    export let endDate;

    let performanceTrendLoading = false;

    let branches = [];

    let options;

    $: {
        if (startDate && endDate) {
            getBranchesPerformanceTrend();
        }
    }

    $: {
        if (branches.length > 1) {
            options = {
                series: branches.map((b) => {
                    return {
                        name: b.name,
                        data: b.sales.map((s) => {
                            return {
                                x: new Date(s.date).getTime(),
                                y: s.retail,
                            };
                        }),
                    };
                }),
                chart: {
                    type: "area",
                    stacked: false,
                    height: 450,
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
                },
                title: {
                    text: "Sales Trends",
                    align: "left",
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 0.3,
                        inverseColors: false,
                        opacityFrom: 0.2,
                        opacityTo: 0,
                        stops: [0, 90, 100],
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return addCommas(val / 1000, 0);
                        },
                    },
                    title: {
                        text: "Sales (Thousands)",
                    },
                    forceNiceScale: true,
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

    const getBranchesPerformanceTrend = async () => {
        performanceTrendLoading = true;

        let dt = {
            start: startDate,
            end: endDate,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getBranchesPerformanceTrend.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            performanceTrendLoading = false;

            branches = res;

            console.log(branches);
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
            <div class="titleBar">
                <div class="title">Branches Sales Trend</div>
            </div>
            <br />
            <div class="contentBar">
                {#if branches.length > 1}
                    <div use:chart={options} />
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
</style>
