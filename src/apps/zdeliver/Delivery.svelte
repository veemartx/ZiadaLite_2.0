<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Confirm } from "notiflix";
    import { addCommas, formatDate } from "../../scripts/js/methods";
    import SummaryCol from "../../widgets/SummaryCol.svelte";

    export let delivery;

    let totalMargin = 0;

    let deliverySummary;

    $: {
        if (delivery) {
            totalMargin =
                parseFloat(delivery.totalRetail) -
                (parseFloat(delivery.totalCost) +
                    parseFloat(delivery.deliveryCost));
        }

        deliverySummary = [
            {
                name: "Branch",
                value: delivery.hostBranch,
            },
            {
                name: "Destination",
                value: delivery.destination,
            },
            {
                name: "Creator",
                value: delivery.createdBy,
            },
            {
                name: "Created",
                value: formatDate(delivery.createdAt),
            },
            {
                name: "Total Cost",
                value: addCommas(parseFloat(delivery.totalCost), 2),
            },
            {
                name: "Total Retail",
                value: addCommas(parseFloat(delivery.totalRetail), 2),
            },
            {
                name: "Delivery Costs",
                value: addCommas(parseFloat(delivery.deliveryCost), 2),
            },
            {
                name: "Total Margin",
                value: addCommas(parseFloat(totalMargin), 2),
            },
        ];
    }

    // send message to close modal
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    function sendSelected(selected) {
        dispatch("selected", selected);
    }

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">View Delivery</div>
                    <div class="close closeModal">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i on:click={closeModal} class="ri-close-line" />
                    </div>
                </div>

                {#if delivery}
                    <div class="summaryCol">
                        <SummaryCol summary={deliverySummary} />
                    </div>
                    <br />

                    <div class="productsContainer">
                        <table
                            class="ui basic striped single line unstackable table"
                        >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Qty</th>
                                    <th>Cost</th>
                                    <th>Retail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each delivery.products as p, i}
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{p.name}</td>
                                        <td>{p.code}</td>
                                        <td>{p.qty}</td>
                                        <td>{p.costPrice}</td>
                                        <td>{p.retailPrice}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>

                    <div class="printCol">
                        <button class="ui basic purple button">
                            <i class="print icon" /> Print
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .modalContent {
        margin-top: 1em !important;
        position: absolute !important;
        width: 80%;
        height: 90vh;
    }



    .productsContainer {
        padding: 1em;
        overflow-x: auto;
    }


    .printCol {
        padding-top: 2em;
        text-align: center;
    }

    .summaryCol {
        padding: 1em;
    }
</style>
