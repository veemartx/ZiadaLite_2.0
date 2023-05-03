<script>
    import { Route, Router } from "svelte-navigator";
    import Home from "../components/products/Home.svelte";
    import New from "../components/products/New.svelte";
    import RecoverAdditions from "../components/products/RecoverAdditions.svelte";
    import Create from "../components/products/Create.svelte";
    import ProductsList from "../components/products/ProductsList.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Home />
        </Route>

        <Route path="/new">
            <New />
        </Route>

        <Route path="/create">
            <Create />
        </Route>

        <Route path="/list/*">
            <ProductsList />
        </Route>

        <Route path="/recover">
            <RecoverAdditions />
        </Route>
    </Router>
</main>

<style>
</style>
