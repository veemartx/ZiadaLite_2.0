<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import axios from "axios";
    import { apiBaseUrl } from "../config/config";
    import { db } from "../db/db";
    import { Dexie } from "dexie";

    let systemInitCurrentStep = 1;

    // current action is always the last action in the array
    let systemInitProgress = [
        {
            step: 1,
            name: "Initializing ZiadaLite",
            color: "purple",
            weight: 400,
            progress: "pending",
        },

        {
            step: 2,
            name: "Fetching Required Files",
            color: "dodgerblue",
            weight: 400,
            progress: "pending",
        },

        {
            step: 3,
            name: "Configuring  Products List",
            color: "orangered",
            weight: 400,
            progress: "pending",
        },

        {
            step: 4,
            name: "Setting Up User Accounts",
            color: "#34b7eb",
            weight: 400,
            progress: "pending",
        },

        {
            step: 5,
            name: "Configuring Permissions",
            color: "brown",
            weight: 400,
            progress: "pending",
        },

        {
            step: 6,
            name: "Configuring Settings",
            color: "#b51b4e",
            weight: 400,
            progress: "pending",
        },

        {
            step: 7,
            name: "Finishing Up",
            color: "#1bb568",
            weight: 400,
            progress: "pending",
        },
    ];

    // for modularity get the data in different requests
    const startSystemInit = () => {
        // wait two seconds and get the data

        setTimeout(() => {
            systemInitProgress[0].progress = "done";
            systemInitCurrentStep = 2;

            getLocalDBStoreProductsList();
        }, 2000);
    };

    // get products list
    const getLocalDBStoreProductsList = async () => {
        systemInitProgress[1].progress = "done";
        systemInitCurrentStep = 3;

        try {
            let response = await axios.get(
                `${apiBaseUrl}getLocalDBStoreProductsList.php`
            );
            let result = response.data;

            let newProductList = result;
            // clear the rocords in the db
            try {
                // delete the old products list
                await db.productsList.clear();
                let newProductListKeys = newProductList.map((p) => p.id);
                // add the new list
                // console.log(newProductList);
                db.productsList
                    .bulkPut(newProductList, newProductListKeys, {
                        allKeys: true,
                    })
                    .then((lastKey) => {
                        console.log(
                            "Done Creating Local DB Store - Products List"
                        );

                        setTimeout(() => {
                            systemInitProgress[2].progress = "done";
                            systemInitCurrentStep = 4;

                            getLocalDBStoreUsers();
                        }, 1000);
                    })
                    .catch(Dexie.BulkError, (e) => {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error(
                            "Some Operations did not succeed. However, " +
                                100000 -
                                e.failures.length +
                                " Products was added successfully"
                        );
                    });
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // get users
    const getLocalDBStoreUsers = async () => {
        try {
            let response = await axios.get(
                `${apiBaseUrl}getLocalDBStoreUsers.php`
            );
            let result = response.data;

            let newUsers = result;
            // clear the rocords in the db
            try {
                // delete the old products list
                await db.users.clear();
                let newUsersKeys = newUsers.map((p) => p.uid);
                // add the new list
                // console.log(newUsers);
                db.users
                    .bulkPut(newUsers, newUsersKeys, {
                        allKeys: true,
                    })
                    .then((lastKey) => {
                        console.log("Done Creating Local DB Store - Users");

                        systemInitProgress[3].progress = "done";
                        systemInitCurrentStep = 5;

                        getLocalDBStorePermissions();
                    })
                    .catch(Dexie.BulkError, (e) => {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error(
                            "Some Operations did not succeed. However, " +
                                100000 -
                                e.failures.length +
                                " Users was added successfully"
                        );
                    });
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // get permissions
    const getLocalDBStorePermissions = async () => {
        try {
            let response = await axios.get(
                `${apiBaseUrl}getLocalDBStorePermissions.php`
            );
            let result = response.data;

            let newPermissions = result;
            // clear the rocords in the db
            try {
                // delete the old products permissions
                await db.permissions.clear();
                let newPermissionKeys = newPermissions.map((p) => p.uid);
                // add the new list
                // console.log(newProductList);
                db.permissions
                    .bulkPut(newPermissions, newPermissionKeys, {
                        allKeys: true,
                    })
                    .then((lastKey) => {
                        console.log(
                            "Done Creating Local DB Store - Permissions"
                        );

                        setTimeout(() => {
                            systemInitProgress[4].progress = "done";
                            systemInitCurrentStep = 6;

                            getLocalDBStoreSettings();
                        }, 1000);
                    })
                    .catch(Dexie.BulkError, (e) => {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error(
                            "Some Operations did not succeed. However, " +
                                100000 -
                                e.failures.length +
                                " Users was added successfully"
                        );
                    });
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // get settings
    const getLocalDBStoreSettings = async () => {
        try {
            let response = await axios.get(
                `${apiBaseUrl}getLocalDBStoreSettings.php`
            );
            let result = response.data;

            let newSettings = result;
            // clear the rocords in the db
            try {
                // delete the old products list
                await db.settings.clear();
                let newSettingsKeys = newSettings.map((p) => p.uid);
                // add the new list
                // console.log(newProductList);
                db.settings
                    .bulkPut(newSettings, newSettingsKeys, {
                        allKeys: true,
                    })
                    .then((lastKey) => {
                        console.log("Done Creating Local DB Store - Settings");

                        setTimeout(() => {
                            systemInitProgress[5].progress = "done";
                            systemInitCurrentStep = 7;
                            finishSystemInit();
                        }, 1000);
                    })
                    .catch(Dexie.BulkError, (e) => {
                        // Explicitely catching the bulkAdd() operation makes those successful
                        // additions commit despite that there were errors.
                        console.error(
                            "Some Operations did not succeed. However, " +
                                100000 -
                                e.failures.length +
                                " Settings was added successfully"
                        );
                    });
            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const finishSystemInit = () => {
        setTimeout(() => {
            systemInitProgress[6].progress = "done";
            window.location.reload();
        }, 1000);
    };

    onMount(() => {
        startSystemInit();
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Ziada Setup</div>
                    <div class="action" />
                </div>
                <div class="contentBar">
                    {#each systemInitProgress.slice(0, systemInitCurrentStep) as p}
                        <div
                            class="contentCol"
                            style={`color:${p.color};font-weight:${p.weight}`}
                        >
                            <div class="">{p.name}</div>

                            <div class="">
                                {#if p.progress == "pending"}
                                    <i
                                        class="ui loading ri-loader-2-fill icon"
                                    />
                                {:else if p.progress == "done"}
                                    <i class="ui ri-check-double-fill icon" />
                                {:else}
                                    --
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .title {
        font-size: 22px;
        font-weight: 500;
    }

    .segment {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .modalContent {
        margin-top: -10em;
        min-height: 40em;
    }

    .icon {
        color: purple;
        font-size: x-large;
        font-weight: 700;
        padding: 0.1em;
        margin: 0.1em;
    }

    .contentBar {
        margin-top: 1em;
    }

    .contentCol {
        font-size: 15px;
        line-height: 2.5em;
        border-bottom: 1px dotted rgb(174, 174, 174);
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        display: flex;
        justify-content: space-between;
    }

    .ri-check-double-fill {
        color: green;
    }
    @media only screen and (min-width: 640px) {
        .modalContent {
            margin-top: -10em;
            min-height: 40em;
            min-width: 40em;
        }
    }
</style>
