<script>
    import { chart } from "svelte-apexcharts";
    import { onMount } from "svelte";
    import { addCommas } from "../../../scripts/js/methods";

    export let branches = [];

    let data = [];

    let options;

    $: {
        if (branches.length > 1) {
            data = branches;

            options = {
                colors: ["#d40c0c", "#17b885"],
                series: [
                    {
                        name: "Cost Value",
                        data: data.map((b) => b.costValue),
                    },
                    {
                        name: "Retail Value",
                        data: data.map((b) => b.retailValue),
                    },
                ],
                chart: {
                    type: "bar",
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "55%",
                        endingShape: "rounded",
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                },
                xaxis: {
                    categories: data.map((u) => u.branch),
                },

                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return addCommas(val / 10000, 0);
                        },
                    },
                    title: {
                        text: "Sales/Cost (0000)",
                    },
                    forceNiceScale: true,
                    decimalsInFloat: 0,
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "Ksh " + addCommas(val, 2);
                        },
                    },
                },
            };
        }
    }

    onMount(() => {
        // console.log(data);
    });
</script>

<main>
    <div class="wrapper">
        <div class="statsContainer">
            <div class="segment" style="flex: 6;">
                <div class="titleBar">
                    <div class="title">Branch Inventory Overview</div>
                    <div class="actions" />
                </div>

                {#if data.length > 1}
                    <div use:chart={options} />
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .statsContainer {
        display: flex;
        margin-top: 0.5em;
        flex-direction: column;
    }

    .segment {
        margin: 0.4em;
    }

    .titleBar {
        display: flex;
        justify-content: space-between;
    }

    .actions {
        padding: 5px;
    }

    .title {
        padding-top: 0.5em;
        opacity: 0.8;
        font-weight: 400;

        /* color:; */
    }

    @media only screen and (min-width: 640px) {
        .statsContainer {
            display: flex;
            margin-top: 0.5em;
            flex-direction: row;
        }
    }
</style>
