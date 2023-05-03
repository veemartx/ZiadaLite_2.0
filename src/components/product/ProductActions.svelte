<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">Actions</div>
            </div>
            <div class="actionsCol">
                <button class="basic ui orange icon small button">
                    <i class="edit icon" /> Adjust
                </button>

                <button class="basic ui green icon small button">
                    <i class="edit icon" /> Sale Edit
                </button>

                <button class="basic ui blue icon small button">
                    <i class="download icon" /> Request
                </button>

                <button class="basic ui teal icon small button">
                    <i class="upload icon" /> Transfer
                </button>

                <button class="basic ui red icon small button">
                    <i class="trash icon" /> Delete
                </button>
            </div>
        </div>
    </div>
</main>

<style>
    .title {
        font-size: 14px;
        color: var(--ziada-green);
        font-weight: 400;
        font-family: "Roboto", sans-serif;
    }

    .actionsCol {
        padding-top: 1em;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .actionsCol button {
        margin: 0.5em !important;
        width: 8em !important;
    }

    @media only screen and (min-width: 640px) {
        .actionsCol {
            padding-top: 1em;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }
</style>
