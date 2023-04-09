<script>
    import { Route, Router } from "svelte-navigator";
    import Product from "../components/product/Product.svelte";
</script>

<main>
    <Router>
        <Route path="/*">
            <Product />
        </Route>
    </Router>
</main>

<style>
</style>
