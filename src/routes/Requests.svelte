<script>
    import { Route, Router } from "svelte-navigator";
    import Home from "../components/requests/Home.svelte";
    import Request from "../components/requests/Request.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Home />
        </Route>

        <Route path="/tr/*">
            <Request />
        </Route>
    </Router>
</main>

<style>
</style>
