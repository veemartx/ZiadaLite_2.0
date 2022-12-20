<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="compNav">
                <a href="../dash">
                    <div class="nav">
                        <i class="ri-home-line" /> &nbsp; Home &nbsp;
                    </div>
                </a>

                <a href="../dash/products">
                    <div class="nav">
                        <i class="ri-product-hunt-line" /> &nbsp; Products &nbsp;
                    </div>
                </a>

                <a href="../dash/transfers">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; Transfers &nbsp;
                    </div>
                </a>

                <a href="../dash/orders">
                    <div class="nav">
                        <i class="ri-shape-line" /> &nbsp; Orders &nbsp;
                    </div>
                </a>

                <a href="../dash/transfer-requests">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; Transfer Requests
                    </div>
                </a>

                <a href="../dash/users">
                    <div class="nav">
                        <i class="ri-user-3-line" /> &nbsp; Users
                    </div>
                </a>

                <a href="../dash/expired">
                    <div class="nav">
                        <i class="ri-calendar-2-line" /> &nbsp; Expired
                    </div>
                </a>

                <a href="../dash/blacklist">
                    <div class="nav">
                        <i class="ri-file-list-3-line" />
                        &nbsp; BlackList &nbsp;
                    </div>
                </a>

                <a href="../dash/reports">
                    <div class="nav">
                        <i class="ri-file-chart-line" />
                        &nbsp; Reports &nbsp;
                    </div>
                </a>

                <a href="../dash/settings">
                    <div class="nav">
                        <i class="ri-settings-6-line" /> &nbsp; Settings &nbsp;
                    </div>
                </a>

                <a href="../dash/trash">
                    <div class="nav">
                        <i class="ri-delete-bin-line" /> &nbsp; Trash &nbsp;
                    </div>
                </a>

                <!-- <Link to="/dash">
                    <div class="nav">
                        <i class="ri-home-line" /> &nbsp; Home &nbsp;
                    </div>
                </Link> -->

                <!-- <Link to="/dash/products">
                    <div class="nav">
                        <i class="ri-product-hunt-line" /> &nbsp; Products &nbsp;
                    </div>
                </Link> -->

                <!-- <Link to="/dash/transfers">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; Transfers &nbsp;
                    </div>
                </Link>

                <Link to="/dash/orders">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; Orders &nbsp;
                    </div>
                </Link>

                <Link to="dash/transfer-requests">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; Transfer Requests
                        &nbsp;
                    </div>
                </Link>

                <Link to="/dash/users">
                    <div class="nav">
                        <i class="ri-user-5-line" />
                        &nbsp; Users &nbsp;
                    </div>
                </Link>

                <Link to="/dash/expired">
                    <div class="nav">
                        <i class="ri-brackets-fill" />
                        &nbsp; Expired &nbsp;
                    </div>
                </Link>

                <Link to="/dash/blacklist">
                    <div class="nav">
                        <i class="ri-file-list-3-line" />
                        &nbsp; BlackList &nbsp;
                    </div>
                </Link>

                <Link to="/dash/reports">
                    <div class="nav">
                        <i class="ri-file-chart-line" />
                        &nbsp; Reports &nbsp;
                    </div>
                </Link>

                <Link to="/dash/settings">
                    <div class="nav">
                        <i class="ri-settings-6-line" /> &nbsp; Settings &nbsp;
                    </div>
                </Link>

                <Link to="/dash/trash">
                    <div class="nav">
                        <i class="ri-delete-bin-line" /> &nbsp; Trash &nbsp;
                    </div>
                </Link> -->
            </div>
        </div>
    </div>
</main>

<style>
    .content {
        text-align: left;
        line-height: 2em;
    }

    .compNav {
        display: flex;
    }
    .nav {
        display: flex;
        padding-right: 1em;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        color: rgb(3, 65, 42);
        font-size: 13px;
        font-weight: 400;
    }
</style>
