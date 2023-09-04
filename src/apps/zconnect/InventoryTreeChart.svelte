<script>
    // @ts-nocheck

    import { chart } from "svelte-apexcharts";
    import { onMount } from "svelte";
    import { addCommas } from "../../scripts/js/methods";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";

    export let products = ["o"];

    let data = ["1"];

    let options;

    $: {
        if (products.length > 0) {
            data = products;

            options = {
                series: [
                    {
                        data: products.map((p) => {
                            return {
                                x: `${p.branch} (${p.products})`,
                                y: p.products,
                            };
                        }),
                    },
                ],
                legend: {
                    show: false,
                },
                chart: {
                    height: 350,
                    type: "treemap",
                },
                title: {
                    text: "Inventory Distribution Overview",
                    align: "left",
                },
                colors: [
                    "#3B93A5",
                    "#F7B844",
                    "#ADD8C7",
                    "#EC3C65",
                    "#CDD7B6",
                    "#C1F666",
                    "#D43F97",
                    "#1E5D8C",
                    "#421243",
                    "#7F94B0",
                    "#EF6537",
                    "#C0ADDB",
                ],
                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: false,
                    },
                },
            };
        }
    }

    const getBranchesProducts = async () => {
        try {
            const response = await axios({
                method: "POST",
                url: `${apiBaseUrl}core/getBranchesInventory.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            products = res;

            // // console.log(branches);
            // totalRetailValue = branches
            //     .map((v) => parseFloat(v.retailValue))
            //     .reduce((partialSum, a) => partialSum + a, 0);

            // totalCostValue = branches
            //     .map((v) => parseFloat(v.costValue))
            //     .reduce((partialSum, a) => partialSum + a, 0);

            // totalProducts = branches
            //     .map((v) => parseFloat(v.products))
            //     .reduce((partialSum, a) => partialSum + a, 0);

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        // console.log(data);
        getBranchesProducts();
    });
</script>

<main>
    <div class="wrapper">
        <div class="statsContainer">
            <div class="segment" style="flex: 6;">
                <div class="chartContainer">
                    {#if data.length > 0}
                        <div use:chart={options} />
                    {/if}
                </div>
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

    .chartContainer {
        padding-top: 1em;
    }

    @media only screen and (min-width: 640px) {
        .statsContainer {
            display: flex;
            margin-top: 0.5em;
            flex-direction: row;
        }
    }
</style>
