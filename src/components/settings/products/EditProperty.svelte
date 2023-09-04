<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import { v4 } from "uuid";
    import { apiBaseUrl } from "../../../config/config";
    import axios from "axios";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let createPropertyBtnLoading = false;

    export let property;

    let propertyName;

    let description;

    let propertyInputType;

    let propertyInputRequired;

    let selectionPropertyTypeOptions;

    let propertyInputTypes = [
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "month",
        "number",
        "radio",
        "tel",
        "text",
        "time",
        "url",
        "week",
        "select<enum>",
    ];

    // send message to close modal
    const dispatch = createEventDispatcher();

    function handleSuccess() {
        dispatch("success");
    }

    function cancelModal() {
        dispatch("cancel");
    }

    const handleCreateProperty = async () => {
        let dt = {
            property: propertyName,
            resource: "products",
            required: propertyInputRequired,
            inputType: propertyInputType,
            inputTypeOptions: selectionPropertyTypeOptions,
            id: property.id,
        };

        try {
            createPropertyBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}editProperty.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);
                handleSuccess();
            } else {
                Notify.failure(res.message);
            }
            createPropertyBtnLoading = false;

            cancelModal();
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        // console.log(payload);
        propertyName = property.name;
        // let required =
        propertyInputRequired = parseInt(property.required);
        propertyInputType = property.type;
        selectionPropertyTypeOptions = property.inputOptions;
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Edit Property</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancelModal}
                            class="cancelModal ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <br />
                    <div class="createAllowedUploadForm">
                        <form
                            on:submit|preventDefault={handleCreateProperty}
                            id="createAllowedUploadForm"
                        >
                            <div class="fieldInput">
                                <div class="field">
                                    <label for="type">Property Name</label>
                                    <input
                                        type="text"
                                        name="type"
                                        id="name"
                                        placeholder="Name"
                                        bind:value={propertyName}
                                        required
                                    />
                                </div>
                            </div>

                            <div class="fieldInput">
                                <div class="field">
                                    <label for="type">Property Input Type</label
                                    >
                                    <select
                                        name="propertyInputType"
                                        id="propertyInputType"
                                        bind:value={propertyInputType}
                                    >
                                        <option value=""
                                            >Select Input Type</option
                                        >
                                        {#each propertyInputTypes as pits}
                                            <option value={pits}>{pits}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>

                            {#if propertyInputType == "select<enum>"}
                                <div class="fieldInput">
                                    <div class="field">
                                        <label for="type"
                                            >Input Type Options <span
                                                style="font-weight: 800;color:crimson"
                                                >Comma Separated</span
                                            ></label
                                        >
                                        <input
                                            type="text"
                                            name="type"
                                            id="options"
                                            placeholder="property input type options"
                                            bind:value={selectionPropertyTypeOptions}
                                            required
                                        />
                                    </div>
                                </div>
                            {/if}

                            <div class="fieldInput" style="margin-top: 2em;">
                                <div class="field">
                                    <div class="ui slider checkbox">
                                        <input
                                            type="checkbox"
                                            name="override"
                                            checked={propertyInputRequired}
                                            on:change={() => {
                                                propertyInputRequired =
                                                    !propertyInputRequired;

                                                // console.log(propertyInputRequired);
                                            }}
                                        />
                                        <label for="override"
                                            >Property Input Required</label
                                        >
                                    </div>
                                </div>
                            </div>
                            <br />

                            <div
                                class="fieldInput"
                                style="padding-top: 1.5em;text-align:center;"
                            >
                                <button
                                    class={createPropertyBtnLoading
                                        ? "ui orange basic loading icon button"
                                        : "ui orange basic icon button"}
                                    style="line-height:1em;border-radius:5px !important"
                                >
                                    <i class="send icon" /> Update</button
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

    .cancelModal {
        font-size: 22px;
        cursor: pointer;
    }

    .cancelModal:hover {
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
