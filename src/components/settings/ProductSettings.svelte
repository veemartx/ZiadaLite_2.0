<script>
    import { onMount } from "svelte";
    import { Link, Route, Router } from "svelte-navigator";
    import { goBack } from "../../scripts/js/methods";
    import ProductsSettings from "./products/Home.svelte";
    import Categories from "./products/Categories.svelte";
    import Subcategories from "./products/Subcategories.svelte";
    import SettingsNav from "./products/SettingsNav.svelte";
    import Category from "./products/Category.svelte";
    import Properties from "./products/Properties.svelte";
    import Create from "./products/Create.svelte";
    import NsProducts from "./products/NsProducts.svelte";
    import NsProduct from "./products/NsProduct.svelte";
    import Generics from "./products/Generics.svelte";
    import NsBrands from "./products/NsBrands.svelte";
    import NsManufacturers from "./products/NsManufacturers.svelte";
    import EditNsProduct from "./products/EditNsProduct.svelte";

    export let crumbs;

    onMount(() => {
        crumbs = {
            title: "Products Settings",
            crumbs: [
                {
                    name: "Home",
                    url: "/",
                },
                {
                    name: "Settings",
                    url: "/settings",
                },
                {
                    name: "Products Settings",
                    url: "/settings/products",
                },
            ],
        };
    });

    let settingsNavLinks = [
        "categories",
        "create",
        "ns-products",
        "generics",
        "brands",
        "manufacturers",
    ];
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

            <!-- .product settings nav  -->
            <div class="productSettingsNav">
                <SettingsNav links={settingsNavLinks} />
            </div>
            <!-- .product settings nav  -->

            <div class="mainContainer">
                <Router>
                    <Route path="/">
                        <ProductsSettings />
                    </Route>
                    <Route path="/categories/*">
                        <Categories />
                    </Route>

                    <Route path="/subcategories">
                        <Subcategories />
                    </Route>

                    <Route path="/category/*">
                        <Category />
                    </Route>

                    <Route path="/properties/*">
                        <Properties />
                    </Route>

                    <Route path="/create/*">
                        <Create />
                    </Route>

                    <Route path="/ns-products/*">
                        <NsProducts />
                    </Route>

                    <Route path="/ns-product/*">
                        <Route path="/pd/*">
                            <NsProduct />
                        </Route>

                        <Route path="/edit/*">
                            <EditNsProduct />
                        </Route>
                    </Route>

                    <Route path="/generics/*">
                        <Generics />
                    </Route>

                    <Route path="/brands/*">
                        <NsBrands />
                    </Route>

                    <Route path="/manufacturers/*">
                        <NsManufacturers />
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
        padding: 1em;
    }
</style>
