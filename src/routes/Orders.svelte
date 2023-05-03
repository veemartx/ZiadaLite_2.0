<script>
    import { Route, Router } from "svelte-navigator";
    import Orders from "../components/orders/Home.svelte";
    import BranchOrder from "../components/orders/BranchOrder.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Orders />
        </Route>

        <Route path="/bord/*">
            <BranchOrder />
        </Route>
    </Router>
</main>

<style>
</style>
