<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import { Confirm } from "notiflix";

    Confirm.init({
        className: "notiflix-confirm",
        width: "300px",
        zindex: 400000,
    });

    export let productsList = [];

    // send message to close modal
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    function sendSelected(selected) {
        dispatch("selected", selected);
    }

    const renderProductsList = () => {
        let table = window.$("#productsList").DataTable({
            dom: "Bfrtip",
            responsive: true,
            data: productsList,
            columns: [
                { title: "Name", data: "pn" },
                { title: "Code", data: "pc" },
                { title: "Cost Price", data: "cp" },
                { title: "Pack Size", data: "ps" },
                {
                    title: "Select",
                    data: "pc",
                    render: function (data, type) {
                        if (type === "display") {
                            return (
                                "<div> <button class='selectAction ui basic teal icon mini button' data='" +
                                data +
                                "'>select</button> </div>"
                            );
                        }

                        return data;
                    },
                },
            ],
        });

        window.$(document).on("click", ".selectAction", function () {
            let productCode = window.$(this).attr("data");

            // filter
            let filteredProductsArray = productsList.filter((pl) => {
                if (productCode == pl.pc) {
                    return pl;
                }
            });

            console.log(filteredProductsArray);

            Confirm.show(
                "Select?",
                `Select ${filteredProductsArray[0].pn}?`,
                "Yes",
                "No",
                () => {
                    sendSelected(filteredProductsArray[0]);
                }
            );
        });
    };

    onMount(() => {
        renderProductsList();
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Assisted Product Creation</div>
                    <div class="close closeModal">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i on:click={closeModal} class="ri-close-line" />
                    </div>
                </div>

                <div class="contentBar">
                    <table
                        style="width: 100%;"
                        id="productsList"
                        class="table display striped"
                    />
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .modalContent {
        margin-top: 1em !important;
        position: absolute !important;
        width: 80%;
        height: 90vh;
    }

    .contentBar {
        width: 100%;
    }
</style>
