<script>
    import { onMount } from "svelte";
    import { goBack } from "../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";

    const RESOURCE = "meetings";

    let stats;

    const getMeetings = async () => {
        let dt = {
            type: "Branch",
        };
        try {
            const response = await axios({
                method: "POST",
                url: `${apiBaseUrl}/getMeetings.php`,
                data: dt,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            stats = res;
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getMeetings();
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
                        <i class="cog icon" /> Branch Meetings
                    </div>
                </div>
                <div class="actions">
                    <i class="ri-more-2-fill" />
                </div>
            </div>

            <div class="mainContainer">Branch Meetings</div>
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
