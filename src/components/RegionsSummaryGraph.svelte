<script>
    import { onMount } from "svelte";
    import { chart } from "svelte-apexcharts";

    export let stats;

    export let displayType;

    let options;

    $: {
        if (stats) {
            options = {
                series: [
                    {
                        name: "Products",
                        data: stats.map((r) => r.products),
                    },
                    {
                        name: "Short Exp",
                        data: stats.map((r) => r.shortExp),
                    },
                    {
                        name: "Dead Stock",
                        data: stats.map((r) => r.deadStock),
                    },
                ],
                chart: {
                    type: "bar",
                    height: 300,
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: "left",
                        },
                    },
                },

                colors: ["#2364cc", "#cc233f", "#d9a711"],

                fill: {
                    colors: ["#2364cc", "#cc233f", "#d9a711"],
                },

                dataLabels: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                        fontSize: "10px",
                        colors: ["#24452c"],
                    },
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ["#fff"],
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                },
                xaxis: {
                    categories: stats.map((r) => r.region),
                },
            };
        }
    }

    onMount(() => {
        // console.log(stats);

        let productsDataArray = [];
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="segment">
                <div class="chart">
                    {#if options}
                        <div use:chart={options} />
                    {/if}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        padding-top: 0.5em;
    }
</style>
