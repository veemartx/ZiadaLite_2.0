<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import AdditionsIcon from "../../assets/icons/product-additions.png";

    // props
    export let authenticatedUser;

    // vars
    let authenticatBtnLoading = false;

    let additionMonth;

    let approvedDoc = [];

    // state change listeners

    // consts
    const dispatch = createEventDispatcher();

    // methods
    const handleSuccess = () => {
        dispatch("success");
    };

    const handleClose = () => {
        dispatch("close");
    };

    const uploadApprovedAdditions = async () => {
        let fd = new FormData();

        fd.append("month", additionMonth);
        fd.append("init", authenticatedUser.uid);
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
                    <div class="title">Approved Additions</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={handleClose}
                            class="close ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <form class="ui form">
                        <div class="field">
                            <label for="month">Month</label>
                            <input
                                type="month"
                                name="month"
                                id="month"
                                bind:value={additionMonth}
                            />
                        </div>

                        <div class="">
                            <div class="field">
                                <label for="">
                                    Product Image <br />
                                    <span class="labelSubtext"
                                        >Add Product Image</span
                                    >
                                </label>

                                <div
                                    id="imageUploadZone"
                                    class="imageUploadZone"
                                >
                                    <div class="">
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <img
                                            src={AdditionsIcon}
                                            width="48"
                                            height="48"
                                            alt="upload icon"
                                            on:click={() => {
                                                document
                                                    .getElementById(
                                                        "productMainImage"
                                                    )
                                                    .click();
                                            }}
                                        />
                                    </div>

                                    Select File
                                    <input
                                        style="display: none;"
                                        type="file"
                                        name="productMainImage"
                                        id="productMainImage"
                                        accept=".xlsx,.xls"
                                        bind:files={approvedDoc}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
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

    .close {
        font-size: 22px;
        cursor: pointer;
    }

    .close:hover {
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
