<script>
    import { Route, Router } from "svelte-navigator";
    import AppsDrawer from "./AppsDrawer.svelte";
    import ZConnect from "./zconnect/Home.svelte";
    import Breadcrumbs from "../components/Breadcrumbs.svelte";
    import FileManager from "./file-manager/Home.svelte";
    import Chat from "./chat/Home.svelte";
    import Store from "./store/Home.svelte";
    import Support from "./support/Home.svelte";
    import Tasks from "./tasks/Home.svelte";
    import { onMount } from "svelte";
    import { updateCrumbs } from "../scripts/js/methods";
    import ZiadaDeliver from "./zdeliver/Home.svelte";
    import ZiadaNetwork from "./znetwork/Home.svelte";
    import Communications from "./communications/Home.svelte";

    let crumbs = {
        title: "Apps",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Apps",
                url: "/apps/",
            },
        ],
    };

    onMount(() => {
        updateCrumbs(crumbs);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="mainBar">
                <Router>
                    <Route path="/">
                        <AppsDrawer />
                    </Route>
                    <Route path="/zconnect/*">
                        <ZConnect />
                    </Route>

                    <Route path="/file-manager/*">
                        <FileManager />
                    </Route>

                    <Route path="/chat/*">
                        <Chat />
                    </Route>

                    <Route path="/support/*">
                        <Support />
                    </Route>

                    <Route path="/store/*">
                        <Store />
                    </Route>

                    <Route path="/tasks/*">
                        <Tasks />
                    </Route>

                    <Route path="/znetwork/*">
                        <ZiadaNetwork />
                    </Route>

                    <Route path="/zdeliver/*">
                        <ZiadaDeliver />
                    </Route>

                    <Route path="/communications/*">
                        <Communications />
                    </Route>
                </Router>
            </div>
            <!-- <div class="bottomBar">Aha</div> -->
        </div>
    </div>
</main>

<style>
</style>
