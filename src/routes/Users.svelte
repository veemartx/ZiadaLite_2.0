<script>
    import { Route, Router } from "svelte-navigator";
    import Users from "../components/users/Users.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Users />
        </Route>
    </Router>
</main>

<style>
</style>
