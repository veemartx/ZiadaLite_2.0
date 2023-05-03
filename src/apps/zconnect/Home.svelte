<script>
    import { Link, Route, Router } from "svelte-navigator";
    import Breadcrumbs from "../../components/Breadcrumbs.svelte";
    import ZiadaCoreNav from "./ZiadaCoreNav.svelte";
    import ZiadaCoreSearch from "./ZiadaCoreSearch.svelte";
    import ZiadaCoreHome from "./ZiadaCoreHome.svelte";
    import Products from "./Products.svelte";
    import Sales from "./Sales.svelte";
    import Performance from "./Performance.svelte";
    import InventoryTreeChart from "./InventoryTreeChart.svelte";
    import { onMount } from "svelte";
    import { updateCrumbs } from "../../scripts/js/methods";

    let crumbs = {
        title: "ZConnect<sup>&trade;</sup>",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Apps",
                url: "/apps/",
            },
            {
                name: "ZConnect",
                url: "/apps/zconnect",
            },
        ],
    };

    onMount(() => {
        updateCrumbs(crumbs);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="settingsMainContainer">
                <div class="leftCol">
                    <div class="segmentContainer">
                        <ZiadaCoreNav />
                    </div>
                </div>
                <div class="rightCol">
                    <div class="segmentContainer">
                        <div class="mobileSettingsSearch">
                            <ZiadaCoreSearch />
                        </div>

                        <Router>
                            <Route path="/">
                                <ZiadaCoreHome />
                            </Route>
                            <Route path="/products/*">
                                <Products bind:crumbs />
                            </Route>

                            <Route path="/sales/*">
                                <Sales bind:crumbs />
                            </Route>

                            <Route path="/performance/*">
                                <Performance bind:crumbs />
                            </Route>
                        </Router>
                    </div>
                    <div class="mobileHome">
                        <InventoryTreeChart />
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .settingsMainContainer {
        display: flex;
        justify-content: space-between;
    }

    .leftCol {
        /* flex: 1; */
        display: none;
    }

    .rightCol {
        flex: 4;
    }

    .segmentContainer {
        background: #fff;
    }

    .mobileSettingsSearch {
        border-bottom: 1px solid rgba(94, 94, 94, 0.391);
    }

    .mobileHome {
        background: #fff;
    }

    @media only screen and (min-width: 640px) {
        .mobileSettingsSearch {
            display: none;
        }
        .leftCol {
            flex: 1;
            margin-right: 0.2em;
            display: block;
        }
        .rightCol {
            flex: 4;
            margin-left: 0.2em;
        }

        .mobileHome {
            display: none;
        }
    }
</style>
