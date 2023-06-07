<script>
    // @ts-nocheck

    import axios from "axios";
    import { onMount } from "svelte";
    import { useLocation } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import {
        formatDate,
        getPermittedTokens,
        updateCrumbs,
    } from "../../scripts/js/methods";
    import LeftIconStatWidgets from "../../widgets/LeftIconStatWidgets.svelte";
    import ProductActions from "./ProductActions.svelte";
    import TransactionHistory from "./TransactionHistory.svelte";
    import * as htmlToImage from "html-to-image";
    // import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import download from "downloadjs";
    import AuthToken from "../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../scripts/js/messages";

    const location = useLocation();

    let authTokens = [];

    let authenticatedUser;

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    $: {
        if ($localDbStoreUsers && $localDbStorePermissions) {
            // get allowed tokens
            authTokens = getPermittedTokens(
                RESOURCE,
                ACTION,
                $localDbStoreUsers,
                $localDbStorePermissions
            );
        }
    }

    let showAuthTokenModal = false;

    const RESOURCE = "products";

    const ACTION = "delete";

    const AUTH_CANCEL_MESSAGE =
        "Addition Authentication Cannot Be Cancelled. Returning";

    let productId;

    let product;

    let isImageLoaded = false;

    let productImageUrl = "../../assets/images/placeholder.jpeg";

    let productStats = [];

    let crumbs = {
        title: "Product",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Product",
                url: "/product/pd/" + productId,
            },
        ],
    };

    const handleImageLoad = () => {
        isImageLoaded = true;
    };

    const takeScreenshot = () => {
        htmlToImage
            .toPng(document.getElementById("content"))
            .then(function (dataUrl) {
                download(dataUrl, "content.png");
            });
    };

    $: {
        window.scrollTo(0, 0);

        if ($location) {
            getProduct($location);
        }
    }

    $: {
        if (product) {
            updateStats(product);
        }
    }

    const getProduct = async ($location) => {
        let pathnameArr = $location.pathname.split("/");

        let pid = pathnameArr[pathnameArr.length - 1];

        productId = pid;

        let dt = {
            p_id: productId,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getProduct.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            product = res;

            productImageUrl = product.image;

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const updateStats = (product) => {
        productStats = [
            {
                name: "Cost Price",
                value: product.price,
                icon: "ri-currency-line",
            },

            {
                name: "Qty",
                value:
                    Math.floor(
                        product.piecesInStock / parseInt(product.packSize)
                    ) +
                    "W" +
                    " " +
                    (product.piecesInStock % parseInt(product.packSize)) +
                    "P",
                icon: "ri-currency-line",
            },
            {
                name: "Available In",
                value: product.availableIn,
                icon: "ri-currency-line",
            },
            {
                name: "Total Sales",
                value: product.totalSales,
                icon: "ri-currency-line",
            },
        ];
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
        navigate("/");
    };

    onMount(() => {
        updateCrumbs(crumbs);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content" id="content">
            {#if product}
                <div class="titleBar">
                    <div class="title">
                        {product.name}
                    </div>

                    <div class="action">
                        <button
                            on:click={takeScreenshot}
                            class="ui mini icon basic green button"
                        >
                            <i class="camera icon" />
                        </button>
                    </div>
                </div>

                <div class="productContainer">
                    <div class="imageCol">
                        <img
                            src={`${productImageUrl}`}
                            alt=""
                            on:load={handleImageLoad}
                        />
                    </div>
                    <div class="detailsCol">
                        <div class="productName">
                            Name: {product.name
                                ? product.name.toLowerCase()
                                : ""}
                        </div>

                        <div class="productDetailCol">
                            <div
                                class="productType"
                                style={product.type == "Dead Stock"
                                    ? "color:crimson"
                                    : "color:orangered"}
                            >
                                Type: {product.type}
                            </div>

                            <div class="productCode">
                                Code: {product.code}
                            </div>

                            <div class="productBranch">
                                Branch: {product.branch}
                            </div>
                        </div>

                        {#if product.expiryDate}
                            <!-- some det expiry,added,added by -->
                            <div class="productDetailCol">
                                <div class="pedCol">
                                    <span class="pcText"> Expiry Date:</span>
                                    <span class="pcVal"
                                        >{formatDate(product.expiryDate)}</span
                                    >
                                </div>

                                <div class="pedCol">
                                    <span class="pcText"> Added On: </span>
                                    <span class="pcVal"
                                        >{formatDate(product.addedOn)}</span
                                    >
                                </div>

                                <div class="pedCol">
                                    <span class="pcText"> Added By:</span>
                                    <span class="pcVal">
                                        {product.addedBy}</span
                                    >
                                </div>
                            </div>
                            <!-- some det expiry,added,added by -->

                            <!-- some det booked by : booked on-->
                            <!-- booked -->

                            {#if product.booked == "1"}
                                <div class="productDetailColTitle">Booked</div>

                                <div class="productDetailCol">
                                    <div class="pedCol">
                                        <span class="pcText"> By:</span>
                                        <span class="pcVal"
                                            >{product.bookedBy}</span
                                        >
                                    </div>

                                    <div class="pedCol">
                                        <span class="pcText">In:</span>
                                        <span class="pcVal">{product.from}</span
                                        >
                                    </div>

                                    <div class="pedCol">
                                        <span class="pcText">Date:</span>
                                        <span class="pcVal"
                                            >{formatDate(
                                                product.bookedOn
                                            )}</span
                                        >
                                    </div>
                                </div>
                            {/if}

                            <!-- booked -->
                            <!-- some det booked by : booked on-->

                            <!-- some det pushed by : pushed on-->
                            <!-- pushed -->
                            {#if product.pushed}
                                <div class="productDetailColTitle">Pushed</div>
                                <div class="productDetailCol">
                                    <div class="pedCol">
                                        <span class="pcText">From:</span>
                                        <span class="pcVal"
                                            >{product.pushedFrom}</span
                                        >
                                    </div>

                                    <div class="pedCol">
                                        <span class="pcText"> Date:</span>
                                        <span class="pcVal"
                                            >{formatDate(product.addedOn)}</span
                                        >
                                    </div>

                                    <div class="pedCol">
                                        <span class="pcText"> Init Added:</span>
                                        <span class="pcVal">
                                            {formatDate(
                                                product.initAddedOn
                                            )}</span
                                        >
                                    </div>
                                </div>
                            {/if}

                            <!-- pushed -->
                            <!-- some det pushed from : dat on-->
                        {/if}

                        <br />
                        <!--  -->
                        <div class="productStatsCol">
                            <LeftIconStatWidgets stats={productStats} />
                        </div>
                        <br />
                        <div class="productsActionsCol">
                            <ProductActions
                                {product}
                                on:update={() => {
                                    getProduct($location);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <br />

                <div class="productExtrasContainer">
                    <div class="peTitleCol">
                        <div class="peTitle active">Transaction History</div>
                        <div class="peTitle">Performance</div>
                    </div>

                    <div class="peContentCol">
                        <TransactionHistory
                            packSize={product.packSize}
                            transactions={product.transactions}
                        />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</main>

<!-- auth token modal  -->
{#if showAuthTokenModal}
    <AuthToken
        bind:authenticatedUser
        payload={authTokens}
        errorMessage={AUTH_ERROR_MESSAGE}
        cancelMessage={AUTH_CANCEL_MESSAGE}
        on:success={authTokenSuccess}
        on:cancel={cancelAuthentication}
    />
{/if}

<!-- auth token modal  -->

<style>
    .content {
        background: #fff;
        margin-bottom: 3em;
    }

    .titleBar {
        padding: 0.1em;
    }

    .title {
        padding-bottom: 0.1em;
        padding-left: 1em;
        font-size: 17px;
        font-weight: 800;
        font-family: "Roboto", sans-serif;
        color: var(--ziada-green);
    }

    .productContainer {
        display: flex;
        flex-direction: column;
    }

    .imageCol {
        flex: 1;
        background: rgb(255, 255, 255);
        padding: 1em;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        margin: 1em;
    }

    .imageCol img {
        width: 100%;
        height: auto;
    }

    .detailsCol {
        flex: 2;
        padding: 1em;
    }

    .productName {
        /* padding: 1em; */
        font-weight: 600;
        color: var(--text-primary-light);
        font-size: 15px;
        margin-bottom: 0.5em;
        text-transform: capitalize;
    }

    .productType {
        font-weight: 600;
        margin-inline-end: 1em;
    }

    .productBranch {
        font-weight: 600;
        color: var(--ziada-green);
    }

    .productCode {
        margin-inline-end: 1em;
        font-weight: 600;
        color: brown;
    }
    .productDetailCol {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .pedCol {
        margin-inline-end: 1em;
        font-family: "Roboto", sans-serif;
        color: rgb(27, 27, 27);
        padding: 0.1em;
    }

    .productStatsCol {
        /* background-color: rebeccapurple; */
        display: block;
    }

    .productDetailColTitle {
        color: var(--ziada-green);
        font-weight: 600;
        margin-top: 1.5em;
        font-size: 15px;
    }

    .pcText {
        color: rgb(44, 44, 44);
        font-weight: 400;
    }

    .pcVal {
        font-weight: 500;
    }

    .productExtrasContainer {
        margin-top: 2em;
    }

    .peTitleCol {
        display: flex;
        border-bottom: 1px solid rgba(168, 168, 168, 0.444);
    }

    .peTitle {
        color: var(--text-primary-light);
        padding-left: 1em;
        font-weight: 500;
        font-size: 16px;
        /* font-family: "Roboto", sans-serif; */
        padding-bottom: 0.2em;
    }

    .peTitle.active {
        border-bottom: 2px solid purple;
        color: purple;
    }

    .action {
        padding: 0.5em;
    }

    @media only screen and (min-width: 640px) {
        .productContainer {
            display: flex;
            flex-direction: row;
        }

        .productDetailCol {
            display: flex;
            justify-content: flex-start;
        }
    }
</style>
