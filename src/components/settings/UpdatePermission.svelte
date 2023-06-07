<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import { Notify } from "notiflix";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let updatePermissionLoading = false;

    export let authenticatedUser;

    export let resource;

    export let actionToUpdate;

    const dispatch = createEventDispatcher();

    let confirmable;

    let action;

    let allowed = [];

    let positions = [];

    let allowedConfirmers = [];

    $: {
        if (actionToUpdate) {
            action = actionToUpdate.name;
            allowed = actionToUpdate.allowed;
            confirmable = actionToUpdate.confirmable;
            allowedConfirmers = actionToUpdate.allowedConfirmers;

            //
        }
    }

    // methods
    const cancel = () => {
        dispatch("cancel");
    };

    const close = () => {
        dispatch("close");
    };

    const getPositions = async () => {
        let response = await axios.get(`${apiBaseUrl}getPositions.php`);

        let result = response.data;

        positions = result;

        // console.log(positions);
    };

    // takes the position and index check if it allowed add or removes
    // updated the button
    const handleAllowedPositions = (p, i) => {
        let index = allowed.indexOf(p);

        if (index == -1) {
            allowed.push(p);
            document
                .getElementById(`allowed-pos-${p}-${i}`)
                .classList.remove("basic");
        } else {
            allowed.splice(index, 1);
            document
                .getElementById(`allowed-pos-${p}-${i}`)
                .classList.add("basic");
        }

        allowed = allowed;
    };

    const handleAllowedConfirmers = (p, i) => {
        let index = allowedConfirmers.indexOf(p);

        if (index == -1) {
            allowedConfirmers.push(p);
            document
                .getElementById(`allowed-conf-${p}-${i}`)
                .classList.remove("basic");
        } else {
            allowedConfirmers.splice(index, 1);
            document
                .getElementById(`allowed-conf-${p}-${i}`)
                .classList.add("basic");
        }

        allowedConfirmers = allowedConfirmers;
    };

    const addPermission = async () => {
        let dt = {
            init: authenticatedUser.uid,
            initName: authenticatedUser.name,
            resource: resource.id,
            resourceName: resource.name,
            action: action,
            confirmable: confirmable,
            allowedConfirmers: allowedConfirmers.toString(),
            allowed: allowed.toString(),
        };

        updatePermissionLoading = true;

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "updatePermission.php",
                data: dt,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            // alert(result);
            // console.log(result);

            // window.location.reload();
            if (result.success) {
                Notify.success(result.message);
                close();
            } else {
                Notify.failure(result.message);
            }

            updatePermissionLoading = false;
        } catch (err) {
            console.log(err);

            updatePermissionLoading = false;
        }
    };

    onMount(() => {
        // console.log(payload);
        getPositions();
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            {#if resource}
                <div class="modalContent segment">
                    <div class="titleBar">
                        <div class="title">Create Action ({resource.name})</div>
                        <div class="action">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <i
                                on:click={cancel}
                                class="cancelAuth ri-close-circle-line"
                            />
                        </div>
                    </div>
                    <div class="contentBar">
                        <div class="createActionForm">
                            <form
                                class="ui form"
                                on:submit|preventDefault={addPermission}
                            >
                                <div class="field">
                                    <label for="name">Action</label>
                                    <input
                                        type="text"
                                        name="action"
                                        id="action"
                                        placeholder="Action Name"
                                        required
                                        bind:value={action}
                                    />
                                </div>

                                <div class="field">
                                    <label for="allowed"
                                        >Allowed Positions</label
                                    >
                                    <div class="allowedButtonsContainer">
                                        {#each positions as p, i}
                                            <button
                                                id={`allowed-pos-${p}-${i}`}
                                                on:click={() => {
                                                    handleAllowedPositions(
                                                        p,
                                                        i
                                                    );
                                                }}
                                                type="button"
                                                class={allowed.includes(p)
                                                    ? "ui purple mini button"
                                                    : "ui basic purple mini button"}
                                            >
                                                {p}
                                            </button>
                                        {/each}
                                    </div>
                                </div>

                                <div class="field">
                                    <label for="confirmable">
                                        Confirmable ? <span class="labelDesc">
                                            (Sets In The Action Needs
                                            Confirmation)</span
                                        >
                                    </label>
                                    <div class="ui slider checkbox">
                                        <input
                                            type="checkbox"
                                            name="override"
                                            bind:checked={confirmable}
                                        />
                                        <label for="override"
                                            >Is Action Confirmable?</label
                                        >
                                    </div>
                                </div>

                                {#if confirmable}
                                    <div class="field">
                                        <label for="allowed"
                                            >Allowed Confirmers</label
                                        >
                                        <div class="allowedButtonsContainer">
                                            {#each positions as p, i}
                                                <button
                                                    id={`allowed-conf-${p}-${i}`}
                                                    on:click={() => {
                                                        handleAllowedConfirmers(
                                                            p,
                                                            i
                                                        );
                                                    }}
                                                    type="button"
                                                    class={allowedConfirmers.includes(
                                                        p
                                                    )
                                                        ? "ui purple mini button"
                                                        : "ui basic purple mini button"}
                                                >
                                                    {p}
                                                </button>
                                            {/each}
                                        </div>
                                    </div>
                                {/if}

                                <div
                                    class="field"
                                    style="text-align:center;padding:1em"
                                >
                                    <button class="ui basic teal button">
                                        <i class="send icon" /> Update Permission
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    form {
        max-width: 90% !important;
        /* margin: auto !important; */
    }

    input {
        line-height: 2em !important;
        color: rgba(0, 0, 0, 0.35);
    }

    .title {
        font-size: 22px;
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

    .allowedButtonsContainer {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .allowedButtonsContainer button {
        margin: 0.4em;
        text-transform: capitalize;
    }
    @media only screen and (min-width: 640px) {
    }
</style>
