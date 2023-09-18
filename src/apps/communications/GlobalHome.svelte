<script>
    import { Link, Route, Router } from "svelte-navigator";
    import Breadcrumbs from "../../components/Breadcrumbs.svelte";

    import { onMount } from "svelte";
    import { updateCrumbs } from "../../scripts/js/methods";
    import Nav from "./Nav.svelte";
    import CompanyMeetings from "./CompanyMeetings.svelte";
    import RegionalMeetings from "./RegionalMeetings.svelte";
    import BranchMeetings from "./BranchMeetings.svelte";
    import Settings from "./Settings.svelte";
    import GlobalStats from "./GlobalStats.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="settingsMainContainer">
                <div class="leftCol">
                    <div class="segmentContainer">
                        <Nav />
                    </div>
                </div>
                <div class="rightCol">
                    <div class="segmentContainer">
                        <Router>
                            <Route path="/">
                                <GlobalStats />
                            </Route>

                            <Route path="/company">
                                <CompanyMeetings />
                            </Route>

                            <Route path="/regional">
                                <RegionalMeetings />
                            </Route>
                            <Route path="/branch">
                                <BranchMeetings />
                            </Route>
                            <Route path="/settings">
                                <Settings />
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

    @media only screen and (min-width: 640px) {
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
