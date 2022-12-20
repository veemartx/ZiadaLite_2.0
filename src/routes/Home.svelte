<script>
    import { Route, Router } from "svelte-navigator";
    import Dash from "../components/Dash.svelte";
    import Header from "../components/Header.svelte";
</script>

<main>
    <header>
        <Header />
    </header>

    <div class="vspacer" />

    <div class="mainContentContainer">
        <Router>
            <Route to="/">
                <Dash />
            </Route>
        </Router>
    </div>
</main>

<style>
    header {
        background-color: rgb(255, 255, 255);
        /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
        box-shadow: rgba(0, 0, 0, 0.113) 0px 3px 6px,
            rgba(0, 0, 0, 0.092) 0px 3px 6px;
        position: fixed;
        width: 100vw;
        z-index: 10000;
    }

    .vspacer {
        height: 4.5em;
        /* background-color: green; */
    }

    .mainContentContainer {
        min-height: 120vh;
        max-height: 900vh;
        overflow: auto;
        margin-inline: 0.4em;
        /* background: red; */
    }

    @media only screen and (min-width: 640px) {
        .vspacer {
            height: 7.5em;
            /* background-color: green; */
        }

        .mainContentContainer {
            min-height: 120vh;
            max-height: 900vh;
            overflow: auto;
            margin-inline: 0;
        }
    }
</style>
