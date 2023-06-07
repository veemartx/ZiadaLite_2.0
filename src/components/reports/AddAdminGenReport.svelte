<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import { v4 } from "uuid";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let addReportBtnLoading = false;

    export let authenticatedUser;

    export let fields;

    export let branches;

    let selectedBranch;

    let fieldValues = [];

    // let formFields = [];

    // send message to close modal
    const dispatch = createEventDispatcher();

    function handleSuccess() {
        dispatch("success");
    }

    function cancelAuth() {
        dispatch("cancel");
    }

    const handleAddAdminGenReport = async () => {
        let ff = [];

        fields.forEach((v, i) => {
            ff.push({
                name: v,
                value: fieldValues[i],
            });
        });

        let dt = {
            init: authenticatedUser.uid,
            initName: authenticatedUser.name,
            branch: selectedBranch,
            data: JSON.stringify(ff),
            reportId: v4(),
        };

        addReportBtnLoading = true;
        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "addAdminGenReport.php",
                data: dt,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            if (result.success) {
                Notify.success(result.message);
                handleSuccess();
            } else {
                Notify.failure(result.message);
            }

            console.log(result);

            addReportBtnLoading = false;
        } catch (err) {
            addReportBtnLoading = false;
            console.log(err);
        }

        console.log(dt);
    };

    onMount(() => {
        // console.log(payload);
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Create Report</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancelAuth}
                            class="cancelAuth ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <br />
                    <div class="authTokenForm">
                        <form
                            on:submit|preventDefault={handleAddAdminGenReport}
                            id="authTokenForm"
                        >
                            <div class="field">
                                <label for="branch">Branch</label>
                                <select
                                    name="branch"
                                    id="branch"
                                    bind:value={selectedBranch}
                                    required
                                >
                                    <option value="">Select Branch</option>
                                    {#each branches as b}
                                        <option value={b}>{b}</option>
                                    {/each}
                                </select>
                            </div>
                            <br />
                            <div class="fieldCol">
                                {#each fields as f, i}
                                    <div class="field">
                                        <label for={f}>{f}</label> <br />
                                        <textarea
                                            name={f}
                                            id={f}
                                            cols="30"
                                            rows="3"
                                            placeholder="Comment"
                                            bind:value={fieldValues[i]}
                                            required
                                        />
                                    </div>
                                {/each}
                            </div>

                            <div
                                class="fieldInput"
                                style="padding-top: 1.5em;text-align:center;"
                            >
                                <button
                                    class={addReportBtnLoading
                                        ? "ui teal basic loading icon button"
                                        : "ui teal basic icon button"}
                                    style="line-height:1em;border-radius:5px !important"
                                >
                                    <i class="send icon" /> Send</button
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    /* Chrome, Safari, Edge, Opera */

    .fieldInput {
        flex: 1;
        margin: 0.5em;
    }

    .fieldCol {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;
    }

    .title {
        font-size: large;
        font-weight: 500;
    }

    .cancelAuth {
        font-size: 22px;
        cursor: pointer;
    }

    .cancelAuth:hover {
        color: crimson;
        transition: 400ms ease-in-out;
        font-size: 24px;
    }

    .segment {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .modalContent {
        margin-top: -10em;
    }
    @media only screen and (min-width: 640px) {
    }
</style>
