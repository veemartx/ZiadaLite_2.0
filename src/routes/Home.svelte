<script>
    // @ts-nocheck

    import { Crumbs } from "../stores/crumbs-store";
    import { Route, Router } from "svelte-navigator";
    import ActionButton from "../components/ActionButton.svelte";
    import Dash from "../components/Dash.svelte";
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Product from "./Product.svelte";
    import Products from "./Products.svelte";
    import Reports from "./Reports.svelte";
    import Settings from "./Settings.svelte";
    import Transfers from "./Transfers.svelte";
    import Trash from "./Trash.svelte";
    import Users from "./Users.svelte";
    import Apps from "./Apps.svelte";
    import Breadcrumbs from "../components/Breadcrumbs.svelte";
    import Orders from "./Orders.svelte";
    import Requests from "./Requests.svelte";
    import UniversalMessage from "../components/UniversalMessage.svelte";
    import { onMount } from "svelte";
    import { Dexie, liveQuery } from "dexie";
    import { db } from "../db/db";
    import { apiBaseUrl } from "../config/config";

    let showUniversalMessage = false;

    let ZL_LIU = window.localStorage.ZL_LIU;

    let ZL_LAST_MESSAGE_EVENT_LOG =
        window.localStorage.ZL_LAST_MESSAGE_EVENT_LOG;

    let liu;

    // last message event log
    let latsMessageEventLogTime;

    let universalMessages = [];

    let undoneUniversalMessages = liveQuery(() =>
        db.messages
            .where("channel")
            .equals("universal")
            .and((message) => {
                if (message.status != "done") {
                    return message;
                }
            })
            .toArray()
    );

    // states change
    if (ZL_LIU) {
        liu = JSON.parse(ZL_LIU);
    }

    $: {
        if (ZL_LAST_MESSAGE_EVENT_LOG) {
            latsMessageEventLogTime = JSON.parse(
                ZL_LAST_MESSAGE_EVENT_LOG
            ).eventTime;
        } else {
            latsMessageEventLogTime = "never";
        }
    }

    $: {
        if ($undoneUniversalMessages) {
            if ($undoneUniversalMessages.length > 0) {
                universalMessages = $undoneUniversalMessages;
                showUniversalMessage = true;
            } else {
                showUniversalMessage = false;
            }
        }
    }

    const syncBranchMessages = async () => {
        // create event source
        let evtSource = new EventSource(
            `${apiBaseUrl}includes/messages.php?branch=${liu.b}&lmelt=${latsMessageEventLogTime}`,
            {
                withCredentials: true,
            }
        );

        // add event listener (ping)
        evtSource.addEventListener("syncMessages", async (event) => {
            let newMessageEvents = JSON.parse(event.data);

            let newMessagesKeys = newMessageEvents.map((e) => e.id);

            db.messages
                .bulkPut(newMessageEvents, newMessagesKeys, {
                    allKeys: true,
                })
                .then((lastKey) => {
                    console.log("Messages Synced");

                    // update last message event
                    if (newMessageEvents.length > 0) {
                        window.localStorage.ZL_LAST_MESSAGE_EVENT_LOG =
                            JSON.stringify(
                                newMessageEvents[newMessageEvents.length - 1]
                            );
                    }
                })
                .catch(Dexie.BulkError, (e) => {
                    // Explicitely catching the bulkAdd() operation makes those successful
                    // additions commit despite that there were errors.
                    console.error(
                        "Some Operations did not succeed. However, " +
                            100000 -
                            e.failures.length +
                            " Messages were Syncronized successfully"
                    );
                });
        });
    };

    let showSidebarModal = false;

    onMount(() => {
        syncBranchMessages();
    });
</script>

<main>
    <header>
        <Header />
    </header>

    <div class="vspacer" />

    <div class="breadcrumbs">
        <Breadcrumbs crumbs={$Crumbs} />
    </div>

    {#if showUniversalMessage && $undoneUniversalMessages}
        <div class="universalMessageCol">
            <UniversalMessage undoneUniversalMessages={universalMessages} />
        </div>
        <div class="vspacer_two" />
    {/if}

    <div class="mainContentContainer">
        <Router>
            <Route path="/">
                <Dash />
            </Route>

            <Route path="/dash">
                <Dash />
            </Route>

            <Route path="/reports/*">
                <Reports />
            </Route>

            <Route path="/transfers/*">
                <Transfers />
            </Route>

            <Route path="/trash/*">
                <Trash />
            </Route>

            <Route path="/products/*">
                <Products />
            </Route>

            <Route path="/settings/*">
                <Settings />
            </Route>

            <Route path="/users/*">
                <Users />
            </Route>

            <Route path="/product/*">
                <Product />
            </Route>

            <Route path="/orders/*">
                <Orders />
            </Route>

            <Route path="/transfer-requests/*">
                <Requests />
            </Route>

            <Route path="/apps/*">
                <Apps />
            </Route>
        </Router>
    </div>

    <footer>
        <Footer />
    </footer>
</main>

{#if showSidebarModal}
    <Sidebar
        on:close={() => {
            showSidebarModal = false;
        }}
    />
{/if}

<!-- action button -->
<ActionButton
    on:open={() => {
        showSidebarModal = true;
    }}
/>

<!-- action button -->

<style>
    header {
        background-color: rgb(255, 255, 255);
        /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
        box-shadow: rgba(0, 0, 0, 0.113) 0px 3px 6px,
            rgba(0, 0, 0, 0.092) 0px 3px 6px;
        position: fixed;
        width: 100vw;
        z-index: 10000;
    }

    .vspacer {
        height: 4.5em;
        /* background-color: green; */
    }

    .mainContentContainer {
        min-height: 120vh;
        overflow: auto;
        margin-inline: 0.6em;
    }

    footer {
        background: var(--background-primary);
    }

    .universalMessageCol {
        position: fixed;
        z-index: 1000;
        width: 100%;
    }

    .vspacer_two {
        height: 13em;
    }

    @media only screen and (min-width: 640px) {
        .vspacer {
            height: 7.5em;
            /* background-color: green; */
        }

        .vspacer_two {
            height: 7.5em;
        }

        .mainContentContainer {
            min-height: 120vh;
            max-height: 900vh;
            overflow: auto;
            margin-inline: 0;
        }
    }
</style>
