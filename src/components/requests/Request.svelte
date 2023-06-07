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

    const LIU = window.localStorage.ZL_LIU;

    const RESOURCE = "requests";

    const ACTION = "delete";

    const AUTH_CANCEL_MESSAGE =
        "Addition Authentication Cannot Be Cancelled. Returning";

    let requestId;

    let request;

    let requestImageUrl = "../../assets/images/placeholder.jpeg";

    let requestStats = [];

    let liu;

    let crumbs = {
        title: "request",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "request",
                url: "/request/pd/" + requestId,
            },
        ],
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
            getrequest($location);
        }
    }



    if (LIU) {
        liu = JSON.parse(LIU);
    }

    const getrequest = async ($location) => {
        let pathnameArr = $location.pathname.split("/");

        let pid = pathnameArr[pathnameArr.length - 1];

        requestId = pid;

        let dt = {
            id: requestId,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getTransferRequest.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            request = res;

            requestImageUrl = request.image;

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
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
            {#if request}
                <div class="titleBar">
                    <div class="title">
                        {request.productName}
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

                <div class="requestContainer">
                    <div class="detailsCol">
                        <div class="requestName">
                            Name: {request.productName
                                ? request.productName.toLowerCase()
                                : ""}
                        </div>

                        <div class="requestDetailCol">
                            <div class="requestedBy" style="color:crimson">
                                Requested By: {request.requestedBy}
                            </div>

                            <div class="requestedOn">
                                On. {formatDate(request.date)}
                            </div>

                            <div class="doneBy">
                                {#if request.doneBy}
                                    Done By: {request.doneBy}
                                {/if}
                            </div>

                            <div class="requestBranch">
                                Branch: {request.requestingBranch}
                            </div>
                        </div>

                        {#if request.expiryDate}
                            <!-- some det expiry,added,added by -->
                            <div class="requestDetailCol">
                                <div class="pedCol">
                                    <span class="pcText"> Expiry Date:</span>
                                    <span class="pcVal"
                                        >{formatDate(request.expiryDate)}</span
                                    >
                                </div>

                                <div class="pedCol">
                                    <span class="pcText"> Added On: </span>
                                    <span class="pcVal"
                                        >{formatDate(request.addedOn)}</span
                                    >
                                </div>

                                <div class="pedCol">
                                    <span class="pcText"> Added By:</span>
                                    <span class="pcVal">
                                        {request.addedBy}</span
                                    >
                                </div>
                            </div>
                        {/if}

                        <br />
                        <!--  -->
                        <div class="requestStatsCol">
                            <LeftIconStatWidgets stats={requestStats} />
                        </div>
                        <br />
                        {#if request}
                            {#if request.requestedBranch == liu.b}
                                <div class="requestsActionsCol">
                                    <div class="titleBar">
                                        <div class="subTitle">Actions</div>
                                    </div>
                                    <div class="actionsBar">
                                        <button
                                            class="ui small basic purple button"
                                        >
                                            Process Request
                                        </button>
                                    </div>
                                </div>
                            {/if}
                        {/if}
                    </div>
                </div>
                <br />
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

    .requestContainer {
        display: flex;
        flex-direction: column;
    }

    .detailsCol {
        flex: 2;
        padding: 1em;
    }

    .requestName {
        /* padding: 1em; */
        font-weight: 600;
        color: var(--text-primary-light);
        font-size: 15px;
        margin-bottom: 0.5em;
        text-transform: capitalize;
    }

    .requestedBy {
        font-weight: 600;
        margin-inline-end: 1em;
    }

    .requestedOn {
        font-weight: 600;

        color: brown;
    }

    .requestBranch {
        font-weight: 600;
        color: var(--ziada-green);
    }

    .doneBy {
        margin-inline-end: 1em;
        font-weight: 600;
        color: var(--ziada-green);
    }
    .requestDetailCol {
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

    .requestStatsCol {
        /* background-color: rebeccapurple; */
        display: block;
    }

    .pcText {
        color: rgb(44, 44, 44);
        font-weight: 400;
    }

    .pcVal {
        font-weight: 500;
    }

    .action {
        padding: 0.5em;
    }

    .actionsBar {
        padding: 1em;
    }

    .subTitle {
        color: var(--text-primary-light);
        font-weight: 600;
    }

    @media only screen and (min-width: 640px) {
        .requestContainer {
            display: flex;
            flex-direction: row;
        }

        .requestDetailCol {
            display: flex;
            justify-content: flex-start;
        }
    }
</style>
