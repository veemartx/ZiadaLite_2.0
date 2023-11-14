<script>
    import axios from "axios";
    import { Link, navigate, useLocation } from "svelte-navigator";
    import { apiBaseUrl } from "../../../config/config";
    import { createEventDispatcher } from "svelte";

    const location = useLocation();

    const dispatch = createEventDispatcher();

    // set credentials to true so as to accept the cookies
    axios.defaults.withCredentials = true;

    let results = [];

    let q = "";

    let showSearchResults = false;

    let searchLoading = false;

    $: {
        // console.log($location);
        hideSearchResults($location);
    }

    const sendSearchResults = (product) => {
        dispatch("product", product);

        q = "";

        hideSearchResults($location);
    };

    const hideSearchResults = (l) => {
        showSearchResults = false;
    };
    $: {
        if (q.length > 2) {
            handleSearch();
            showSearchResults = true;
        } else {
            showSearchResults = false;
        }
    }

    const handleSearch = async () => {
        let dt = {
            q: q,
        };

        searchLoading = true;
        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}searchNsProductStockExpiries.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            results = res;
            searchLoading = false;
        } catch (err) {
            console.log(err);

            searchLoading = false;
        }
    };
</script>

<main>
    <div class="wrapper">
        <div
            class={searchLoading
                ? "ui fluid icon loading input"
                : "ui fluid icon  input"}
        >
            <input
                class="search"
                type="text"
                name="search"
                id="search"
                placeholder="Type To Search"
                bind:value={q}
            />

            <i class="search icon" style="margin: .4em;" />
        </div>

        <!-- results -->
        {#if showSearchResults}
            <div class="resultsContainer">
                <div class="results">
                    <div class="resultTitle">
                        Search Results ({results.length})
                    </div>

                    <div class="resultsContent">
                        <div class="rsCol">
                            <div class="rsName">Name</div>
                            <div class="rsCode">Code</div>
                            <div class="rsPackSize">Batch Managed</div>
                            <div class="rsPackSize">Sales Uom</div>
                        </div>

                        {#each results as rs}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div
                                class="rsCol"
                                on:click={() => {
                                    sendSearchResults(rs);
                                }}
                            >
                                <div class="rsName">{rs.name}</div>
                                <div class="rsCode">{rs.code}</div>
                                <div class="rsPackSize">{rs.batch_managed}</div>
                                <div class="rsPackSize">{rs.sales_uom}</div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
        <!-- results -->
    </div>
</main>

<style>
    .input {
        padding-top: 5px;
    }
    input {
        width: 100%;
        line-height: 1.6em;
        background: rgba(176, 176, 176, 0.317) !important;
        color: rgb(28, 28, 28) !important;
    }

    i {
        color: rgb(43, 43, 43) !important;
    }

    .resultsContainer {
        padding-top: 0.5em;
        /* position: absolute; */
        display: flex;
        justify-content: center;
        width: 100vw;
    }

    .results {
        background: #fff;
        z-index: 100;
        padding-top: 1em;
        border-radius: 3px;
        width: 83%;
        margin: auto;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .resultTitle {
        color: var(--text-primary-light);
        font-weight: 600;
        border-bottom: 1px solid rgba(128, 128, 128, 0.372);
        padding-inline: 0.5em;
    }

    .rsCol {
        border-bottom: 1px solid rgba(128, 128, 128, 0.13);
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        font-size: 11px;
        font-weight: 500;
        line-height: 1.5em;
        padding-top: 10px;
        padding-bottom: 10px;
        color: var(--text-secondary-light);
        padding-inline: 0.5em;
        cursor: pointer;
    }

    .rsCol:hover {
        background: rgba(0, 255, 221, 0.114);
    }

    .rsName {
        color: var(--text-secondary-light);
        margin-inline-end: 2em;
    }

    .rsCode {
        margin-inline-end: 2em;
        color: rgb(27, 137, 78);
        font-weight: 600;
    }

    .rsPackSize {
        margin-inline-end: 2em;
        color: rgb(121, 67, 22);
        font-weight: 600;
    }

    .resultsContent {
        max-height: 60vh;
        overflow: auto;
    }

    @media only screen and (min-width: 640px) {
        /* remember to sor the width issue */
        .resultsContainer {
            padding-top: 0.6em;
            position: absolute;
            margin-left: 0.5em;
            width: 50%;
        }

        .results {
            background: #fff;
            z-index: 100;
            padding: 1em;
            border-radius: 3px;
            width: 90%;
            margin: auto;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
    }
</style>
