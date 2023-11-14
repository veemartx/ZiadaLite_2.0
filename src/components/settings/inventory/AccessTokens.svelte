<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { Notify } from "notiflix";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let tokens = [];

    const getAccessTokens = async () => {
        let response = await axios.get(`${apiBaseUrl}getAccessTokens.php`);

        let res = response.data;

        // console.log(res);
        tokens = res;
    };

    const resetAccessToken = async (t) => {
        let dt = {
            id: t.id,
            name: t.name,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}resetAccessToken.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            if (res.success) {
                Notify.success(res.message);

                getAccessTokens();
            } else {
                Notify.failure(res.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getAccessTokens();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Access Tokens</div>
        </div>

        <div class="contentBar">
            <div class="tableContainer">
                <table class="ui basic unstackable striped table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Token</th>
                            <th>Reset</th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each tokens as t, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{t.name}</td>
                                <td>{t.username}</td>
                                <td>{t.token}</td>
                                <td>
                                    <span>
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <i
                                            on:click={() => {
                                                if (
                                                    confirm(
                                                        `Reset ${t.name}'s Access Token? This Action Cannot Be Reversed`
                                                    )
                                                ) {
                                                    resetAccessToken(t);
                                                }
                                            }}
                                            style="font-size: large;cursor:pointer"
                                            class="orange edit icon"
                                        />
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<style>
    .title {
        font-size: small;
        padding: 1em;
    }
</style>
