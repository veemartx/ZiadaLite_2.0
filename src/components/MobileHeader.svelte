<script>
    import Logo from "./Logo.svelte";
    import { Link, useLocation } from "svelte-navigator";
    import { Confirm } from "notiflix/build/notiflix-confirm-aio";
    import TopSearch from "./TopSearch.svelte";

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
                window.sessionStorage.removeItem("ziadaCpdLis");

                window.location.reload();
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
                <a href="../dash/">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-home-line" />
                        </div>
                        <div class="ntext">Home</div>
                    </div>
                </a>

                <a href="../dash/products">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-product-hunt-line" />
                        </div>
                        <div class="ntext">Products</div>
                    </div>
                </a>

                <a href="../dash/transfers">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-file-transfer-line" />
                        </div>
                        <div class="ntext">Transfers</div>
                    </div>
                </a>

                <a href="../dash/orders">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-shape-line" />
                        </div>
                        <div class="ntext">Orders</div>
                    </div>
                </a>

                <a href="../dash/transfer-requests">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-file-transfer-line" />
                        </div>
                        <div class="ntext">Transfer Requests</div>
                    </div>
                </a>

                <a href="../dash/users">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-user-3-line" />
                        </div>
                        <div class="ntext">Users</div>
                    </div>
                </a>

                <a href="../dash/expired">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-calendar-2-line" />
                        </div>
                        <div class="ntext">Expired</div>
                    </div>
                </a>

                <a href="../dash/blacklist">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-close-circle-line" />
                        </div>
                        <div class="ntext">BlackList</div>
                    </div>
                </a>

                <a href="../dash/reports">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-bar-chart-grouped-line" />
                        </div>
                        <div class="ntext">Reports</div>
                    </div>
                </a>

                <a href="../dash/settings">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-tools-fill" />
                        </div>
                        <div class="ntext">Settings</div>
                    </div>
                </a>

                <a href="../dash/trash">
                    <div class="nav">
                        <div class="nicon">
                            <i class="ri-delete-bin-5-line" />
                        </div>
                        <div class="ntext">Trash</div>
                    </div>
                </a>

                <div class="nav" style="height: 2em;" />
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="nav" on:click={handleLogout}>
                    <div class="nicon">
                        <i class="ri-logout-circle-r-line" />
                    </div>
                    <div class="ntext">Logout</div>
                </div>

                <!-- <Link to="">
                    <div class="nav">- Home</div>
                </Link>

                <Link to="tests">
                    <div class="nav">- Tests</div>
                </Link>

                <Link to="users">
                    <div class="nav">- Users</div>
                </Link>

                <Link to="articles">
                    <div class="nav">- Articles</div>
                </Link>

                <Link to="reports">
                    <div class="nav">- Reports</div>
                </Link>

                <Link to="resources">
                    <div class="nav">- Resources</div>
                </Link>

                <Link to="profile">
                    <div class="nav">- Profile</div>
                </Link>

                <Link to="settings">
                    <div class="nav">- Settings</div>
                </Link>

                <Link to="trash">
                    <div class="nav">- Trash</div>
                </Link>

                <div class="nav" style="height: 2em;" />
                svelte-ignore a11y-click-events-have-key-events -->
                <!-- <div class="nav" on:click={handleLogout}>- Logout</div> -->
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
        background: rgba(108, 108, 108, 0.037);
        text-align: left;
        padding-left: 1em;
    }

    .nav {
        line-height: 3em;
        border-bottom: 1px solid rgba(128, 128, 128, 0.182);
        font-weight: 500;
        color: rgb(3, 65, 42);
        display: flex;
    }

    /* .nicon {
        
    } */

    .ntext {
        padding-left: 0.5em;
        padding-top: 1px;
    }

    .mobileSearchBar {
        border-top: 1px dotted rgb(3, 65, 42);
        background: rgba(108, 108, 108, 0.037);
        /* padding-inline: 0.4em; */
        padding: 0.4em;
    }
</style>
