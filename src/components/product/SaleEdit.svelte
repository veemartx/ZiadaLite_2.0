<script>
    // @ts-nocheck

    import { createEventDispatcher, onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { fade } from "svelte/transition";
    import imageCompression from "browser-image-compression";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import { Notify } from "notiflix";

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

    // vars
    let qtyW;

    let qtyP;

    let soldWholes;

    let soldPieces;

    let receiptNo;

    let saleEditBtnLoading = false;

    // states change

    // methods

    const dispatch = createEventDispatcher();

    const cancelSaleEdit = () => {
        dispatch("cancel");
    };

    const handleSuccess = () => {
        dispatch("success");
    };

    const handleSaleEdit = async () => {
        if (!soldPieces) {
            soldPieces = 0;
        }

        let dt = {
            init: authenticatedUser.uid,
            newQtyWholes: qtyW - soldWholes,
            newQtyPieces: qtyP - soldPieces,
            productId: product.id,
            initName: authenticatedUser.name,
            receiptNo: receiptNo,
            packSize: product.packSize,
            soldWholes: soldWholes,
            soldPieces: soldPieces,
            productName: product.name,
            costPrice: product.price,
            hostBranch:product.branch
        };

        saleEditBtnLoading = true;

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "saleEdit.php",
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

            saleEditBtnLoading = false;
        } catch (err) {
            console.log(err);

            saleEditBtnLoading = false;
        }
    };

    const verifyReceipt = (inputtxt) => {
        var letters = /^[0-9a-zA-Z]+$/;

        const regex = new RegExp(/[QWERTYIOPDFGHJLZXMqwertyiopdfghjlzxm]/);

        // match any characters except those
        if (inputtxt.match(letters)) {
            // check if it includes other characters other that ABCS
            if (regex.test(inputtxt)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    onMount(() => {
        qtyW = Math.floor(product.piecesInStock / product.packSize);

        qtyP = product.piecesInStock % product.packSize;
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">
                        Sale Edit <span class="productName"
                            >[{product.name}]</span
                        >
                    </div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancelSaleEdit}
                            class="cancelSaleEdit ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <form
                        class="ui form"
                        on:submit|preventDefault={handleSaleEdit}
                    >
                        <fieldset>
                            <legend>Available Stock</legend>

                            <div class="two fields">
                                <div class="field fone">
                                    <label for="name">Qty (W)</label>
                                    <input
                                        type="number"
                                        name="qtyw"
                                        id="qtyw"
                                        style="height:2em"
                                        placeholder="Qty W"
                                        bind:value={qtyW}
                                        readonly
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
                                            readonly
                                        />
                                    </div>
                                {/if}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Sold</legend>

                            <div class="two fields">
                                <div class="field fone">
                                    <label for="name">Qty (W)</label>
                                    <input
                                        type="number"
                                        name="qtyw"
                                        id="qtyw"
                                        style="height:2em"
                                        placeholder="Qty W"
                                        max={qtyW}
                                        bind:value={soldWholes}
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
                                            max={qtyP}
                                            bind:value={soldPieces}
                                            required
                                        />
                                    </div>
                                {/if}
                            </div>
                        </fieldset>
                        <br />

                        <div class="field">
                            <label for="receipt">Transaction Receipt No</label>
                            <input
                                type="text"
                                name="receiptNo"
                                id="receiptNo"
                                placeholder="CS123456789"
                                minlength="10"
                                maxlength="12"
                                bind:value={receiptNo}
                                required
                            />
                        </div>

                        <br />
                        <div
                            class="field"
                            style="text-align: center;padding-top:2em"
                        >
                            <button
                                class={saleEditBtnLoading
                                    ? "ui basic teal loading button"
                                    : "ui basic teal button"}
                            >
                                <i class="send icon" /> Update
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

    .cancelSaleEdit {
        font-size: 26px;
        cursor: pointer;
        padding-top: 1em;
    }

    .cancelSaleEdit:hover {
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

    .productName {
        color: var(--ziada-green);
    }

    @media only screen and (min-width: 640px) {
        .segment {
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            width: 60em;
        }

        input {
            /* line-height: 3em; */
            color: rgba(0, 0, 0, 0.35);
            width: 90% !important;
        }

        .fone {
            margin-inline-end: 0.4em !important;
        }

        .ftwo {
            margin-inline-start: 0.4em !important;
        }
    }
</style>
