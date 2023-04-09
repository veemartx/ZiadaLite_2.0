<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { addCommas, goBack } from "../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";

    export let crumbs;

    onMount(() => {
        crumbs = {
            title: "Core Products",
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
                    name: "Products",
                    url: "/ziada-core/products",
                },
            ],
        };
    });

    let products = [];

    let productDetails = {};

    let firstLetters = [];

    let page = 1;

    let firsLetter = "A";

    let sort = "";

    let pages = [];

    $: {
        // console.log(firsLetter);
        sort = "WHERE productName LIKE '" + firsLetter + "%'";

        getProducts(page, sort);
    }

    const getProducts = async (page, sort) => {
        let dt = {
            page: page,
            sort: sort,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getInventory.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            productDetails = res[0];

            // clear pages
            pages = [];
            // make pages
            for (let x = 1; x < productDetails.totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
            // console.log(pages);

            products = res[1];

            console.log(products);

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const getFirstLetters = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${apiBaseUrl}core/getFirstLetters.php`,
            });

            let res = response.data;

            firstLetters = res;

            // console.log(firstLetters);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getFirstLetters();
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
                        <i class="cog icon" /> Products
                    </div>
                </div>
                <div class="actions">
                    <i class="ri-more-2-fill" />
                </div>
            </div>

            <div class="mainContainer">
                <div class="firstLettersCol">
                    {#each firstLetters as fl}
                        <button
                            on:click={() => {
                                // reset page
                                page = 1;

                                firsLetter = fl;
                            }}
                            class={firsLetter == fl
                                ? "ui green  mini icon button"
                                : "ui basic mini icon button"}
                        >
                            {fl}
                        </button>
                    {/each}
                </div>

                <br />
                <div class="tableContainer">
                    <table
                        class="ui very basic striped single line unstackable table"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Branch</th>
                                <th>InStockQty</th>
                                <th>AverageCost</th>
                                <th>PackSize</th>
                                <th>Qty(WP)</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each products as p, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{p.name}</td>
                                    <td>{p.code}</td>
                                    <td>{p.branch}</td>
                                    <td>{p.instockqty}</td>
                                    <td>{p.averageCost}</td>
                                    <td>{p.packSize}</td>
                                    <td>{p.calcPw}</td>
                                    <td>{addCommas(p.value, 2)}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <br />

                <div class="pagesCol">
                    {#each pages as pg}
                        <button
                            on:click={() => {
                                page = pg;
                            }}
                            class={page == pg
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
        overflow-x: auto;
        max-width: 100vw;
    }

    .content {
        max-width: 100vw;
    }

    .pagesCol {
        margin-top: 2em;
        margin-bottom: 2em;
    }
</style>
