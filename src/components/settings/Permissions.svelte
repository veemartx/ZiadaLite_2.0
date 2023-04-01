<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import { goBack } from "../../scripts/js/methods";

    export let crumbs;

    let resources = [];

    let selectedResourceName;

    let selectedResource = {};

    $: {
        if (selectedResourceName) {
            let filteredResources = resources.filter((rs) => {
                if (rs.name == selectedResourceName) {
                    return rs;
                }
            });

            selectedResource = filteredResources[0];
        }
    }

    const getResources = async () => {
        let response = await axios.get(`${apiBaseUrl}getPermissions.php`);

        let res = response.data;

        resources = res;
    };

    onMount(() => {
        crumbs = {
            title: "Permission Settings",
            crumbs: [
                {
                    name: "Home",
                    url: "/",
                },
                {
                    name: "Settings",
                    url: "/settings",
                },
                {
                    name: "Permissions Settings",
                    url: "/settings/permissions",
                },
            ],
        };

        getResources();

        // selectedResourceName = "products";
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="titleCol">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="backCol"
                        on:click={() => {
                            goBack();
                        }}
                    >
                        <div class="" style="padding-right:2px">
                            <i class="arrow left icon" />
                        </div>
                        <div class="">Back</div>
                    </div>

                    <div class="s-title">
                        <i class="cog icon" /> Permissions
                    </div>
                </div>
                <div class="actions">
                    <i class="ri-more-2-fill" />
                </div>
            </div>

            <div class="mainContainer">
                <div class="sideCol">
                    <form>
                        <div class="formInput">
                            <label for="resource">Select A Resource</label>
                            <select
                                name="resource"
                                id="resource"
                                bind:value={selectedResourceName}
                            >
                                <option value="">Select A Resource</option>
                                {#each resources as r}
                                    <option
                                        value={r.name}
                                        style="text-transform: capitalize;"
                                        >{r.name}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    </form>
                </div>

                <br />
                <div class="mainCol">
                    <div class="titleBar">
                        <div class="title">
                            {#if selectedResourceName}
                                {selectedResource.name}
                            {:else}
                                Resource
                            {/if}
                        </div>
                    </div>

                    <div class="contentBar">
                        <div class="ss-title">Actions</div>
                        <div class="">
                            <table
                                class="ui very basic striped unstackable table"
                                style="text-transform: capitalize;"
                            >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Allowed</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#if selectedResource.actions}
                                        {#each selectedResource.actions as a}
                                            <tr>
                                                <td>{a.name}</td>
                                                <td>
                                                    <div class="">
                                                        {#each a.allowed as al}
                                                            {al},
                                                        {/each}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="aIcon">
                                                        <i
                                                            class="plus green icon"
                                                        />
                                                    </span>
                                                    <span class="aIcon">
                                                        <i
                                                            class="minus red icon"
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        {/each}
                                    {/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .titleBar {
        padding: 0.5em;
        border-bottom: 1px solid rgba(166, 166, 166, 0.429);
    }
    .backCol {
        font-size: larger;
        color: crimson;
        font-weight: 600;
        display: flex;
        cursor: pointer;
    }

    .titleCol {
        display: flex;
        justify-content: space-between;
    }

    .s-title {
        font-size: larger;
        margin-left: 1em;
        font-weight: 500;
        color: var(--background-secondary);
    }

    .mainContainer {
        padding: 1em;
    }

    .title {
        text-transform: capitalize;
    }

    .ss-title {
        font-weight: 600;
    }

    .contentBar {
        padding: 0.5em;
    }

    .aIcon {
        font-size: larger;
        cursor: pointer;
    }
</style>
