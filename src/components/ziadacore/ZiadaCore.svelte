<script>
    import { Link, Route, Router } from "svelte-navigator";
    import Breadcrumbs from "../Breadcrumbs.svelte";
    import ZiadaCoreNav from "./ZiadaCoreNav.svelte";
    import ZiadaCoreSearch from "./ZiadaCoreSearch.svelte";
    import ZiadaCoreHome from "./ZiadaCoreHome.svelte";
    import Products from "./Products.svelte";
    import Sales from "./Sales.svelte";
    import Performance from "./Performance.svelte";

    let crumbs = {
        title: "Settings",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "ZiadaCore",
                url: "/ziada-core",
            },
        ],
    };
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="breadcrumps">
                <Breadcrumbs {crumbs} />
            </div>

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
    }
</style>
