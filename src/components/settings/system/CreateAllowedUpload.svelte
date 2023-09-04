<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";

    let authenticatBtnLoading = false;

    let authenticatedUser;

    let fileType;

    // an array of tokens on which to authenticate against
    export let payload = [];

    let one;
    let two;
    let three;
    let four;

    // send message to close modal
    const dispatch = createEventDispatcher();

    function handleSuccess() {
        dispatch("success");
    }

    function cancelAuth() {
        Notify.warning(cancelMessage, {
            ID: "MKA",
            timeout: 4000,
            showOnlyTheLastOne: true,
            cssAnimationStyle: "from-bottom",
            zindex: 1000000000,
        });

        dispatch("cancel");
    }

    const handleCreateAllowedUpload = () => {
        let authToken = `${one}${two}${three}${four}`;

        let authTokensArray = payload.map((e) => e.token);

        authenticatBtnLoading = true;

        let index = authTokensArray.indexOf(authToken);

        if (index != -1) {
            authenticatedUser = payload[index];

            handleSuccess();

            Notify.success("Authentication Successul", {
                ID: "MKA",
                timeout: 1000,
                showOnlyTheLastOne: true,
                cssAnimationStyle: "from-bottom",
                zindex: 1000000000,
            });

            authenticatBtnLoading = false;
        } else {
            Notify.failure(errorMessage, {
                ID: "MKA",
                timeout: 4000,
                showOnlyTheLastOne: true,
                cssAnimationStyle: "from-bottom",
                zindex: 1000000000,
            });

            authenticatBtnLoading = false;

            // cancelAuth();
        }
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
                    <div class="title">Create Allowed Upload File Type</div>
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
                    <div class="createAllowedUploadForm">
                        <form
                            on:submit|preventDefault={handleCreateAllowedUpload}
                            id="createAllowedUploadForm"
                        >
                            <div class="fieldInput">
                                <div class="field">
                                    <label for="type">File Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        id="fileType"
                                        placeholder="Images"
                                    />
                                </div>
                                <br />
                                <div class="field">
                                    <label for="type"
                                        >Allowed Types (Comma Separated eg.
                                        .png,.jpg)</label
                                    >
                                    <input
                                        type="text"
                                        name="type"
                                        id="fileType"
                                        placeholder=".abc,.cdf,.etc"
                                    />
                                </div>
                            </div>
                            <div
                                class="fieldInput"
                                style="padding-top: 1.5em;text-align:center;"
                            >
                                <button
                                    class={authenticatBtnLoading
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .fieldInput {
        flex: 1;
        margin: 0.5em;
    }

    .title {
        font-size: 17px;
        font-weight: 600;
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
