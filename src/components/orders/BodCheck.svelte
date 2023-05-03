<script>
    // @ts-nocheck

    import { createEventDispatcher, onMount } from "svelte";
    import { updateCrumbs } from "../../scripts/js/methods";
    import { Link, navigate } from "svelte-navigator";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import { Notify } from "notiflix";
    import { v4 } from "uuid";

    // send message to close modal
    const dispatch = createEventDispatcher();

    export let authenticatedUser;

    let chekBodBtnLoading = false;

    let productType = "Dead Stock";

    let targetRegion;

    let hostRegion;

    let checkInit;

    let initName;

    let orderBranch;

    let bodDoc = [];

    let bodCheckProducts = [];

    let crumbs = {
        title: "BOD Check",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Orders",
                url: "/orders/",
            },
            {
                name: "Bod Check",
                url: "/orders/check-bod",
            },
        ],
    };

    function handleSuccess() {
        dispatch("success");
    }

    function cancelCheck() {
        dispatch("cancel");
    }

    const handleBodCheck = async () => {
        let fd = new FormData();

        fd.append("doc", bodDoc[0]);
        fd.append("targetRegion", targetRegion);
        fd.append("branch", orderBranch);
        fd.append("init", checkInit);
        fd.append("type", productType);
        fd.append("bodId", v4());
        fd.append("initName", initName);
        fd.append("checkingRegion", hostRegion);

        chekBodBtnLoading = true;

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "checkBranchOrder.php",
                data: fd,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            // console.log(result);
            chekBodBtnLoading = false;

            if (result.success) {
                Notify.success(result.message);
                navigate(`/orders/bord/c/${result.bodId}`);
            }
        } catch (err) {
            console.log(err);

            chekBodBtnLoading = false;
        }
    };

    onMount(() => {
        updateCrumbs(crumbs);

        initName = authenticatedUser.name;
        checkInit = authenticatedUser.uid;
        orderBranch = authenticatedUser.branch;
        hostRegion = authenticatedUser.region;
        targetRegion = authenticatedUser.region;
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="content">
                    <div class="titleBar">
                        <div class="title">Check BOD</div>
                        <div class="action">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <i
                                on:click={cancelCheck}
                                class="cancelCheck ri-close-circle-line"
                            />
                        </div>
                    </div>

                    <div class="bodCheckBar">
                        <form
                            class="bodCheckForm"
                            on:submit|preventDefault={handleBodCheck}
                        >
                            <div class="field">
                                <label for="type"> Check Init </label>
                                <input
                                    type="text"
                                    name="initName"
                                    id="initName"
                                    bind:value={initName}
                                />
                            </div>

                            <br />
                            <div class="field">
                                <label for="type"> Product Type </label>
                                <select
                                    name="type"
                                    id="type"
                                    required
                                    bind:value={productType}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Dead Stock"
                                        >Dead Stock</option
                                    >
                                    <option value="Short Exp">Short Exp</option>
                                </select>
                            </div>
                            <br />
                            <div class="field">
                                <label for="region"> Target Region </label>
                                <input
                                    type="text"
                                    name="targetR"
                                    id="region"
                                    bind:value={targetRegion}
                                />
                            </div>
                            <br />
                            <div class="field">
                                <label for="region"> Bod Doc </label>
                                <input
                                    type="file"
                                    name="xlxs"
                                    id="xlxs"
                                    accept="application/vnd.ms-excel"
                                    bind:files={bodDoc}
                                    required
                                />
                            </div>
                            <br />
                            <div
                                class="field"
                                style="text-align: center;padding-top:1em"
                            >
                                <button
                                    class={chekBodBtnLoading
                                        ? "ui basic purple loading button"
                                        : "ui basic purple button"}
                                >
                                    <i class="send icon" /> Check Bod
                                </button>
                            </div>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .content {
        background: #fff;
        /* margin: 1em auto; */
    }

    .titleBar {
        padding: 1em;
    }

    .bodCheckBar {
        padding: 1em;
        border-bottom: 1px solid rgba(128, 128, 128, 0.167);
    }

    .title {
        color: var(--text-primary-light);
    }

    .cancelCheck {
        font-size: 22px;
        cursor: pointer;
    }

    .cancelCheck:hover {
        color: crimson;
        transition: 400ms ease-in-out;
        font-size: 24px;
    }
</style>
