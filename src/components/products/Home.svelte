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

    let titleActions = [
        {
            title: "Create (Excel List)",
            url: "/products/create",
            icon: "plus icon",
            color: "dodgerblue",
        },

        {
            title: "Add Product",
            url: "/products/new",
            icon: "plus square icon",
            color: "purple",
        },

        {
            title: "Recover Added",
            url: "/products/recover",
            icon: "upload icon",
            color: "red",
        },
        {
            title: "Products List",
            url: "/products/list",
            icon: "list icon",
            color: "green",
        },
    ];

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
                url: `${apiBaseUrl}getProducts.php`,
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

    const getSummary = async () => {
        try {
            let response = await axios.get(
                `${apiBaseUrl}getProductsSummary.php`
            );

            let res = response.data;

            productsSummary = res;

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
        getSummary();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="productsMainContainer">
                <div class="titleBar">
                    <div class="title">Products</div>
                    <div class="actions">
                        <div class="bt">
                            <Link to="new">
                                <button
                                    class="ui basic green icon small button"
                                    style="font-size: x-small;"
                                >
                                    <i class="plus icon" />
                                </button>
                            </Link>
                        </div>

                        <div class="bt">
                            <TitleActions
                                title={actionsTitle}
                                actions={titleActions}
                            />
                        </div>

                        <!-- <button
                            class="ui basic blue icon small button"
                            style="font-size: x-small;"
                        >
                            <i class="ellipsis vertical icon" />
                        </button> -->
                    </div>
                </div>

                <!-- summary -->
                <div class="productsSummaryCol">
                    <SummaryCol summary={productsSummary} />
                </div>
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
                                <th>Branch</th>
                                <th>Expiry</th>
                                <th>Qty</th>
                                <th>Req'sted </th>
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
                                    <td>{formatDate(pd.expiry)}</td>
                                    <td>{pd.qty}</td>
                                    <td
                                        style={pd.requested == "Y"
                                            ? "color:green"
                                            : "color:red"}
                                        ><b>{pd.requested}</b></td
                                    >
                                    <td>
                                        <div class="actions">
                                            <Link to={`/product/pd/${pd.id}`}>
                                                <i class="eye icon" /> View
                                            </Link>
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

    .bt {
        margin-inline: 0.5em;
    }
</style>
