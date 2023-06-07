<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import { formatDate, updateCrumbs } from "../../scripts/js/methods";
    import TitleActions from "../../widgets/TitleActions.svelte";

    let crumbs = {
        title: "Reports",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Reports",
                url: "/reports/",
            },
        ],
    };

    let titleActions = [
        {
            title: "Admin Gen Reports",
            url: "/reports/admin-gen-reports",
            icon: "bar chart icon",
            color: "dodgerblue",
        },
    ];

    let actionsTitle = "Actions";

    onMount(() => {
        updateCrumbs(crumbs);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="productsMainContainer">
                <div class="titleBar">
                    <div class="title">Reports</div>
                    <div class="actions">
                        <div class="bt">
                            <TitleActions
                                title={actionsTitle}
                                actions={titleActions}
                            />
                        </div>
                    </div>
                </div>

                <div class="productsTableCol" />

                <div class="pagesCol" />
            </div>
        </div>
    </div>
</main>

<style>
    main {
        margin-top: 1em;
        margin-bottom: 2em;
    }
    .productsTableCol {
        overflow-x: auto;
        margin-top: 0.5em;
    }

    .productsMainContainer {
        padding: 1em;
        background: #fff;
    }

    .pagesCol {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    .title {
        font-weight: 600;
    }

    .actions {
        padding-top: 0.5em;
        display: flex;
    }

    .bt {
        margin-inline: 0.5em;
    }
</style>
