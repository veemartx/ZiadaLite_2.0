<script>
    import { Link } from "svelte-navigator";
    import ZiadaCoreSearch from "./ZiadaCoreSearch.svelte";
</script>

<main>
    <div class="settingsNav">
        <div class="search">
            <ZiadaCoreSearch />
        </div>
        <div class="navContainer">
            <Link to="/apps/zconnect/">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-home-line" />
                    </div>
                    <div class="navText">Home</div>
                </div>
            </Link>

            <Link to="/apps/zconnect/products">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-medicine-bottle-line" />
                    </div>
                    <div class="navText">Products</div>
                </div>
            </Link>

            <Link to="/apps/zconnect/sales">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-luggage-deposit-line" />
                    </div>
                    <div class="navText">Sales</div>
                </div>
            </Link>

            <Link to="/apps/zconnect/performance">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-bar-chart-grouped-line" />
                    </div>
                    <div class="navText">Performance</div>
                </div>
            </Link>

            <Link to="/apps/zconnect/settings">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-settings-2-line" />
                    </div>
                    <div class="navText">Settings</div>
                </div>
            </Link>

            <Link to="/apps/zconnect/">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-information-line" />
                    </div>
                    <div class="navText">
                        About ZiadaConnect <sup>&trade;</sup>
                    </div>
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
