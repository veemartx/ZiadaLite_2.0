<script>
    import axios from "axios";
    import { Link } from "svelte-navigator";
    import { apiBaseUrl } from "../config/config";

    // set credentials to true so as to accept the cookies
    axios.defaults.withCredentials = true;

    let results = [];

    let q = "";

    let showSearchResults = false;

    let searchLoading = false;

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
                url: `${apiBaseUrl}search.php`,
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
                        {#each results as rs}
                            <Link to={`/product/p/${rs.id}`}>
                                <div class="rsCol">
                                    <div class="rsName">{rs.name}</div>
                                    <div class="rsBranch">{rs.branch}</div>
                                    <div class="rsQty">{rs.qty}</div>
                                    <div
                                        class="rsType"
                                        style={rs.type == "Dead Stock"
                                            ? "color:orangered"
                                            : "color:#cf1d49;"}
                                    >
                                        {rs.type}
                                    </div>
                                </div>
                            </Link>
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
        color: aliceblue !important;
    }

    i {
        color: aliceblue !important;
    }

    .resultsContainer {
        padding-top: 0.5em;
        position: absolute;
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
        justify-content: space-between;
        flex-wrap: wrap;
        font-size: 11px;
        font-weight: 500;
        line-height: 1.5em;
        padding-top: 10px;
        padding-bottom: 10px;
        color: var(--text-secondary-light);
        padding-inline: 0.5em;
    }

    .rsCol:hover {
        background: rgba(0, 255, 221, 0.114);
    }

    .rsName {
        color: var(--text-secondary-light);
    }

    .resultsContent {
        max-height: 60vh;
        overflow: auto;
    }

    @media only screen and (min-width: 640px) {
        .resultsContainer {
            padding-top: 0.6em;
            position: absolute;
            width: 36em;
            margin-left: 0.5em;
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
