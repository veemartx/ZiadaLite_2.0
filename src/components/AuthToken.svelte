<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";

    let authTknsString = window.localStorage.ZLUSRTKNS;

    // console.log(authTknsString);

    let authTokens = [];

    let authenticatBtnLoading = false;

    export let authenticatedUser;

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
        dispatch("cancel");
    }

    const handleCheckAuthToken = () => {
        let authToken = `${one}${two}${three}${four}`;

        let authTokensArray = authTokens.map((e) => e.tkn);

        authenticatBtnLoading = true;

        let index = authTokensArray.indexOf(authToken);

        if (index != -1) {
            authenticatedUser = authTokens[index];

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
            Notify.failure("Authentication Failed", {
                ID: "MKA",
                timeout: 1000,
                showOnlyTheLastOne: true,
                cssAnimationStyle: "from-bottom",
                zindex: 1000000000,
            });

            authenticatBtnLoading = false;

            // cancelAuth();
        }
    };

    onMount(() => {
        if (authTknsString != undefined) {
            authTokens = JSON.parse(authTknsString);

            console.log(authTokens);
        }
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Authenticate</div>
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
                            on:submit|preventDefault={handleCheckAuthToken}
                            id="authTokenForm"
                        >
                            <div class="fields">
                                <div class="inp">
                                    <input
                                        type="password"
                                        name="one"
                                        id="one"
                                        required
                                        maxlength="1"
                                        bind:value={one}
                                        placeholder="0"
                                        on:keyup={(e) => {
                                            // console.log(e.target.value);
                                            if (e.target.value != "") {
                                                document
                                                    .getElementById("two")
                                                    .focus();
                                            }
                                        }}
                                    />
                                </div>

                                <div class="inp">
                                    <input
                                        type="password"
                                        name="two   "
                                        id="two"
                                        required
                                        maxlength="1"
                                        bind:value={two}
                                        placeholder="0"
                                        on:keyup={(e) => {
                                            // console.log(e.target.value);
                                            if (e.target.value != "") {
                                                document
                                                    .getElementById("three")
                                                    .focus();
                                            } else {
                                                document
                                                    .getElementById("one")
                                                    .focus();
                                            }
                                        }}
                                    />
                                </div>

                                <div class="inp">
                                    <input
                                        type="password"
                                        name="three"
                                        id="three"
                                        required
                                        maxlength="1"
                                        bind:value={three}
                                        placeholder="0"
                                        on:keyup={(e) => {
                                            // console.log(e.target.value);
                                            if (e.target.value != "") {
                                                document
                                                    .getElementById("four")
                                                    .focus();
                                            } else {
                                                document
                                                    .getElementById("two")
                                                    .focus();
                                            }
                                        }}
                                    />
                                </div>

                                <div class="inp">
                                    <input
                                        type="password"
                                        name="four"
                                        id="four"
                                        required
                                        maxlength="1"
                                        bind:value={four}
                                        placeholder="0"
                                        on:keyup={(e) => {
                                            // console.log(e.target.value);
                                            if (e.target.value != "") {
                                                handleCheckAuthToken();
                                            } else {
                                                document
                                                    .getElementById("three")
                                                    .focus();
                                            }
                                        }}
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

    input {
        line-height: 3em;
        text-align: center;
        color: rgba(0, 0, 0, 0.35);
        width: 4em;
    }

    .inp {
        margin: 1em;
        width: 1em;
        flex: 1;
    }

    .fields {
        display: flex;
        flex-direction: row;
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

    @media only screen and (min-width: 640px) {
    }
</style>
