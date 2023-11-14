<script>
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let name;

    export let code;

    export let expiry_date;

    export let qty;

    export let sales_uom;

    export let batch;

    export let branch;

    const submit = () => {
        dispatch("submit");
    };

    const cancel = () => {
        dispatch("cancel");
    };
</script>

<main>
    <div class="modal">
        <div class="ui segment">
            <div class="titleBar">
                <div class="title">Preview {name}</div>
            </div>
            <div class="contentBar">
                <div class="name">
                    Product Name: <b>{name}</b>
                </div>

                <div class="code">
                    Product Code: <b>{code}</b>
                </div>

                <div class="exp">
                    Expiry Date: <b>{expiry_date}</b>
                </div>

                <div class="qty">
                    Product Qty ({sales_uom}): <b>{qty}</b>
                </div>

     

                <div class="batch">
                    Batch No: <b>{batch}</b>
                </div>

                <div class="branch">
                    Branch: <b>{branch}</b>
                </div>
            </div>

            <br />

            <div class="actionsBar">
                <button class="ui negative mini button" on:click={cancel}>
                    No
                </button>
                <button class="ui positive mini button" on:click={submit}>
                    Yes
                </button>
            </div>
        </div>
    </div>
</main>

<style>
    .modal {
        background: rgba(0, 0, 0, 0.289);
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(3px);
    }
</style>
