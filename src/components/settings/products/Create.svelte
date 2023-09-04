<script>
    // @ts-nocheck

    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import { Notify } from "notiflix";
    import { v4 } from "uuid";
    import SearchNsProductList from "./SearchNsProductList.svelte";

    import AuthToken from "../../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../../scripts/js/messages";
    import { liveQuery } from "dexie";
    import { db } from "../../../db/db";
    import { getPermittedTokens } from "../../../scripts/js/methods";
    import EditProperty from "./EditProperty.svelte";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let currentEditProperty;

    let showEditPropertyModal = false;

    // auth
    let authenticatedUser;

    let authTokens = [];

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

    const ACTION = "create";

    const AUTH_CANCEL_MESSAGE =
        "Addition Authentication Cannot Be Cancelled. Returning";

    let searchedProduct;

    let selectedCategory;

    let createProductBtnLoading = false;

    let selectedSubcategories = [];

    let filteredSubcategories = [];

    let generics = [];

    //
    let filteredSubcategoryOne = [];

    let filteredSubcategoryTwo = [];

    let filteredSubcategoryThree = [];

    let selectedSubcategoryOne;
    let selectedSubcategoryTwo;
    let selectedSubcategoryThree;

    let properties = [];

    let categories = [];

    let subcategories = [];

    let otherProductProperties = [];

    let activeIngredients = [];

    let filteredGenerics = [];

    let genericsFilterQuery;

    let productName;

    let productCode;

    let packSize;

    let selectedFormulation;

    let formulationInputOptions = [];

    // when subcategory one changes
    $: {
        if (selectedSubcategoryOne) {
            handleSubcategoryOneChange();
        }
    }

    // when subcategory two changes
    $: {
        if (selectedSubcategoryTwo) {
            handleSubcategoryTwoChange();
        }
    }

    const getCategories = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getCategories.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            categories = response.data;
        } catch (err) {
            console.log(err);
        }
    };

    const getSubCategories = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getSubCategories.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            subcategories = response.data;
        } catch (err) {
            console.log(err);
        }
    };

    const getProperties = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getProductProperties.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            properties = response.data;

            // get formulation

            let formulationFilterArr = properties.filter((p) => {
                if (p.name == "Formulation") {
                    return p;
                }
            });

            let inputOptions = formulationFilterArr[0].inputOptions.split(",");

            formulationInputOptions = inputOptions;
        } catch (err) {
            console.log(err);
        }
    };

    const handleCategoryChange = (category) => {
        // console.log(category);
        selectedCategory = category;

        // create subcategory one filter
        let scatOneFilter = subcategories.filter((scat) => {
            if (scat.category == category && scat.type == "Subcategory One") {
                return scat;
            }
        });

        scatOneFilter.length > 0
            ? (filteredSubcategoryOne = scatOneFilter)
            : (filteredSubcategoryOne = []);
    };

    const handleSubcategoryOneChange = () => {
        let fscat_two = subcategories.filter((sc) => {
            if (selectedSubcategoryOne == sc.parent) {
                return sc;
            }
        });

        fscat_two.length > 0
            ? (filteredSubcategoryTwo = fscat_two)
            : (filteredSubcategoryTwo = []);
    };

    const handleSubcategoryTwoChange = () => {
        let fscat_three = subcategories.filter((sc) => {
            if (selectedSubcategoryTwo == sc.parent) {
                return sc;
            }
        });

        fscat_three.length > 0
            ? (filteredSubcategoryThree = fscat_three)
            : (filteredSubcategoryThree = []);
    };

    const filterGenerics = (query) => {
        let genericNames = generics.map((v) => v.name.toLowerCase());

        let fg = genericNames.filter((g) => {
            if (g.includes(query.toLowerCase())) {
                return g;
            }
        });

        filteredGenerics = fg;
        // console.log(fg);
    };

    const clearForm = (id) => {
        let form = document.getElementById(id);

        form.reset();
    };

    const toggleProductSubcategory = (subcategory, buttonId) => {
        // console.log(buttonId);
        // check if already selected
        let selectedScatIndex = selectedSubcategories.indexOf(subcategory);

        if (selectedScatIndex != -1) {
            // remove
            selectedSubcategories.splice(selectedScatIndex, 1);
            selectedSubcategories = selectedSubcategories;

            // remove purple //add basic class
            document.getElementById(buttonId).classList.add("basic");
        } else {
            // push and remove basic class
            selectedSubcategories.push(subcategory);
            selectedSubcategories = selectedSubcategories;

            // remove basic
            document.getElementById(buttonId).classList.remove("basic");
        }

        console.log(selectedSubcategories);
    };

    const handleOtherProductProperties = (property, value) => {
        let currentlyAddedProperties = otherProductProperties.map(
            (p) => p.property
        );

        let indexOfProperty = currentlyAddedProperties.indexOf(property);

        if (indexOfProperty != -1) {
            otherProductProperties[indexOfProperty].value = value;
        } else {
            otherProductProperties.push({ property: property, value: value });
            otherProductProperties = otherProductProperties;
        }

        console.log(otherProductProperties);
    };

    const handleCreateProduct = async () => {
        if (!productName) {
            Notify.warning("Product Name Cannot Be Empty.Aborting");

            return;
        }

        if (!productCode) {
            Notify.warning("Product Code Cannot Be Empty.Aborting");

            return;
        }

        if (!packSize) {
            Notify.warning("Product PackSize Cannot Be Empty,Aborting");

            return;
        }

        // push formulationto other properties
        otherProductProperties.push({
            property: "Formulation",
            value: selectedFormulation,
        });

        let dt = {
            name: productName,
            code: productCode,
            packSize: packSize,
            category: selectedCategory,
            subcategoryOne: selectedSubcategoryOne,
            subcategoryTwo: selectedSubcategoryTwo,
            subcategoryThree: selectedSubcategoryThree,
            properties: otherProductProperties,
            id: v4(),
            init: "Default",
            initName: "Default",
        };

        try {
            createProductBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}createNsProduct.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                clearForm("createProductForm");
            } else {
                Notify.failure(res.message);
            }
            createProductBtnLoading = false;

            cancelModal();
        } catch (err) {
            console.log(err);
        }

        console.log(dt);
    };

    const getGenerics = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getGenerics.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            generics = response.data;
        } catch (err) {
            console.log(err);
        }
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        handleCreateProduct();
        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
        navigate("/");
    };

    onMount(() => {
        getCategories();
        getProperties();
        getSubCategories();
        getGenerics();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Create Product</div>
        </div>

        <!-- product search bar -->
        <div class="productSearchBar">
            <SearchNsProductList
                on:product={(e) => {
                    // console.log(e.detail);
                    let sp = e.detail;

                    productName = sp.name;
                    productCode = sp.code;
                    packSize = sp.packSize;

                    searchedProduct = sp;
                }}
            />
        </div>
        <!--product search bar -->
        <br />

        <div class="mainFormContainer">
            <form
                class="ui form"
                id="createProductForm"
                on:submit|preventDefault={() => {
                    // showAuthTokenModal = true;
                    handleCreateProduct();
                }}
            >
                <fieldset>
                    <legend>Basic</legend>

                    <div class="three fields">
                        <div class="field">
                            <label for="name">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="name"
                                bind:value={productName}
                                readonly
                            />
                        </div>

                        <div class="field">
                            <label for="name">Product Code</label>
                            <input
                                type="text"
                                name="code"
                                id="code"
                                placeholder="code"
                                bind:value={productCode}
                                readonly
                            />
                        </div>

                        <div class="field">
                            <label for="name">packSize</label>
                            <input
                                type="text"
                                name="ps"
                                id="ps"
                                placeholder="1"
                                bind:value={packSize}
                                readonly
                            />
                        </div>
                    </div>
                </fieldset>

                <!-- <fieldset> -->
                    <!-- <legend>Active Ingredients</legend> -->

                    <!-- <div class="field"> -->
                        <!-- <input
                            type="text"
                            name="search_ai"
                            id="search_ai"
                            placeholder="Search Active Ingredient"
                            on:keyup={(e) => {
                                // console.log(e.target.value);

                                filterGenerics(e.target.value);
                            }}
                        /> -->

                        <!-- filter results -->
                        <!-- <div class="aiFilterResults">
                            <div class="aiFilterTitle">Active Ingredient</div>

                            <div class="filterResults">
                                {#each filteredGenerics as fg, i}
                                    <div
                                        style={i % 2 == 0
                                            ? "background:rgba(50,220,50,0.1)"
                                            : "background:#fff"}
                                        class="filteredGenericCol"
                                    >
                                        <div class="fg">
                                            {fg}
                                        </div>
                                        <div class="fgAct">
                                            <button
                                                class="ui basic blue icon mini button"
                                                type="button"
                                                on:click={() => {
                                                    activeIngredients[0] = fg;

                                                    activeIngredients =
                                                        activeIngredients;

                                                    filteredGenerics = [];

                                                    document.getElementById(
                                                        "search_ai"
                                                    ).value = "";
                                                }}
                                            >
                                                <i
                                                    style="font-size: 10px;"
                                                    class="plus icon"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div> -->
                        <!-- filter results -->
                    <!-- </div> -->

                    <!-- <div class="selectedActiveIngredients">
                        {#each activeIngredients as ai}
                            <button
                                type="button"
                                class="ui basic blue mini button"
                            >
                                {ai}
                            </button>
                        {/each}
                    </div> -->
                <!-- </fieldset> -->

                <fieldset>
                    <legend> Category </legend>

                    <div class="two fields">
                        <div class="field">
                            <label for="property"> Category </label>

                            <select
                                name="category"
                                id="category"
                                on:change={(e) => {
                                    handleCategoryChange(e.target.value);
                                }}
                            >
                                <option value="">Select Category</option>
                                {#each categories as category}
                                    <option value={category.name}
                                        >{category.name}</option
                                    >
                                {/each}
                            </select>
                        </div>

                        <div class="field">
                            <label for="property"> SubCategory One </label>

                            <select
                                name="subcategory_one"
                                id="subcategory_one"
                                bind:value={selectedSubcategoryOne}
                                required
                            >
                                <option value="">Select Subcategory One</option>
                                {#each filteredSubcategoryOne as sc}
                                    <option value={sc.name}>{sc.name}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="two fields">
                        <div class="field">
                            <label for="property"> SubCategory Two </label>

                            <select
                                name="subcategory_one"
                                id="subcategory_one"
                                bind:value={selectedSubcategoryTwo}
                                required
                            >
                                <option value="">Select Subcategory Two</option>
                                {#each filteredSubcategoryTwo as sc}
                                    <option value={sc.name}>{sc.name}</option>
                                {/each}
                            </select>
                        </div>

                        <div class="field">
                            <label for="property"> SubCategory Three </label>

                            <select
                                name="subcategory_three"
                                id="subcategory_three"
                                bind:value={selectedSubcategoryThree}
                                required
                            >
                                <option value=""
                                    >Select Subcategory Three</option
                                >
                                {#each filteredSubcategoryThree as sc}
                                    <option value={sc.name}>{sc.name}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend> All Properties </legend>

                    {#each properties as property, i}
                        {#if property.name == "Category"}
                            <!--  -->
                        {:else if property.name == "Code"}
                            <!--  -->
                        {:else if property.name == "Subcategory"}
                            <!--  -->
                        {:else if property.name == "Formulation"}
                            <div class="field">
                                <label for="property">
                                    {property.name}
                                </label>

                                <select
                                    name="formulation"
                                    id="formulation"
                                    required
                                    bind:value={selectedFormulation}
                                >
                                    <option value="">Select Formulation</option>
                                    {#each formulationInputOptions.sort() as fio}
                                        <option value={fio}>{fio}</option>
                                    {/each}
                                </select>
                            </div>
                        {:else}
                            <!-- if the type  is selectd -->
                            {#if property.type == "select<enum>"}
                                <div class="field">
                                    <label for="property">
                                        {property.name}
                                    </label>

                                    <div class="input_col">
                                        <select
                                            name={property.name}
                                            id={property.name}
                                            required={property.required == "1"
                                                ? "required"
                                                : ""}
                                            on:change={(e) => {
                                                handleOtherProductProperties(
                                                    property.name,
                                                    e.target.value
                                                );
                                            }}
                                        >
                                            <option value=""
                                                >Select {property.name}</option
                                            >
                                            {#each property.inputOptions
                                                .split(",")
                                                .sort() as fio}
                                                <option value={fio}
                                                    >{fio}</option
                                                >
                                            {/each}
                                        </select>

                                        <div class="update_col">
                                            <!-- <button
                                                class="ui mini icon basic orange button"
                                                type="button"
                                                on:click={() => {
                                                    showEditPropertyModal = true;
                                                    currentEditProperty =
                                                        property;
                                                }}
                                            >
                                                <i class="edit icon" />
                                            </button> -->
                                        </div>
                                    </div>
                                </div>
                            {:else}
                                <div class="field">
                                    <label for="property">
                                        {property.name}
                                    </label>

                                    <input
                                        name={property.name}
                                        id={property.name}
                                        type={property.type}
                                        placeholder={property.name}
                                        required={property.required
                                            ? "true"
                                            : "false"}
                                        on:change={(e) => {
                                            handleOtherProductProperties(
                                                property.name,
                                                e.target.value
                                            );
                                        }}
                                    />
                                </div>
                            {/if}
                        {/if}
                    {/each}
                    <br />
                </fieldset>
                <br />
                <div class="field" style="padding-top: 1em;text-align:center">
                    <button class="ui green basic button"> Create </button>
                </div>
            </form>
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

{#if showEditPropertyModal}
    <EditProperty
        on:success={() => {
            getProperties();
        }}
        on:cancel={() => {
            showEditPropertyModal = false;
        }}
        property={currentEditProperty}
    />
{/if}

<style>
    input {
        width: 90% !important;
        line-height: 2.3em;
    }

    fieldset {
        padding: 1em;
    }

  

    .input_col {
        display: flex;
    }

    .update_col {
        padding: 1em;
    }
</style>
