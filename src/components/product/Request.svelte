<script>
    // @ts-nocheck

    import { createEventDispatcher, onMount } from "svelte";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import { Notify } from "notiflix";
    import { v4 } from "uuid";

    Notify.init({
        width: "300px",
        position: "right-top",
        closeButton: false,
        zindex: 1000000,
    });

    // props
    export let product;

    export let authenticatedUser;

    // consts
    let ZL_LIU = window.localStorage.ZL_LIU;

    // vars
    let productName;

    let qtyW;

    let qtyP;

    let requestBtnLoading = false;

    let availableWholes;

    let availablePieces;

    let liu;

    let messageOptions = {
        closable: false,
    };

    // states change
    if (ZL_LIU) {
        liu = JSON.parse(ZL_LIU);

        // console.log(liu);
    }

    // methods

    const dispatch = createEventDispatcher();

    const cancelAdjust = () => {
        dispatch("cancel");
    };

    const handleSuccess = () => {
        dispatch("success");
    };

    const handleProductRequest = async () => {
        let dt = {
            productName: productName,
            productType:product.type,
            expiryDate:product.expiryDate,
            init: authenticatedUser.uid,
            initName: authenticatedUser.name,
            productId: product.id,
            channel: "universal",
            requestingBranch: liu.b,
            requestedBranch: product.branch,
            requestedWholes: qtyW,
            requestedPieces: qtyP ? qtyp : 0,
            target: product.branch,
            messageId: v4(),
            requestId: v4(),
            recipient: product.branch,
            sender: authenticatedUser.uid,
            options: JSON.stringify(messageOptions),
        };

        requestBtnLoading = true;

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "request.php",
                data: dt,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            // alert(result);
            if (result.success) {
                Notify.success(result.message);

                handleSuccess();
            } else {
                Notify.failure(result.message);
            }

            requestBtnLoading = false;
        } catch (err) {
            console.log(err);

            requestBtnLoading = false;
        }
    };

    onMount(() => {
        productName = product.name;

        availableWholes = Math.floor(product.piecesInStock / product.packSize);

        availablePieces = product.piecesInStock % product.packSize;

        console.log(authenticatedUser)
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Product Request</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancelAdjust}
                            class="cancelAdjust ri-close-circle-line"
                        />
                    </div>
                </div>

                <div class="contentBar">
                    <div class="productDetailsCol">
                        <div class="productName">
                            <span class="pdc"> Product:</span>
                            {product.name}
                        </div>
                    </div>
                    <div class="productDetailsCol">
                        <div class="packSize">
                            <span class="pdc"> Pack Size:</span>
                            {product.packSize}
                        </div>

                        <div class="availableQty">
                            <span class="pdc"> Available Qty:</span>
                            {availableWholes}W {availablePieces}P
                        </div>
                    </div>
                </div>
                <div class="contentBar">
                    <form
                        class="ui form"
                        on:submit|preventDefault={handleProductRequest}
                    >
                        <div class="two fields">
                            <div class="field fone">
                                <label for="name">Qty (W)</label>
                                <input
                                    type="number"
                                    name="qtyw"
                                    id="qtyw"
                                    placeholder="Qty W"
                                    bind:value={qtyW}
                                    max={availableWholes}
                                    required
                                />
                            </div>

                            {#if product.packSize > 1}
                                <div class="field ftwo">
                                    <label for="name">Qty (P)</label>
                                    <input
                                        type="number"
                                        name="qtyp"
                                        id="qtyp"
                                        style="height:2em"
                                        placeholder="Qty P"
                                        bind:value={qtyP}
                                        max={availablePieces}
                                        required
                                    />
                                </div>
                            {/if}
                        </div>
                        <div
                            class="field"
                            style="text-align: center;padding-top:1em"
                        >
                            <button
                                class={requestBtnLoading
                                    ? "ui basic purple loading button"
                                    : "ui basic purple button"}
                            >
                                <i class="send icon" /> Request
                            </button>
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

    form {
        padding: 1em;
    }

    input {
        /* line-height: 2em !important; */
        color: rgba(0, 0, 0, 0.35);
        width: 90% !important;
    }

    .title {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-primary-light);
    }

    .cancelAdjust {
        font-size: 26px;
        cursor: pointer;
        padding-top: 1em;
    }

    .cancelAdjust:hover {
        color: crimson;
        transition: 400ms ease-in-out;
        font-size: 24px;
    }

    .segment {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        width: 80%;
        max-height: 90vh;
        overflow: auto;
    }

    .modalContent {
        margin-top: -1em;
    }

    .productDetailsCol {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
    }

    .productName {
        color: purple;
    }

    .packSize {
        color: brown;
    }

    .availableQty {
        color: var(--ziada-green);
    }

    .pdc {
        color: black;
    }
    @media only screen and (min-width: 640px) {
        .segment {
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            width: 60em;
        }

        input {
            /* line-height: 3em; */
            color: rgba(0, 0, 0, 0.35);
            width: 96% !important;
        }

        .fone {
            margin-inline-end: 0.4em !important;
        }

        .ftwo {
            margin-inline-start: 0.4em !important;
        }

        .productDetailsCol {
            justify-content: flex-start;
            padding: 0.5em;
        }

        .availableQty {
            margin-left: 1em;
        }
    }
</style>
