<script>
    import { onMount } from "svelte";
    import { Link, Route, Router } from "svelte-navigator";
    import { addCommas, goBack } from "../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import CoreSubNav from "./CoreSubNav.svelte";
    import NotSold from "./NotSold.svelte";
    import Home from "./products/Home.svelte";
    import BranchProducts from "./products/BranchProducts.svelte";
    import MissingProducts from "./products/MissingProducts.svelte";

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

    let coreNav = [
        {
            name: "Home",
            url: "/ziada-core/products/",
            entityName: "products",
            icon: "home icon",
        },
        {
            name: "Missing",
            url: "/ziada-core/products/missing",
            entityName: "missing",
            icon: "x icon",
        },
        {
            name: "Not Sold",
            url: "/ziada-core/products/not-sold",
            entityName: "not-sold",
            icon: "square icon",
        },
    ];

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

            <div class="coreNavBar">
                <CoreSubNav bind:coreNav />
            </div>

            <div class="mainContainer">
                <Router>
                    <Route path="/">
                        <Home bind:crumbs />
                    </Route>

                    <Route path="/not-sold/*">
                        <NotSold bind:crumbs />
                    </Route>

                    <Route path="/missing/*">
                        <MissingProducts />
                    </Route>

                    <Route path="/br/*">
                        <BranchProducts bind:crumbs />
                    </Route>
                </Router>
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
        overflow-x: auto;
        max-width: 100vw;
    }

    .content {
        max-width: 100vw;
    }
</style>
