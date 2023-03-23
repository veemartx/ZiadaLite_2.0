<script>
    import { Route, Router } from "svelte-navigator";
    import Home from "../components/transfers/Home.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Home />
        </Route>
    </Router>
</main>

<style>
</style>
