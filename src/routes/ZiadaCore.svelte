<script>
    import { Route, Router } from "svelte-navigator";
    import Home from "../components/ziadacore/ZiadaCore.svelte";
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
