<script>
    import CreateAllowedUpload from "./CreateAllowedUpload.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="segment">
                <div class="titleBar">
                    <div class="title">Uploads</div>
                </div>

                <div class="contentBar">
                    <div class="contentTitleBar">
                        <div class="contentTitle">Approved Upload Files</div>
                        <div class="actionsBar">
                            <button class="ui basic blue mini icon button">
                                <i class="plus icon" />
                            </button>
                        </div>
                    </div>
                    <div class="contentBar">hahah</div>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- create allowed upload type modal  -->
<CreateAllowedUpload />

<!-- create allowed upload type modal  -->

<style>
    .contentTitleBar {
        padding-top: 1em;
    }

    .contentTitle {
        font-weight: 900;
        font-size: small;
    }
</style>
