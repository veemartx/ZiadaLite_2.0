<script>
    import { Link } from "svelte-navigator";
    import Search from "./Search.svelte";
</script>

<main>
    <div class="settingsNav">
        <div class="search">
            <Search />
        </div>
        <div class="navContainer">
            <Link to="/apps/communications/">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-home-line" />
                    </div>
                    <div class="navText">Home</div>
                </div>
            </Link>

            <Link to="/apps/communications/company">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-medicine-bottle-line" />
                    </div>
                    <div class="navText">Company</div>
                </div>
            </Link>

            <Link to="/apps/communications/regional">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-luggage-deposit-line" />
                    </div>
                    <div class="navText">Regional</div>
                </div>
            </Link>

            <Link to="/apps/communications/branch">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-bar-chart-grouped-line" />
                    </div>
                    <div class="navText">Branch</div>
                </div>
            </Link>

            <Link to="/apps/communications/settings">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-settings-2-line" />
                    </div>
                    <div class="navText">Settings</div>
                </div>
            </Link>
        </div>
    </div>
</main>

<style>
    .navCol {
        display: flex;
        line-height: 1em;
        border-bottom: 1px solid rgba(161, 161, 161, 0.5);
        padding: 1em;
        color: black;
    }

    .navCol:hover {
        background: #eeeeee;
    }

    .navIcon {
        margin-right: 1em;
    }

    .search {
        display: none;
    }
    .navContainer {
        margin-top: 0.5em;
    }

    @media only screen and (min-width: 640px) {
        .navContainer {
            margin-top: 1em;
        }

        .search {
            display: block;
            border-bottom: 1px solid gray;
        }
    }
</style>
