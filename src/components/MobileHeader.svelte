<script>
    import Logo from "./Logo.svelte";
    import { Link, useLocation } from "svelte-navigator";
    import { Confirm } from "notiflix/build/notiflix-confirm-aio";
    import TopSearch from "./TopSearch.svelte";
    import { getLiuDetails, logout } from "../scripts/js/methods";

    let liuDetails = getLiuDetails();

    const location = useLocation();

    let showNav = false;

    let showSearch = false;

    $: {
        hideNav($location);
        hideSearch($location);
    }

    const hideNav = ($location) => {
        showNav = false;

        return $location;
    };

    const hideSearch = ($location) => {
        showSearch = false;

        return $location;
    };

    const toggleSearch = () => {
        showSearch = !showSearch;
    };

    const toggleNav = () => {
        showNav = !showNav;
    };

    const handleLogout = () => {
        hideNav($location);
        Confirm.show(
            "Logout",
            "Logout From This Device?",
            "Yes",
            "No",
            () => {
                //   logout
                logout();
            },
            () => {
                //    cancel
            },
            {}
        );
    };
</script>

<main>
    <div class="wrapper">
        <div class="topbar">
            <div class="mobileLogo">
                <Logo />
            </div>
            <div class="mobileActionsBar">
                <div class="actionsPanel">
                    <div class="icon-btn">
                        <i class="ri-add-box-line" />
                    </div>

                    <div class="icon-btn">
                        <i class="ri-nurse-line" />
                    </div>

                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        on:click={toggleSearch}
                        class={showSearch ? "icon-btn active" : "icon-btn"}
                    >
                        {#if showSearch}
                            <i class="ri-search-eye-line" />
                        {:else}
                            <i class="ri-search-2-line" />
                        {/if}
                    </div>
                </div>
            </div>
            <div class="menuTrigger">
                <!-- svelte-ignore a11y-click-events-have-key-events -->

                <div class="bars" on:click={toggleNav}>
                    {#if showNav}
                        <div class="active icon-btn">
                            <i class="ri-close-line" />
                        </div>
                    {:else}
                        <div class="icon-btn">
                            <i class="ri-menu-line" />
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        {#if showSearch}
            <div class="mobileSearchBar">
                <TopSearch />
            </div>
        {/if}

        {#if showNav}
            <div class="navbar">
                <div class="welcomeTag">
                    Welcome Back ({liuDetails.u})
                </div>
                <Link to="/products/new">
                    <div class="nav">- New</div>
                </Link>

                <Link to="/">
                    <div class="nav">- Home</div>
                </Link>

                <Link to="products">
                    <div class="nav">- Products</div>
                </Link>

                <Link to="/transfers">
                    <div class="nav">- Transfers</div>
                </Link>

                <Link to="/orders">
                    <div class="nav">- Orders</div>
                </Link>

                <Link to="/transfer-requests">
                    <div class="nav">- T-Requests</div>
                </Link>

                <Link to="/reports">
                    <div class="nav">- Reports</div>
                </Link>

                <Link to="/users">
                    <div class="nav">- Users</div>
                </Link>

                <Link to="/profile">
                    <div class="nav">- Profile</div>
                </Link>

                <Link to="/settings">
                    <div class="nav">- Settings</div>
                </Link>

                <Link to="/trash">
                    <div class="nav">- Trash</div>
                </Link>

                <div class="nav" style="height: 2em;" />
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="nav" on:click={handleLogout}>- Logout</div>
            </div>
        {/if}
    </div>
</main>

<style>
    .mobileLogo {
        padding-left: 5px;
    }
    .topbar {
        display: flex;
        justify-content: space-between;
    }

    .navbar {
        border-top: 1px dotted rgb(3, 65, 42);
        background: rgba(9, 33, 26, 0.822);
        text-align: left;
        padding-left: 1em;
    }

    .nav {
        line-height: 3em;
        border-bottom: 1px solid rgba(128, 128, 128, 0.182);
        font-weight: 400;
        color: #f2f2f2c5;
        display: flex;
        font-size: 12px;
    }

    /* .nicon {
        
    } */

    .mobileSearchBar {
        border-top: 1px dotted rgb(3, 65, 42);
        background: rgba(108, 108, 108, 0.037);
        /* padding-inline: 0.4em; */
        padding: 0.4em;
    }

    .welcomeTag {
        text-align: right;
        line-height: 3em;
        border-bottom: 1px solid rgba(128, 128, 128, 0.182);
        font-weight: 600;
        font-size: 12px;
        padding-right: 1em;
        color: rgb(221, 221, 221);
    }
</style>
