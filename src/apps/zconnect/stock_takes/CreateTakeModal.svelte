<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import { v4 } from "uuid";
    import axios from "axios";

    import { apiBaseUrl } from "../../../config/config";
    import { getBranches, getLiuDetails } from "../../../scripts/js/methods";
    import { navigate } from "svelte-navigator";

    // props
    export let authenticatedUser = null;

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let createStockTakeBtnLoading = false;

    let stockTakeTypes = ["Annual", "Random"];

    let selectedBranch;

    let selectedTakeType;

    let fieldValues = [];

    let branches = [];

    // let formFields = [];

    // send message to close modal
    const dispatch = createEventDispatcher();

    function handleSuccess() {
        dispatch("success");
    }

    function cancelCreateStockTake() {
        dispatch("cancel");
    }

    const handleCreateStockTake = async () => {
        let dt = {
            init: authenticatedUser.uid,
            initName: authenticatedUser.name,
            branch: selectedBranch,
            type: selectedTakeType,
            takeId: v4(),
            hostBranch: getLiuDetails().b,
        };

        createStockTakeBtnLoading = true;

        try {
            let response = await axios({
                method: "post",
                url: `${apiBaseUrl}core/createStockTake.php`,
                data: dt,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            if (result.success) {
                Notify.success(result.message);
                // handleSuccess();

                // navigate to the new stock take
                navigate(
                    `/apps/zconnect/products/stock-takes/new/${result.takeId}`
                );
            } else {
                Notify.failure(result.message);
            }

            console.log(result);

            createStockTakeBtnLoading = false;
        } catch (err) {
            createStockTakeBtnLoading = false;
            console.log(err);
        }

        console.log(dt);
    };

    onMount(async () => {
        // console.log(payload);
        branches = await getBranches();
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">New Stock Take</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancelCreateStockTake}
                            class="cancelCreateStockTake ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <br />
                    <div class="createTakeForm">
                        <form
                            on:submit|preventDefault={handleCreateStockTake}
                            id="createTakeForm"
                        >
                            <div class="field">
                                <label for="type">Type</label>
                                <select
                                    name="type"
                                    id="type"
                                    bind:value={selectedTakeType}
                                    required
                                >
                                    <option value="">Select Take Type</option>
                                    {#each stockTakeTypes as t}
                                        <option value={t}>{t}</option>
                                    {/each}
                                </select>
                            </div>
                            <br />
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
                                <div class="field">
                                    <label for="random units"
                                        >Random Units (30+, Increments Of 10)</label
                                    >
                                    <input
                                        type="number"
                                        name="randomUnits"
                                        id="randomUnits"
                                        min="2"
                                        step="10"
                                        placeholder="30"
                                        required
                                    />
                                </div>
                            </div>

                            <div
                                class="fieldInput"
                                style="padding-top: 1.5em;text-align:center;"
                            >
                                <button
                                    class={createStockTakeBtnLoading
                                        ? "ui teal basic loading icon button"
                                        : "ui teal basic icon button"}
                                    style="line-height:1em;border-radius:5px !important"
                                >
                                    <i class="plus icon" /> Create</button
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

    .cancelCreateStockTake {
        font-size: 22px;
        cursor: pointer;
    }

    .cancelCreateStockTake:hover {
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
