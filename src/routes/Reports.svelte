<script>
    import { Route, Router } from "svelte-navigator";
    import Home from "../components/reports/Home.svelte";
    import AdminGenReports from "../components/reports/AdminGenReports.svelte";
    import RandomStockTakes from "../components/reports/RandomStockTakes.svelte";
    import RandomStockTake from "../components/reports/RandomStockTake.svelte";
    import CreateRandomStockTake from "../components/reports/CreateRandomStockTake.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Home />
        </Route>
        <Route path="/admin-gen-reports">
            <AdminGenReports />
        </Route>
        <Route path="/random-stock-takes">
            <RandomStockTakes />
        </Route>
        <Route path="/rst/take/*">
            <RandomStockTake />
        </Route>
        <Route path="/random-stock-take/create/">
            <CreateRandomStockTake />
        </Route>
    </Router>
</main>

<style>
</style>
