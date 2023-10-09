<script>
    import { Link, Route, Router } from "svelte-navigator";
    import Breadcrumbs from "../Breadcrumbs.svelte";
    import AboutZiada from "./AboutZiada.svelte";
    import Accounts from "./Accounts.svelte";
    import Company from "./Company.svelte";
    import GeneralSettings from "./GeneralSettings.svelte";
    import Performance from "./Performance.svelte";
    import Permissions from "./Permissions.svelte";
    import ProductSettings from "./ProductSettings.svelte";
    import ReportsSettings from "./ReportsSettings.svelte";
    import SettingsHome from "./SettingsHome.svelte";
    import SettingsNav from "./SettingsNav.svelte";
    import SettingsSearch from "./SettingsSearch.svelte";
    import SystemSettings from "./SystemSettings.svelte";
    import Inventory from "./inventory/Home.svelte";


    let crumbs = {
        title: "Settings",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Settings",
                url: "/settings",
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
                        <SettingsNav />
                    </div>
                </div>
                <div class="rightCol">
                    <div class="segmentContainer">
                        <div class="mobileSettingsSearch">
                            <SettingsSearch />
                        </div>

                        <Router>
                            <Route path="/">
                                <SettingsHome />
                            </Route>
                            <Route path="/products/*">
                                <ProductSettings bind:crumbs />
                            </Route>

                            <Route path="/general/*">
                                <GeneralSettings bind:crumbs />
                            </Route>

                            <Route path="/accounts/*">
                                <Accounts bind:crumbs />
                            </Route>

                            <Route path="/reports/*">
                                <ReportsSettings bind:crumbs />
                            </Route>

                            <Route path="/permissions/*">
                                <Permissions bind:crumbs />
                            </Route>

                            <Route path="/performance/*">
                                <Performance bind:crumbs />
                            </Route>

                            <Route path="/about/*">
                                <AboutZiada bind:crumbs />
                            </Route>

                            <Route path="/system/*">
                                <SystemSettings bind:crumbs />
                            </Route>

                            <Route path="/company/*">
                                <Company bind:crumbs />
                            </Route>

                            <Route path="/inventory/*">
                                <Inventory bind:crumbs />
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
