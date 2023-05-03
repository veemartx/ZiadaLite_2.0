<script>
    import { onMount } from "svelte";

    export let products = [];

    let pageSize = 20;

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    let currentPageProducts = [];

    $: {
        if (products.length > 0) {
            offset = (currentPage - 1) * pageSize;

            currentPageProducts = products.slice(offset, offset + pageSize);
        }
    }

    // make pages
    $: {
        if (products.length > 0) {
            totalNumberOfPages = currentPageProducts.length / pageSize + 1;

            pages = [];

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }

    onMount(() => {
        console.log(products);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">Bod Products</div>
            </div>

            <div class="contentBar">
                <div id="order-check">
                    <table
                        class="ui very basic striped unstackable single line table"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>PackSize</th>
                                <th>Qty</th>
                                <th>WP</th>
                                <th>Unit Cost</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each currentPageProducts as p, i}
                                <tr>
                                    <td>{i + 1 + offset}</td>
                                    <td>{p.name}</td>
                                    <td>{p.packSize}</td>
                                    <td>{p.qty}</td>
                                    <td>{p.wp}</td>
                                    <td>{p.unitCost}</td>
                                    <td>{p.totalCost}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <br />
                <br />
                <div class="">
                    <div class="pagesCol">
                        {#each pages as pg}
                            <button
                                on:click={() => {
                                    currentPage = pg;
                                }}
                                class={currentPage == pg
                                    ? "ui green  mini icon button"
                                    : "ui basic mini icon button"}
                            >
                                {pg}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .contentBar {
        overflow-x: auto;
    }

    .title {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-primary-light);
    }
</style>
