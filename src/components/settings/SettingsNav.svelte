<script>
    import { Link } from "svelte-navigator";
    import SettingsSearch from "./SettingsSearch.svelte";
</script>

<main>
    <div class="settingsNav">
        <div class="search">
            <SettingsSearch />
        </div>
        <div class="navContainer">
            <Link to="/settings/general">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-settings-6-line" />
                    </div>
                    <div class="navText">General</div>
                </div>
            </Link>

            <!-- hidden till further notice -->
            <!-- <Link to="/settings/products">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-medicine-bottle-line" />
                    </div>
                    <div class="navText">Products</div>
                </div>
            </Link> -->

            <Link to="/settings/inventory">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-medicine-bottle-line" />
                    </div>
                    <div class="navText">Inventory</div>
                </div>
            </Link>

            <Link to="/settings/accounts">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-account-pin-circle-line" />
                    </div>
                    <div class="navText">Accounts</div>
                </div>
            </Link>

            <Link to="/settings/company">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-building-4-line" />
                    </div>
                    <div class="navText">Company</div>
                </div>
            </Link>

            <Link to="/settings/reports">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-folder-chart-line" />
                    </div>
                    <div class="navText">Reports</div>
                </div>
            </Link>

            <Link to="/settings/permissions">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-lock-password-line" />
                    </div>
                    <div class="navText">Permissions</div>
                </div>
            </Link>

            <Link to="/settings/performance">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-bar-chart-2-line" />
                    </div>
                    <div class="navText">Performance</div>
                </div>
            </Link>

            <Link to="/settings/system">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-window-2-line" />
                    </div>
                    <div class="navText">System</div>
                </div>
            </Link>

            <Link to="/settings/about">
                <div class="navCol">
                    <div class="navIcon">
                        <i class="ri-information-line" />
                    </div>
                    <div class="navText">About Ziada</div>
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
