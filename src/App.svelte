<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-navigator";
  import Footer from "./components/Footer.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import { getLiu } from "./scripts/js/methods";
  import { decode } from "js-base64";

  let liu;

  const checkIfLoggedIn = async () => {
    let zliu = getLiu();

    if (zliu) {
      liu = zliu;

      console.log(liu);
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
