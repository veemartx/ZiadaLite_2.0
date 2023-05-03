<script>
    import { Route, Router } from "svelte-navigator";
    import Apps from "../apps/Apps.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Apps />
        </Route>
    </Router>
</main>

<style>
</style>
