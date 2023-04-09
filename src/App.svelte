<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { Router, Route } from "svelte-navigator";
  import Footer from "./components/Footer.svelte";
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import { getLiu } from "./scripts/js/methods";
  import { Dexie, liveQuery } from "dexie";
  import { db } from "./db/db";
  import { apiBaseUrl } from "./config/config";
  import axios from "axios";



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
