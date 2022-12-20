<script>
  import { Router, Route } from "svelte-navigator";
  import Footer from "./components/Footer.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  let liu = "ahhaha";
</script>

<main>
  <Router>
    {#if liu}
      <Home />
    {:else}
      <Login />
    {/if}

    <footer>
      <Footer />
    </footer>
  </Router>
</main>

<style>
  footer {
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
</style>
