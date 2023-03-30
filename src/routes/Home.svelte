<script>
    import { Route, Router } from "svelte-navigator";
    import ActionButton from "../components/ActionButton.svelte";
    import Dash from "../components/Dash.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Products from "./Products.svelte";
    import Reports from "./Reports.svelte";
    import Transfers from "./Transfers.svelte";
    import Trash from "./Trash.svelte";

    let showSidebarModal = false;
</script>

<main>
    <header>
        <Header />
    </header>

    <div class="vspacer" />


    <div class="mainContentContainer">
        <Router>
            <Route path="/">
                <Dash />
            </Route>

            <Route path="/dash">
                <Dash />
            </Route>

            <Route path="/reports/*">
                <Reports />
            </Route>

            <Route path="/transfers/*">
                <Transfers />
            </Route>

            <Route path="/trash/*">
                <Trash />
            </Route>

            <Route path="/products/*">
                <Products />
            </Route>
        </Router>
    </div>

    <footer>
        <Footer />
    </footer>
</main>

{#if showSidebarModal}
    <Sidebar
        on:close={() => {
            showSidebarModal = false;
        }}
    />
{/if}

<!-- action button -->
<ActionButton
    on:open={() => {
        showSidebarModal = true;
    }}
/>

<!-- action button -->
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
        /* max-height: 900vh; */
        overflow: auto;
        margin-inline: 0.6em;
        /* background: red; */
    }

    footer {
        background: var(--background-primary);
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
            padding-top: 1em;
        }
    }
</style>
