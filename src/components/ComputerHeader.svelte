<script>
    // @ts-nocheck

    import Logo from "./Logo.svelte";
    import ComputerNav from "./ComputerNav.svelte";
    import TopActionBar from "./TopActionBar.svelte";
    import TopSearch from "./TopSearch.svelte";
    import TopUtilities from "./TopUtilities.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="toolbar">
            <div class="content">
                <div class="logo">
                    <Logo />
                </div>

                <div class="search">
                    <TopSearch />
                </div>

                <div class="actions">
                    <TopActionBar />
                </div>

                <div class="profile">
                    <TopUtilities />
                </div>
            </div>
        </div>

        <div class="navbar">
            <ComputerNav />
        </div>
    </div>
</main>

<style>
    .content {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
    .toolbar {
        margin-top: 0.1em;
        height: 4em;
        border-bottom: 1px dotted rgb(3, 65, 42);
    }

    .navbar {
        background: rgba(108, 108, 108, 0.037);
    }

    .logo {
        flex: 1;
    }

    .search {
        flex: 3;
    }

    .actions {
        flex: 2;
    }

    .profile {
        flex: 1;
        margin-top: -0.4em;
    }
</style>
