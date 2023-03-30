<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import Breadcrumbs from "./Breadcrumbs.svelte";
    import Notiflix, { Confirm, Notify, Report } from "notiflix";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";
    import { v4 } from "uuid";
    import AssistedProductCreationModal from "./AssistedProductCreationModal.svelte";
    import AdditionsIcon from "../../assets/icons/product-additions.png";
    import AuthToken from "../AuthToken.svelte";
    import { navigate } from "svelte-navigator";

    let ZL_LIU = window.localStorage.ZL_LIU;

    if (ZL_LIU) {
        ZL_LIU = JSON.parse(ZL_LIU);
    }

    let showAuthTokenModal = true;

    // products to be passed to assisted additions
    let productsList = [];

    //
    let approvedDeadStockAdditions = [];

    let excelProductsList = [];

    let authenticatedUser;

    let crumbs = {
        title: "Assisted Product Creation",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Create Product",
                url: "/products/new",
            },
        ],
    };

    let showAssistedProductCreationModal = false;

    let expiryMonth;

    let productType;

    let productCode;

    let productMainImage = [];

    let packSize;

    let productName;

    let costPrice;

    let expiry = true;

    let qtyP;

    let qtyW;

    let addCreateProductListBtn = false;

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        // showAuthTokenModal = false;
        if (confirm("Addition Authentication cannot be cancelled. Go back?")) {
            navigate(-1);
        }
    };

    const clearForm = (id) => {
        let form = document.getElementById(id);

        form.reset();
    };

    const handleCreateProduct = async () => {
        // checks
        if (!productName) {
            Notify.failure("Product Name Cannot Be Empty");
            return;
        }

        if (!productCode) {
            Notify.failure("Product Name Cannot Be Empty");
            return;
        }

        if (!costPrice) {
            Notify.failure("Cost Price Cannot Be Empty");
            return;
        }

        if (productMainImage.length == 0) {
            Report.failure("Main Image", "Select Product Image", "Okay");

            return;
        }

        let fd = new FormData();

        // let fileType = productMainImage[0].name.split(".")[1];

        // gallery
        fd.append("productId", v4());

        // append image file
        fd.append("productImage", productMainImage[0]);

        // validate the inputs
        fd.append("productName", productName);
        fd.append("productType", productType);
        fd.append("productCode", productCode);
        fd.append("costPrice", costPrice);
        fd.append("packSize", packSize);
        fd.append("qtyW", qtyW);
        fd.append("transactionInit", authenticatedUser.uid);
        fd.append("branch", ZL_LIU.b);

        if (expiryMonth) {
            fd.append("expiryMonth", expiryMonth);
        }

        if (qtyP) {
            fd.append("qtyP", qtyP);
        }

        addCreateProductListBtn = true;

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "createProduct.php",
                data: fd,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            alert(result);

            window.location.reload();

            addCreateProductListBtn = false;
        } catch (err) {
            console.log(err);

            addCreateProductListBtn = false;
        }
    };

    const handeleSelected = (e) => {
        let selected = e.detail;

        productName = selected.pn;

        productCode = selected.pc;

        costPrice = selected.cp;

        if (selected.ps != 0) {
            packSize = selected.ps;
        }

        showAssistedProductCreationModal = false;

        // console.log(selected);
    };

    const getDeadStockApprovedList = async () => {
        let dt = {
            branch: ZL_LIU.b,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getApprovedAdditions.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            approvedDeadStockAdditions = res;
        } catch (err) {
            console.log(err);
        }
    };

    const getProductsList = async () => {
        let dt = {
            branch: ZL_LIU.b,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getProductsList.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            excelProductsList = res;
        } catch (err) {
            console.log(err);
        }
    };

    onMount(async () => {
        getDeadStockApprovedList();
        getProductsList();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="breadcrumbs">
                <Breadcrumbs {crumbs} />
            </div>

            <!-- the big form -->
            <form
                id="addProductListForm"
                on:submit|preventDefault={handleCreateProduct}
            >
                <div class="mainContainer">
                    <div class="leftCol">
                        <div class="segment">
                            <div class="titlebar">
                                <div class="segTitle">Product Details</div>
                            </div>
                            .
                            <br />
                            <div class="">
                                <div class="field required">
                                    <label for=""> Product Type </label>
                                    <select
                                        name="productType"
                                        id="productType"
                                        on:change={(e) => {
                                            if (e.target.value != "") {
                                                productType = e.target.value;

                                                if (
                                                    productType == "Dead Stock"
                                                ) {
                                                    productsList =
                                                        approvedDeadStockAdditions;
                                                } else {
                                                    productsList =
                                                        excelProductsList;
                                                }

                                                showAssistedProductCreationModal = true;
                                            }
                                        }}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Dead Stock"
                                            >Dead Stock</option
                                        >
                                        <option value="Short Exp"
                                            >Short Exp</option
                                        >
                                    </select>
                                </div>
                            </div>
                            <div class="">
                                <div class="field required">
                                    <label for=""> Product Title </label>
                                    <input
                                        type="text"
                                        name="productName"
                                        id="productName"
                                        placeholder="Product Name"
                                        required
                                        readonly
                                        bind:value={productName}
                                    />
                                </div>
                            </div>

                            <div class="">
                                <div class="field required">
                                    <label for=""> Product Code </label>
                                    <input
                                        type="text"
                                        name="productCode"
                                        id="productCode"
                                        placeholder="Product Code"
                                        required
                                        readonly
                                        bind:value={productCode}
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="segment">
                            <div class="titlebar ">
                                <div class="segTitle">Product Gallery</div>

                                <div class="actionBtns" />
                            </div>
                            <br />
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

                                        Select Image
                                        <input
                                            style="display: none;"
                                            type="file"
                                            name="productMainImage"
                                            id="productMainImage"
                                            accept=".jpeg,.png,.webp,jpg"
                                            bind:files={productMainImage}
                                        />
                                    </div>

                                    <div
                                        class="fieldInput"
                                        style="font-size: 12px;"
                                    >
                                        <br />
                                        <div
                                            class="selectedProductGalleryPreview"
                                        >
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
                                                            {file.name}({Math.ceil(
                                                                file.size / 1024
                                                            )}
                                                            KB)
                                                        </p>
                                                    </div>
                                                {/each}
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="rightCol">
                        <div class="segment">
                            <div class="titleBar">
                                <div class="title">Product Extra Details</div>
                            </div>

                            <div class="">
                                <div class="fieldInputs">
                                    <div class="fieldInput">
                                        <label
                                            for="expiry"
                                            style="color:crimson;font-weight:bold;"
                                            >Has Expiry?</label
                                        >

                                        <div class="formInput">
                                            <div class="ui toggle checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="expiry"
                                                    checked={expiry}
                                                    on:change={() => {
                                                        expiry = !expiry;
                                                    }}
                                                />
                                                <label for="expiry" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="fieldInput">
                                        {#if expiry}
                                            <label for="name">Expiry Date</label
                                            >

                                            <div class="formInput">
                                                <input
                                                    type="month"
                                                    name="expiryMonth"
                                                    id="expiryMonth"
                                                    required
                                                    bind:value={expiryMonth}
                                                />
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="segment">
                            <div class="titlebar ">
                                <div class="segTitle">Product Details</div>
                            </div>

                            <br />

                            <div class="fieldInputs">
                                <div class="fieldInput">
                                    <label for="name">Pack Size</label>

                                    <div class="formInput">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            bind:value={packSize}
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="fieldInput">
                                    <label for="name">Cost Price</label>

                                    <div class="formInput">
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            bind:value={costPrice}
                                            readonly
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="fieldInputs">
                                <div class="fieldInput">
                                    <label for="name">Qty (W)</label>

                                    <div class="formInput">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            bind:value={qtyW}
                                            required
                                        />
                                    </div>
                                </div>

                                {#if packSize > 1}
                                    <div class="fieldInput">
                                        <label for="name">Qty (P)</label>

                                        <div class="formInput">
                                            <input
                                                type="number"
                                                placeholder="0"
                                                bind:value={qtyP}
                                            />
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <div class="segment">
                            <div
                                class=""
                                style="padding:1em;text-align:center;"
                            >
                                <button
                                    class={addCreateProductListBtn
                                        ? "ui teal mini loading button"
                                        : "ui teal mini button"}
                                >
                                    <i class="send icon" /> Create Product
                                </button>

                                <button
                                    type="button"
                                    class="ui red mini button"
                                >
                                    <i class="x icon" /> Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <!-- the big form -->
        </div>
    </div>
</main>

<!-- auth token modal  -->
{#if showAuthTokenModal}
    <AuthToken
        bind:authenticatedUser
        on:success={authTokenSuccess}
        on:cancel={cancelAuthentication}
    />
{/if}
<!-- auth token modal  -->

<!-- assisted product creation modal -->
{#if showAssistedProductCreationModal}
    <AssistedProductCreationModal
        {productsList}
        on:close={() => {
            showAssistedProductCreationModal = false;
        }}
        on:selected={(e) => {
            handeleSelected(e);
        }}
    />
{/if}

<!-- assisted product creation modal -->
<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
    }

    .leftCol {
        flex: 7;
        display: flex;
        flex-direction: column;
    }

    .rightCol {
        flex: 3;
    }

    .segment {
        margin-bottom: 1.6em;
        /* background: orange; */
        width: 100%;
    }

    .segTitle {
        font-weight: 500;
    }

    input {
        line-height: 3em !important;
    }
    input:focus {
        border: none !important;
    }

    .field {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    label {
        padding-bottom: 0.5em;
        font-size: 15px;
        font-weight: 400;
    }

    .labelSubtext {
        font-size: 13px;
        opacity: 0.5;
    }

    .titlebar {
        border-bottom: 1px solid rgba(128, 128, 128, 0.188);
    }

    .imageUploadZone {
        background-color: rgba(23, 23, 23, 0.095);
        border-radius: 5px;
        min-height: 10em;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(128, 128, 128, 0.309);

        flex-direction: column;
    }

    .fieldInputs {
        display: flex;
    }

    .fieldInput {
        flex: 1;
        margin: 0.4em;
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

    .toggle {
        padding-top: 1em;
    }
    @media only screen and (min-width: 640px) {
        .mainContainer {
            display: flex;
            flex-direction: row;
        }

        .rightCol {
            flex: 3;
            padding-inline: 1em;
            margin-left: 0.8em;
        }

        .leftCol {
            margin-right: 0.8em;
        }
    }
</style>
