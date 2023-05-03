<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { Router, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import { getLiu } from "./scripts/js/methods";



  let liu;

  const checkIfLoggedIn = async () => {
    let zliu = getLiu();

    if (zliu) {
      liu = zliu;
    }
  };

  onMount(() => {
    checkIfLoggedIn();
  });
</script>

<main>
  <Router>
    {#if liu}
      <Home />
    {:else}
      <Login />
    {/if}
  </Router>
</main>

<style>
</style>
