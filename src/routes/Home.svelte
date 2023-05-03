<script>
    import { Crumbs } from "../stores/crumbs-store";
    import { Route, Router } from "svelte-navigator";
    import ActionButton from "../components/ActionButton.svelte";
    import Dash from "../components/Dash.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Product from "./Product.svelte";
    import Products from "./Products.svelte";
    import Reports from "./Reports.svelte";
    import Settings from "./Settings.svelte";
    import Transfers from "./Transfers.svelte";
    import Trash from "./Trash.svelte";
    import Users from "./Users.svelte";
    import Apps from "./Apps.svelte";
    import Breadcrumbs from "../components/Breadcrumbs.svelte";
    import Orders from "./Orders.svelte";

    let showSidebarModal = false;
</script>

<main>
    <header>
        <Header />
    </header>

    <div class="vspacer" />

    <div class="breadcrumbs">
        <Breadcrumbs crumbs={$Crumbs} />
    </div>

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

            <Route path="/settings/*">
                <Settings />
            </Route>

            <Route path="/users/*">
                <Users />
            </Route>

            <Route path="/product/*">
                <Product />
            </Route>

            <Route path="/orders/*">
                <Orders />
            </Route>

            <Route path="/apps/*">
                <Apps />
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
        overflow: auto;
        margin-inline: 0.6em;
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
        }
    }
</style>
