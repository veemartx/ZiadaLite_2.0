<script>
    // @ts-nocheck

    import { createEventDispatcher, onMount } from "svelte";
    import { formatDate, getPermittedTokens } from "../scripts/js/methods";
    import AuthToken from "./AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../scripts/js/messages";
    import { liveQuery } from "dexie";
    import { db } from "../db/db";

    // props
    export let undoneUniversalMessages = [];

    // consts
    const RESOURCE = "transfer-requests";

    const ACTION = "process";

    const AUTH_CANCEL_MESSAGE =
        "Transfer Request Processing Cancelled By User.";

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    let ZL_LIU = window.localStorage.ZL_LIU;

    let authTokens = [];

    let title;
    let message;
    let type;

    let liu;

    let showAuthTokenModal = false;

    let authenticatedUser;

    let currentAuthAction;

    let currentActionMessage;

    // methods
    const dispatch = createEventDispatcher();

    // vars

    $: {
        if (undoneUniversalMessages) {
            if (undoneUniversalMessages.length == 1) {
                title = undoneUniversalMessages[0].subject;
                message = undoneUniversalMessages[0].message;
                type = "error";
            } else {
                title = "Unread Global Messages";
                message = `You Have ${undoneUniversalMessages.length} Prending Transfer Requests`;

                type = "error";
            }
        }
    }

    $: {
        if (ZL_LIU) {
            liu = JSON.parse(ZL_LIU);
        }
    }

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

    // methods
    const handleProcessRequest = () => {
        let dt = {
            init: authenticatedUser.uid,
            initName: authenticatedUser.name,
            resource: currentActionMessage.resource,
            resourceId: currentActionMessage.resourceRefId,
            messageId: currentActionMessage.id,
        };

        console.log(dt);
    };

    const authTokenSuccess = () => {
        switch (currentAuthAction) {
            case "process-request":
                handleProcessRequest();
                break;

            default:
                break;
        }
        showAuthTokenModal = false;
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
    };

    onMount(() => {
        // disable vertical scroll
        const body = document.querySelector("body");
        body.style.cssText += "overflow-y:hidden";
    });
</script>

<main>
    <div class="wrapper">
        <div class={`messageContainer ${type}`}>
            <div class="content">
                <div class="titleBar">
                    <div class="title">
                        {title}
                    </div>

                    <div class="actions">
                        <button
                            style="font-weight:bold"
                            on:click={() => {
                                window.location.reload();
                            }}
                            class={type == "error"
                                ? "teal ui mini button"
                                : "teal ui  mini button"}
                        >
                            <i class="refresh icon" />
                            Reload
                        </button>
                    </div>
                </div>

                <div class="mainColMessage">
                    {@html message}
                </div>
            </div>
        </div>

        <!-- block actions modal  -->
        <div class="universalNotificationsContainer">
            {#if undoneUniversalMessages}
                <div class="content">
                    <div class="messagesContainer">
                        {#each undoneUniversalMessages as message}
                            <div class="messageCol">
                                <div class="subject">
                                    {message.subject}
                                </div>
                                <div class="message">
                                    {message.message}
                                </div>

                                <div class="messageDetsCol">
                                    <div class="sender">
                                        By: {message.senderName}
                                    </div>

                                    <div class="branch">
                                        In: {message.hostBranch}
                                    </div>

                                    <div class="sentAt">
                                        On: {formatDate(message.sentAt)}
                                    </div>
                                </div>

                                <br />

                                <div class="messageActionCol">
                                    {#if message.subject == "Transfer Request"}
                                        <button
                                            class="ui purple basic small button"
                                            on:click={() => {
                                                currentAuthAction =
                                                    "process-request";

                                                currentActionMessage = message;

                                                showAuthTokenModal = true;
                                            }}
                                        >
                                            Process<i
                                                class="caret right icon"
                                            />
                                        </button>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
        <!-- block actions modal  -->
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
    .title {
        font-size: 18px;
        color: #fff;
    }
    .content {
        padding: 1em;
    }

    .message {
        font-size: 15px;
        margin-top: 10px;
        color: #fff;
    }
    .error {
        background-color: rgb(159, 35, 35);
    }

    .success {
        background-color: rgb(27, 142, 85);
    }

    .info {
        background-color: rgb(30, 143, 255);
    }

    .warning {
        background-color: rgb(170, 142, 31);
    }

    .actions {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }
    .actions button {
        font-size: 10px !important;
    }

    .universalNotificationsContainer {
        min-height: 100vh;
        position: fixed;
        width: 100%;
        background: #ffffff68;
        backdrop-filter: blur(5px);
    }

    .messagesContainer {
        z-index: 10000;
        background: #fff;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .subject {
        color: var(--ziada-green);
        font-weight: 600;
        font-size: large;
        border-bottom: 1px solid rgba(197, 197, 197, 0.433);
        padding-bottom: 0.5em;
    }

    .mainColMessage {
        color: aliceblue;
        padding: 0.5em;
        font-size: 14px;
    }
    .message {
        color: rgb(12, 23, 32);
        font-size: 14px;
        padding: 0.5em;
    }

    .messageCol {
        border: 1px solid rgba(195, 195, 195, 0.367);
        padding: 1em;
        border-radius: 5px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        margin-bottom: 1em;
    }

    .messageDetsCol {
        display: flex;
        padding: 0.5em;
        font-weight: 600;
        font-size: small;
    }

    .sender {
        color: brown;
    }

    .branch {
        color: teal;
        padding-left: 1em;
    }

    .sentAt {
        color: orangered;
        padding-left: 1em;
    }

    .messageActionCol {
        padding: 0.5em;
        text-align: right;
    }

    .messageActionCol button {
        font-weight: 600 !important;
    }
</style>
