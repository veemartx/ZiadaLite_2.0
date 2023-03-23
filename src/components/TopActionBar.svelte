<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";

    // handle theme change
    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="actionIcons">
            <div class="icon-btn">
                <i class="ri-home-line" />
            </div>

            <div class="icon-btn">
                <i class="ri-layout-grid-fill" />

                <!-- apps panel  -->
                <div class="panelContainer" />
                <!-- apps panel  -->
            </div>

            <div class="icon-btn">
                <i class="ri-add-box-line" />
            </div>

            <div class="icon-btn">
                <i class="ri-nurse-line" />
            </div>
        </div>
    </div>
</main>

<style>
    .actionIcons {
        display: flex;
        justify-content: flex-end;
    }

    .panelContainer {
        position: absolute;
        border-radius: 4px;
        text-align: left;
        background: rgba(255, 0, 0, 0);
        top: 3em;
        padding-top: 1em;
        display: none;
        width: 15em;
    }

    .icon-btn {
        color: #f2f2f2;
        /* padding-top: 5px; */
    }

    .icon-btn:hover .panelContainer {
        display: block;
    }
</style>
