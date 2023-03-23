<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";

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
                url: `${apiBaseUrl}getTrashProducts.php`,
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

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const getFirstLetters = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${apiBaseUrl}getTrashFirstLetters.php`,
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
            <div class="productsMainContainer">
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
                                <th>Branch</th>
                                <th>Expiry</th>
                                <th>Qty</th>
                                <th>View</th>
                            </tr>
                        </thead>

                        <tbody class="productsList">
                            {#each products as pd, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{pd.name}</td>
                                    <td>{pd.code}</td>
                                    <td>{pd.branch}</td>
                                    <td>{pd.expiry}</td>
                                    <td>{pd.qty}</td>
    
                                    <td>
                                        <div class="">
                                            <i class="eye icon" />
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
        border-bottom: 1px solid rgba(128, 128, 128, 0.485);
        padding-bottom: 1em;
    }

    .pagesCol {
        margin-top: 2em;
        margin-bottom: 2em;
    }
</style>
