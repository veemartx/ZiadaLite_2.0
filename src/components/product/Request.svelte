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

    //
    let totalAvailableUnits;

    // total request units
    // make sure this number is less than the  other number
    let totalRequestUnits;

    // these control wholes and pieces being requested
    let maxWholesAvailableToRequest = 0;

    let maxPiecesAvailableToRequest = 0;

    $: {
        if (product) {
            updateRequestUnits(
                qtyW,
                qtyP,
                product.packSize,
                product.piecesInStock
            );
        }
    }

    let liu;

    let messageOptions = {
        closable: false,
    };

    // states change
    if (ZL_LIU) {
        liu = JSON.parse(ZL_LIU);

        // console.log(liu);
    }

    // listen for qty changes

    // methods

    const dispatch = createEventDispatcher();

    const cancelAdjust = () => {
        dispatch("cancel");
    };

    const handleSuccess = () => {
        dispatch("success");
    };

    const updateRequestUnits = (qtyW, qtyP, packSize, totalAvailableUnits) => {
        let wholes = qtyW ? qtyW : 0;

        let pieces = qtyP ? qtyP : 0;

        totalRequestUnits = wholes * packSize + pieces;

        let remainingRequestableUnits = totalAvailableUnits - totalRequestUnits;

        maxWholesAvailableToRequest = Math.floor(
            remainingRequestableUnits / packSize
        );

        maxPiecesAvailableToRequest = remainingRequestableUnits;
    };

    const handleProductRequest = async () => {
        // qty checks

        if (!qtyW && !qtyP) {
            Notify.failure("Request Quantity Cannot Be Empty");

            return;
        }

        let dt = {
            productName: productName,
            productType: product.type,
            expiryDate: product.expiryDate,
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
            options: messageOptions,
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

        totalAvailableUnits = product.piecesInStock;

        // console.log(authenticatedUser);
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

                        <div class="maxRequestQty">
                            <span class="pdc">
                                Max Requestable Units (W/P):</span
                            >
                            {maxWholesAvailableToRequest}W
                            {#if product.packSize != 1}
                                {maxPiecesAvailableToRequest}P
                            {/if}
                        </div>
                    </div>
                </div>

                {#if totalRequestUnits > totalAvailableUnits}
                    <div class="qtyMessage">
                        <div class="message">
                            Cannot Request More Than Currently In Stock
                        </div>
                    </div>
                {/if}

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
                                    max={maxWholesAvailableToRequest}
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
                                        max={maxPiecesAvailableToRequest}
                                    />
                                </div>
                            {/if}
                        </div>
                        <div
                            class="field"
                            style="text-align: center;padding-top:1em"
                        >
                            {#if totalRequestUnits <= totalAvailableUnits}
                                <button
                                    class={requestBtnLoading
                                        ? "ui basic purple loading button"
                                        : "ui basic purple button"}
                                >
                                    <i class="send icon" /> Request
                                </button>
                            {/if}
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

    .maxRequestQty {
        color: crimson;
        padding-left: 1em;
    }

    .message {
        color: crimson;
        background: rgba(255, 0, 0, 0.119);
        padding: 1em;
        border: 1px solid crimson;
        border-radius: 5px;
        margin: 1em;
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
