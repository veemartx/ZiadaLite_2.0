<script>
    import { Route, Router } from "svelte-navigator";
    import Settings from "../components/settings/Settings.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Settings />
        </Route>
    </Router>
</main>

<style>
</style>
