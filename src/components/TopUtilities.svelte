<script>
    // @ts-nocheck
    import { Link } from "svelte-navigator";
    import { Confirm } from "notiflix/build/notiflix-confirm-aio";
    import { onMount } from "svelte";

    const handleLogout = () => {
        Confirm.show(
            "Logout",
            "Logout From This Device?",
            "Yes",
            "No",
            () => {
                //   logout
                window.sessionStorage.removeItem("ziadaCpdLia");

                window.location.reload();
            },
            () => {
                //    cancel
            },
            {}
        );
    };

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="profileBox">
            <div class="ziada">ZIADA</div>
            <div class="lite">Lite</div>
            <div class="tm">
                <sup>
                    <i class="ri-registered-line" />
                </sup>
            </div>
        </div>

        <!-- profileMenu -->
        <div class="profileMenu segment">
            <div class="welcomeText">Howdey! Welcome Back</div>
            <br />
            <div class="profileMenuNavContainer">
                <Link to="profile">
                    <div class="profileMenuNav">
                        <i class="ri-user-line" /> &nbsp; &nbsp; Profile
                    </div>
                </Link>

                <Link to="settings">
                    <div class="profileMenuNav">
                        <i class="ri-settings-line" /> &nbsp; &nbsp; Settings
                    </div>
                </Link>

                <Link to="settings">
                    <div class="profileMenuNav">
                        <i class="ri-chat-new-line" /> &nbsp; &nbsp; Messages
                    </div>
                </Link>

                <Link to="settings">
                    <div class="profileMenuNav">
                        <i class="ri-question-line" /> &nbsp; &nbsp; Help
                    </div>
                </Link>

                <hr />

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    class="profileMenuNav"
                    style="cursor: pointer;"
                    on:click={handleLogout}
                >
                    <i class="ri-logout-circle-r-line" /> &nbsp; &nbsp; Logout
                </div>
            </div>
        </div>
        <!-- profileMenu -->
    </div>
</main>

<style>
    .profileBox {
        background-color: rgba(170, 170, 170, 0.291);
        cursor: pointer;
        text-align: center;
        font-weight: 700;
        color: rgb(3, 65, 42);
        margin-top: 1em;
        padding-top: .5em;
        display: flex;
        justify-content: center;
    }

    .profileMenu {
        border-radius: 5px;
        display: none;
        position: absolute;
        width: 10.7em;
    }

    .wrapper:hover .profileMenu {
        display: block;
    }

    .profileMenuNav {
        background: rgba(187, 187, 187, 0);
        line-height: 2.5em;
        text-align: left;
        padding-left: 1em;
        color: rgb(3, 65, 42);
    }

    .welcomeText {
        text-align: center;
        border-bottom: 1px solid rgba(128, 128, 128, 0.142);
        padding-bottom: 0.2em;
    }

    .lite {
        font-weight: 100;
        color: rgb(31, 158, 57);
    }

    .tm {
        color: rgb(31, 158, 57);
    }
</style>
