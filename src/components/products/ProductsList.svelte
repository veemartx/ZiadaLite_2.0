<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import { formatDate, updateCrumbs } from "../../scripts/js/methods";
    import SummaryCol from "../../widgets/SummaryCol.svelte";
    import TitleActions from "../../widgets/TitleActions.svelte";

    let crumbs = {
        title: "Products At Risk",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Products",
                url: "/products/",
            },
        ],
    };

    let actionsTitle = "Actions";

    let products = [];

    let productsSummary = [];

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
                url: `${apiBaseUrl}getProductsList.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            products = res;

            // clear pages
            pages = [];
            // make pages
            for (let x = 1; x < products.length; x++) {
                pages.push(x);
            }

            pages = pages;
            console.log(pages);

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const getFirstLetters = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${apiBaseUrl}getFirstLetters.php`,
            });

            let res = response.data;

            firstLetters = res;

            // console.log(firstLetters);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        updateCrumbs(crumbs);
        getFirstLetters();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="productsMainContainer">
                <div class="titleBar">
                    <div class="title">Products</div>
                    <div class="actions" />
                </div>

                <!-- summary -->
                <div class="productsSummaryCol" />
                <!-- summary -->

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

                <div class="productsTableCol">
                    <table
                        class="ui unstackable striped single line very basic table"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Pack Size</th>
                                <th>Cost Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody class="productsList">
                            {#each products as pd, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{pd.pn}</td>
                                    <td>{pd.pc}</td>
                                    <td>{pd.ps}</td>
                                    <td>{pd.cp}</td>
                                    <td>
                                        <div class="actions">
                                            <i class="yellow edit icon" />
                                            <i class="red trash icon" />
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

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
    main {
        margin-top: 1em;
        margin-bottom: 2em;
    }
    .productsTableCol {
        overflow-x: auto;
        margin-top: 0.5em;
    }

    table {
        font-size: smaller !important;
    }

    .productsMainContainer {
        padding: 1em;
        background: #fff;
    }

    .firstLettersCol {
        border-bottom: 1px solid rgba(128, 128, 128, 0.222);
        padding-bottom: 1em;
        padding-top: 1em;
    }

    .pagesCol {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    .productsSummaryCol {
        margin-top: 0.5em;
        padding-bottom: 0.5em;
        border-bottom: 1px solid rgba(128, 128, 128, 0.222);
    }

    .title {
        color: var(--text-primary-light);
        font-weight: 600;
    }

    .actions {
        padding-top: 0.5em;
        display: flex;
    }
</style>
