<script>
    import { Route, Router } from "svelte-navigator";
    import Home from "../components/products/Home.svelte";
    import New from "../components/products/New.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Home />
        </Route>

        <Route path="/new">
            <New />
        </Route>
    </Router>
</main>

<style>
</style>
