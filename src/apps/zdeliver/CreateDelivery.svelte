<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Confirm, Notify } from "notiflix";
    import SearchProductList from "../../components/SearchProductList.svelte";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";
    import { v4 } from "uuid";

    Confirm.init({
        className: "notiflix-confirm",
        width: "300px",
        zindex: 400000,
    });

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let ZL_LIU = window.localStorage.ZL_LIU;

    if (ZL_LIU) {
        ZL_LIU = JSON.parse(ZL_LIU);
    }

    export let authenticatedUser;

    let createDeliveryBtnLoading = false;

    let deliveryProducts = [];

    let destination;

    let receiptNumber;

    let deliveryCost;

    // send message to close modal
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    const success = () => {
        dispatch("success");
    };

    const handleCreateDelivery = async () => {
        let dt = {
            deliveryId: v4(),
            hostBranch: ZL_LIU.b,
            init: authenticatedUser.uid,
            initName: authenticatedUser.name,
            destination: destination,
            receiptNumber: receiptNumber,
            products: deliveryProducts,
            deliveryCost: deliveryCost,
            totalCost: deliveryProducts
                .map((v) => v.costPrice)
                .reduce((partialSum, a) => partialSum + a, 0),

            totalRetail: deliveryProducts
                .map((v) => v.retailPrice)
                .reduce((partialSum, a) => partialSum + a, 0),
        };

        createDeliveryBtnLoading = true;
        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}createDelivery.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            if (res.success) {
                Notify.success(res.message);
                success();
            } else {
                Notify.failure(res.message);
            }

            createDeliveryBtnLoading = false;
        } catch (err) {
            console.log(err);

            createDeliveryBtnLoading = false;
        }
    };

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Add Delivery Product</div>
                    <div class="close closeModal">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i on:click={closeModal} class="ri-close-circle-line" />
                    </div>
                </div>

                <!-- search bar -->
                <div class="searchBar">
                    <SearchProductList
                        on:product={(e) => {
                            let pd = {
                                name: e.detail.name,
                                qty: null,
                                code: e.detail.code,
                                costPrice: null,
                                retailPrice: null,
                            };
                            deliveryProducts.push(pd);
                            deliveryProducts = deliveryProducts;

                            console.log(deliveryProducts);
                        }}
                    />
                </div>
                <!-- search bar -->

                <div class="contentBar">
                    <!-- main form -->
                    <div class="mainForm">
                        <form
                            class="ui form"
                            on:submit|preventDefault={handleCreateDelivery}
                        >
                            <div class="three fields">
                                <div class="field">
                                    <label for="desitination">
                                        Destination
                                    </label>
                                    <input
                                        type="text"
                                        name="destination"
                                        id="destination"
                                        placeholder="Destination"
                                        bind:value={destination}
                                        required
                                    />
                                </div>

                                <div class="field">
                                    <label for="receiptNumber">
                                        Receipt Number
                                    </label>
                                    <input
                                        type="text"
                                        name="receipt"
                                        id="destination"
                                        placeholder="Receipt"
                                        bind:value={receiptNumber}
                                        required
                                    />
                                </div>

                                <div class="field">
                                    <label for="deliveryCost">
                                        Delivery Cost
                                    </label>
                                    <input
                                        type="number"
                                        name="deliveryCost"
                                        id="deliveryCost"
                                        placeholder="0.00"
                                        bind:value={deliveryCost}
                                        required
                                    />
                                </div>
                            </div>

                            <!-- products -->
                            {#each deliveryProducts as p, i}
                                <fieldset>
                                    <legend>{p.name} ({p.code}) </legend>

                                    <!-- remove -->
                                    <span class="removeProduct">
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <i
                                            on:click={() => {
                                                Confirm.show(
                                                    `Remove Product`,
                                                    `Remove ${p.name}  From Delivery Products?`,
                                                    "Ok",
                                                    "Cancel",
                                                    () => {
                                                        deliveryProducts.splice(
                                                            i,
                                                            1
                                                        );

                                                        deliveryProducts =
                                                            deliveryProducts;
                                                    }
                                                );
                                            }}
                                            class="ri-close-circle-line"
                                        />
                                    </span>
                                    <!-- remove -->

                                    <div class="three fields">
                                        <div class="field">
                                            <label for="prd"> Qty</label>
                                            <input
                                                type="text"
                                                name="qty"
                                                placeholder="1W 0P"
                                                required
                                                bind:value={deliveryProducts[i]
                                                    .qty}
                                            />
                                        </div>

                                        <div class="field">
                                            <label for="prd"> Cost Price</label>
                                            <input
                                                type="number"
                                                name="costPrice"
                                                placeholder="Cost Price"
                                                required
                                                bind:value={deliveryProducts[i]
                                                    .costPrice}
                                            />
                                        </div>

                                        <div class="field">
                                            <label for="prd">
                                                Retail Price</label
                                            >
                                            <input
                                                type="number"
                                                name="retailPrice"
                                                placeholder="Retail Price"
                                                required
                                                bind:value={deliveryProducts[i]
                                                    .retailPrice}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            {/each}
                            <!-- products -->

                            <div
                                class="field"
                                style="padding-top: 1em;text-align:center"
                            >
                                <button
                                    class={createDeliveryBtnLoading
                                        ? "ui basic teal loading mini icon button"
                                        : "ui basic teal mini icon button"}
                                >
                                    <i class="plus icon" /> Create
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- main form -->
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .modalContent {
        margin-top: 1em !important;
        position: absolute !important;
        width: 80%;
        height: 90vh;
    }

    .contentBar {
        width: 100%;
        padding-top: 0.5em;
    }

    form {
        max-width: 85% !important;
        padding: 1em !important;
    }

    input {
        line-height: 1.5em !important;
        max-width: 85% !important;
    }

    .removeProduct {
        float: right;
        font-size: 24px;
        color: crimson;
        font-weight: 900;
        cursor: pointer;
    }

    .removeProduct:hover {
        font-size: 22px;
        transition: 1s;
    }

    @media only screen and (min-width: 640px) {
        .modalContent {
            margin-top: 1em !important;
            position: absolute !important;
            width: 60%;
            height: 90vh;
        }

        form {
            max-width: 95% !important;
        }

        input {
            max-width: 90% !important;
        }
    }
</style>
