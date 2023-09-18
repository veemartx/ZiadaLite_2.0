<script>
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";
    import { formatDate, goBack } from "../../scripts/js/methods";

    const RESOURCE = "meetings";

    let settings = [];

    const getSettings = async () => {
        let dt = {
            resource: RESOURCE,
        };
        try {
            const response = await axios({
                method: "POST",
                url: `${apiBaseUrl}/getResourceSettings.php`,
                data: dt,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            settings = res;

            console.log(settings);

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getSettings();
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
                        <i class="cog icon" /> Settings
                    </div>
                </div>
                <div class="actions">
                    <i class="ri-more-2-fill" />
                </div>
            </div>

            <div class="mainContainer">
                <div class="tableContainer">
                    <table class="ui basic unstackable striped table">
                        <thead>
                            <th>No</th>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Updated</th>
                            <th>Edit</th>
                        </thead>
                        <tbody>
                            {#each settings as s, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{s.name}</td>
                                    <td>{s.value}</td>
                                    <td>{formatDate(s.updated)}</td>
                                    <td>
                                        <span>
                                            <i class="yellow edit icon" />
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
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
</style>
