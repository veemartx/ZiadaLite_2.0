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
    let productImageUrl = "../../assets/images/placeholder.jpeg";

    let productName;

    let productCode;

    let expiryDate;

    let productType;

    let qtyW;

    let qtyP;

    let costPrice;

    let productMainImage = [];

    let compressedProductImage;

    let compressingImageLoader = false;

    let adjustBtnLoading = false;

    const imageCompressorOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 768,
        useWebWorker: true,
        initialQuality: 0.3,
    };

    // states change
    $: {
        if (productMainImage.length > 0) {
            // console.log(productMainImage[0]);
            compressImage();
        }
    }

    // methods

    const dispatch = createEventDispatcher();

    const cancelAdjust = () => {
        dispatch("cancel");
    };

    const handleSuccess = () => {
        dispatch("success");
    };

    const handleProductAdjust = async () => {
        let fd = new FormData();
        // append
        if (compressedProductImage) {
            let producImage = new File(
                [compressedProductImage],
                compressedProductImage.name
            );

            // append image file
            fd.append("productImage", producImage);
        }

        fd.append("type", productType);
        fd.append("productName", productName);
        fd.append("expiryDate", expiryDate);
        fd.append("packSize", product.packSize);
        fd.append("init", authenticatedUser.uid);
        fd.append("productId", product.id);

        if (!qtyP) {
            fd.append("pieces", 0);
        } else {
            fd.append("pieces", qtyP);
        }

        fd.append("wholes", qtyW);

        adjustBtnLoading = true;

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "normalAdjust.php",
                data: fd,
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

            adjustBtnLoading = false;
        } catch (err) {
            console.log(err);

            adjustBtnLoading = false;
        }
    };

    const compressImage = async () => {
        const imageFile = productMainImage[0];

        compressingImageLoader = true;

        // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        // console.log(`originalFile size ${imageFile.size / 1024} KB`);
        try {
            const compressedFile = await imageCompression(
                imageFile,
                imageCompressorOptions
            );
            // console.log(
            //     "compressedFile instanceof Blob",
            //     compressedFile instanceof Blob
            // ); // true
            // console.log(`compressedFile size ${compressedFile.size / 1024} KB`); // smaller than maxSizeMB

            compressedProductImage = compressedFile;

            compressingImageLoader = false;
        } catch (error) {
            compressingImageLoader = true;

            console.log(error);
        }
    };

    onMount(() => {
        productName = product.name;
        productCode = product.code;
        costPrice = product.price;
        productType = product.type;
        expiryDate = product.expiryDate;

        productImageUrl = product.image;

        qtyW = Math.floor(product.piecesInStock / product.packSize);

        qtyP = product.piecesInStock % product.packSize;
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Normal Adjust</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancelAdjust}
                            class="cancelAdjust ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <div class="adjustMessage">
                        <div class="message">
                            To Edit Item Details Use Excel List Module
                        </div>

                        <div class="action">
                            <Link to="/products/list">
                                <button
                                    class="ui basic icon mini icon red button"
                                >
                                    <i class="right arrow icon" /> Here
                                </button>
                            </Link>
                        </div>
                    </div>

                    <form
                        class="ui form"
                        on:submit|preventDefault={handleProductAdjust}
                    >
                        <div class="two fields">
                            <div class="field fone">
                                <label for="name">Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    id="expiryDate"
                                    placeholder="Expiry Date"
                                    bind:value={expiryDate}
                                    required
                                />
                            </div>

                            <!-- product type can only be updated by admins -->
                            {#if authenticatedUser.position == "admin"}
                                <div class="field ftwo">
                                    <label for="Product Type"
                                        >Product Type</label
                                    >
                                    <select
                                        name="prodcutType"
                                        id="productType"
                                        bind:value={productType}
                                    >
                                        <option value="Dead Stock"
                                            >Dead Stock</option
                                        >
                                        <option value="Short Exp"
                                            >Short Exp</option
                                        >
                                    </select>
                                </div>
                            {/if}

                            <!-- product type can only be updated by admins -->
                        </div>

                        <div class="two fields">
                            <div class="field fone">
                                <label for="name">Qty (W)</label>
                                <input
                                    type="number"
                                    name="qtyw"
                                    id="qtyw"
                                    placeholder="Qty W"
                                    bind:value={qtyW}
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
                                        required
                                    />
                                </div>
                            {/if}
                        </div>

                        <div class="">
                            <div class="field">
                                <label for=""> Product Image </label>

                                <div
                                    id="imageUploadZone"
                                    class="imageUploadZone"
                                >
                                    <div class="">
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <img
                                            src={productImageUrl}
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
                                    <input
                                        style="display: none;"
                                        type="file"
                                        name="productMainImage"
                                        id="productMainImage"
                                        accept=".jpeg,.png,.webp,.jpg"
                                        bind:files={productMainImage}
                                    />
                                </div>

                                <div
                                    class="fieldInput"
                                    style="font-size: 12px;"
                                >
                                    {#if compressingImageLoader}
                                        <div
                                            transition:fade
                                            class="compressingImageMessage"
                                        >
                                            <div class="">
                                                Compressing Product Image.
                                                Please Wait
                                            </div>
                                            <div class="loadingSpinner">
                                                <span style="font-size: 25px;">
                                                    <i
                                                        class="ri-loader-line"
                                                    /></span
                                                >

                                                <div class="loader" />
                                            </div>
                                        </div>
                                    {/if}

                                    <br />
                                    <div class="selectedProductGalleryPreview">
                                        {#if productMainImage}
                                            {#each Array.from(productMainImage) as file}
                                                <!-- read the file  -->
                                                <div class="preview">
                                                    <img
                                                        src={URL.createObjectURL(
                                                            file
                                                        )}
                                                        alt="preview"
                                                    />

                                                    <p>
                                                        Original: {file.name}({Math.ceil(
                                                            file.size / 1024
                                                        ) > 1024
                                                            ? Math.ceil(
                                                                  file.size /
                                                                      1024 /
                                                                      1024
                                                              ) + "MB"
                                                            : Math.ceil(
                                                                  file.size /
                                                                      1024
                                                              ) + "KB"})
                                                    </p>
                                                </div>
                                            {/each}
                                        {/if}

                                        <!-- compressed -->
                                        {#if compressedProductImage}
                                            <div class="preview">
                                                <img
                                                    id="compressedImagePreview"
                                                    src={URL.createObjectURL(
                                                        compressedProductImage
                                                    )}
                                                    alt="preview"
                                                />

                                                <p>
                                                    Compressed: {compressedProductImage.name}({Math.ceil(
                                                        compressedProductImage.size /
                                                            1024
                                                    )}
                                                    KB)
                                                </p>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="field"
                            style="text-align: center;padding-top:1em"
                        >
                            <button
                                class={adjustBtnLoading
                                    ? "ui basic purple loading button"
                                    : "ui basic purple button"}
                            >
                                <i class="send icon" /> Adjust
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

    .adjustMessage {
        background: rgba(173, 36, 36, 0.158);
        padding: 1em;
        border: 1px solid red;
        border-radius: 5px;
        color: crimson;
        margin: 1em;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .action button {
        margin-top: -1em;
        float: right;
    }

    .compressingImageMessage {
        background-color: rgba(11, 159, 51, 0.251);
        padding: 1em;
        font-weight: 600;
        text-align: center;
        color: rgb(42, 130, 83);
        margin-bottom: 0.5em;
        margin-top: 1em;
    }

    .selectedProductGalleryPreview {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .preview {
        text-align: center;
    }

    .preview img {
        width: 100px;
        height: auto;
    }

    .imageUploadZone {
        background-color: rgba(23, 23, 23, 0.095);
        border-radius: 5px;
        min-height: 8em;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(128, 128, 128, 0.309);

        flex-direction: column;
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

        .adjustMessage {
            flex-direction: row;
        }

        .action button {
            margin-top: 0;
        }
    }
</style>
