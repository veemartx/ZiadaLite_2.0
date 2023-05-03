<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { goBack } from "../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";

    export let crumbs;

    let sales = [];

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    let pageSize = 21;

    let currentPageSales = [];

    $: {
        offset = (currentPage - 1) * pageSize;

        currentPageSales = sales.slice(offset, offset + pageSize);
    }

    // make pages
    $: {
        if (sales.length > 0) {
            totalNumberOfPages = sales.length / pageSize + 1;

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }

    const getSales = async () => {
        let response = await axios.get(`${apiBaseUrl}core/getSales.php`);

        let result = response.data;

        sales = result;
    };

    onMount(() => {
        crumbs = {
            title: "Core Sales",
            crumbs: [
                {
                    name: "Home",
                    url: "/",
                },
                {
                    name: "ZiadaCore",
                    url: "/ziada-core",
                },
                {
                    name: "Core Sales",
                    url: "/ziada-core/sales",
                },
            ],
        };

        getSales();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="titleCol">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="backCol"
                        on:click={() => {
                            goBack();
                        }}
                    >
                        <div class="" style="padding-right:2px">
                            <i class="arrow left icon" />
                        </div>
                        <div class="">Back</div>
                    </div>

                    <div class="s-title">
                        <i class="cog icon" /> Sales
                    </div>
                </div>
                <div class="actions">
                    <i class="ri-more-2-fill" />
                </div>
            </div>

            <div class="mainContainer">
                <div class="tableContainer">
                    <table
                        class="ui very basic striped unstackable single line table"
                    >
                        <thead>
                            <th>Id</th>
                            <th>Sale Net</th>
                            <th>Sale Total</th>
                            <th>Receipt No</th>
                            <th>Cash Paid</th>
                            <th>Sale By</th>
                            <th>Branch</th>
                            <th>View</th>
                        </thead>
                        <tbody>
                            {#each currentPageSales as s}
                                <tr>
                                    <td>{s.id}</td>
                                    <td>{s.net}</td>
                                    <td>{s.total}</td>
                                    <td>{s.receiptNo}</td>
                                    <td>{s.cashPaid}</td>
                                    <td>{s.saleBy}</td>
                                    <td>{s.branch}</td>
                                    <td>..</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

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
</main>

<style>
    .titleBar {
        padding: 0.5em;
        border-bottom: 1px solid rgba(166, 166, 166, 0.429);
    }
    .backCol {
        font-size: larger;
        color: crimson;
        font-weight: 600;
        display: flex;
        cursor: pointer;
    }

    .titleCol {
        display: flex;
        justify-content: space-between;
    }

    .s-title {
        font-size: larger;
        margin-left: 1em;
        font-weight: 500;
        color: var(--background-secondary);
    }

    .mainContainer {
        padding: 1em;
    }
</style>
