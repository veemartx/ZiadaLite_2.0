<script>
    import { Route, Router } from "svelte-navigator";
    import Home from "../components/trash/Home.svelte";
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
