<script>
    // @ts-nocheck

    import axios from "axios";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import {
        formatDate,
        getPermittedTokens,
        updateCrumbs,
    } from "../../scripts/js/methods";
    import TitleActions from "../../widgets/TitleActions.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../scripts/js/messages";
    import AuthToken from "../AuthToken.svelte";
    import AddAdminGenReport from "./AddAdminGenReport.svelte";
    import { Confirm, Notify } from "notiflix";
    import pdfMake, { async } from "pdfmake/build/pdfmake";
    import logo from "../../config/logo";
    import "pdfmake/build/vfs_fonts";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    // props

    // consts

    const RESOURCE = "reports";

    const ACTION = "create";

    const AUTH_CANCEL_MESSAGE = "Authentication Cancelled By User.";

    // vars
    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    let authTokens = [];

    let currentlyAddingField;

    let currentAdminGenReportFields = [];

    let showAddAdminGenReportsModal = false;

    let showAuthTokenModal = false;

    let showFieldsSettingsCol = false;

    let authenticatedUser;

    let branches;

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
            {
                name: "Admin Gen Reports",
                url: "/admin-gen-reports/",
            },
        ],
    };

    let titleActions = [
        {
            title: "R.M Erick Report",
            url: "/reports/admin-gen-reports",
            icon: "bar chart icon",
            color: "dodgerblue",
        },
    ];

    let actionsTitle = "Actions";

    let fields = [];

    let adminGenReports = [];

    let companyDetails = {
        postalCode: "P.o. Box 1263-09303 Nairobi Kenya",
        companyEmail: "info@pharmaplus.co.ke",
        physicalLocation: "info@pharmaplus.co.ke",
        companyPhone: "2547568383494",
    };

    let pdfColumns = ["No", "Name", "Branch", "Email", "Phone", "Position"];

    pdfMake.fonts = {
        Liberation: {
            normal: "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/liberation-serif.regular.ttf",
            bold: "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/liberation-serif.bold.ttf",
            italics:
                "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/liberation-serif.italic.ttf",
            bolditalics:
                "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/liberation-serif.bold-italic.ttf",
        },
        Fontello: {
            normal: "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/fontello.ttf",
            bold: "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/fontello.ttf",
            italics:
                "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/fontello.ttf",
            bolditalics:
                "https://pharmaplusziadalite.co.ke/assets/fonts/Liberation_serif/fontello.ttf",
        },
    };

    // state changes
    $: {
        if ($localDbStoreUsers && $localDbStorePermissions) {
            // get allowed tokens
            authTokens = getPermittedTokens(
                RESOURCE,
                ACTION,
                $localDbStoreUsers,
                $localDbStorePermissions
            );

            branches = $localDbStoreUsers.map((b) => b.branch);

            branches = branches;
        }
    }

    // methods
    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        showAddAdminGenReportsModal = true;
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
    };

    const getReportFields = async () => {
        let response = await axios.get(
            apiBaseUrl + "getAdminGenReportSettings.php"
        );

        let results = response.data;

        fields = results;
        currentAdminGenReportFields = fields;
        // console.log(fields);
    };

    const getAdminGenReports = async () => {
        let response = await axios.get(apiBaseUrl + "getAdminGenReports.php");

        let results = response.data;

        // console.log(results);
        adminGenReports = results;
    };

    const updateReportFields = async () => {
        let dt = {
            fields: currentAdminGenReportFields,
        };

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "updateAdminGenReportsSettings.php",
                data: dt,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            if (result.success) {
                Notify.success(result.message);
                getReportFields();
                showFieldsSettingsCol = false;
            } else {
                Notify.success(result.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const generatePdfBody = (reportValues) => {
        let tableBody = [];

        tableBody.push([
            { text: "No", bold: true, fontSize: 13 },
            { text: "Name", bold: true, fontSize: 13 },
            { text: "Comment", bold: true, fontSize: 13 },
        ]);

        reportValues.forEach((v, i) => {
            tableBody.push([
                {
                    text: i + 1,
                    style: "reportNo",
                },
                {
                    // border: [false, false, false, false],
                    text: v.name,
                    style: "reportTitle",
                },
                {
                    // border: [false, false, false, false],
                    text: v.value,
                    style: "reportValue",
                },
            ]);
        });

        return {
            margin: [15, 5, 15, 15],
            layout: "lightHorizontalLines",
            table: {
                widths: ["10%", "20%", "70%"],
                headerRows: 1,
                body: tableBody,
            },
        };
    };

    const generatePdf = (report) => {
        var docDefinition = {
            pageMargins: [0, 5, 5, 5],

            footer: function (currentPage, pageCount) {
                return [
                    {
                        text: currentPage.toString() + " of " + pageCount,
                        style: "footerText",
                    },
                ];
            },
            header: function (currentPage, pageCount, pageSize) {
                // you can apply any logic and return any valid pdfmake element

                return [
                    {
                        text: "ZIADA",
                        alignment: currentPage % 2 ? "left" : "right",
                        style: "headerText",
                    },
                    {
                        image: "" + logo + "",
                        width: 2000,
                        style: "logo",
                    },
                ];
            },
            watermark: {
                text: "Pharmaplus Pharmacies",
                color: "blue",
                opacity: 0.05,
                bold: false,
                italics: false,
                fontSize: 70,
            },
            content: [
                // logo
                {
                    border: [false, false, false, false],
                    image: "" + logo + "",
                    width: 250,
                    style: "logo",
                    outerHeight: 300,
                },

                {
                    style: "topCompanyName",
                    text: "Pharmaplus Pharmacies Ltd",
                },

                {
                    style: "topBarTable",
                    margin: [15, 15, 15, 0],
                    table: {
                        widths: ["100%"],
                        body: [
                            [
                                {
                                    text:
                                        "P.o. Box " +
                                        companyDetails.postalCode +
                                        " " +
                                        " | " +
                                        " " +
                                        companyDetails.companyPhone +
                                        " " +
                                        " | " +
                                        " " +
                                        companyDetails.companyEmail +
                                        " " +
                                        " | " +
                                        " " +
                                        companyDetails.physicalLocation,
                                    border: [false, false, false, true],
                                },
                            ],
                        ],
                    },
                },

                {
                    style: "headerTable",
                    margin: [15, 5, 15, 15],
                    table: {
                        widths: ["60%", "40%"],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: "R.M Eric Report",
                                    style: "mainTitle",
                                },
                                {
                                    border: [false, false, false, false],
                                    text: report.branch,
                                    style: "documentNumber",
                                },
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    text: "",
                                    fontSize: 12,
                                    bold: true,
                                },

                                {
                                    border: [false, false, false, false],
                                    text: `(${formatDate(report.createdAt)})`,
                                    alignment: "right",
                                    fontSize: 10,
                                },
                            ],
                        ],
                    },
                },

                generatePdfBody(report.data),
            ],
            defaultStyle: {
                font: "Liberation",
            },

            styles: {
                topCompanyName: {
                    fontSize: 20,
                    alignment: "center",
                    fontWeight: "bold",
                },

                topBarTable: {
                    color: "#2b2b2b",
                    fontSize: 10,
                },

                headerText: {
                    fontSize: 13,
                    bold: true,
                    color: "#ffffff",
                    opacity: 1,
                    margin: [10, 0, 0, 0],
                },
                footerText: {
                    fontSize: 13,
                    bold: true,
                    color: "rgba(18,18,18,0.9)",
                    opacity: 0.6,
                },
                headerCols: {
                    background: "red",
                },
                headerTable: {
                    border: false,
                },
                logo: {
                    italics: true,
                    alignment: "center",
                    background: "red",
                    marginTop: 10,
                },

                companyName: {
                    fontSize: 13,
                    bold: true,
                },
                mainTitle: {
                    fontSize: 13,
                    bold: true,
                },

                documentNumber: {
                    fontSize: 11,
                    bold: true,
                    alignment: "right",
                },

                contentTable: {
                    fontSize: 11,
                    margin: [15, 5, 15, 15],
                },

                footerRow: {
                    marginTop: 5,
                },

                tableHead: {
                    bold: true,
                    fontSize: 11,
                },

                summaryTable: {
                    marginTop: 20,
                },

                copyrightText: {
                    color: "gray",
                    fontSize: 10,
                    width: "*",
                    alignment: "right",
                    marginRight: 10,
                    italics: true,
                },

                tableCol: {
                    lineHeight: 1.5,
                    alignment: "justify",
                    marginTop: 8,
                    fontSize: 9,
                    marginLeft: 5,
                },
                chart: {
                    alignment: "justify",
                    background: "red",
                    marginTop: 10,
                    marginLeft: 10,
                },

                reportNo: {
                    margin: [1, 5],
                },
                reportValue: {
                    alignment: "justify",
                    fontSize: 12,
                    margin: [1, 5],
                },
                reportTitle: {
                    alignment: "justify",
                    fontSize: 12,
                    margin: [1, 5],
                },
                icon: { font: "Fontello" },
            },
        };

        // pdfMake.createPdf(docDefinition).open({}, window);
        pdfMake.createPdf(docDefinition).open();
    };

    onMount(() => {
        updateCrumbs(crumbs);
        getReportFields();
        getAdminGenReports();
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
                            <button
                                on:click={() => {
                                    showFieldsSettingsCol =
                                        !showFieldsSettingsCol;
                                }}
                                class={showFieldsSettingsCol
                                    ? "ui  orange icon mini button"
                                    : "ui basic orange icon mini button"}
                            >
                                <i class="cog icon" />
                            </button>
                        </div>

                        <div class="bt">
                            <button
                                on:click={() => {
                                    showAuthTokenModal = true;
                                }}
                                class="ui basic purple icon mini button"
                            >
                                <i class="plus icon" />
                            </button>
                        </div>
                        <div class="bt">
                            <TitleActions
                                title={actionsTitle}
                                actions={titleActions}
                            />
                        </div>
                    </div>
                </div>

                <!-- update fields col -->
                <div class="updateReportFieldsCol">
                    <div class="updateReportFields">
                        <div class="updateFieldsTitle">
                            Update Report Fields Col
                        </div>

                        <div class="upateReportFieldContent">
                            {#if showFieldsSettingsCol}
                                <div class="currentFieldsCol">
                                    <div class="currentFieldsTitle">
                                        Current Fields <span
                                            class="toRemoveField"
                                            >(Click Field To Remove)</span
                                        >
                                    </div>
                                    <div class="currentFieldsContainer">
                                        {#each fields as f, i}
                                            <div class="fieldBtn">
                                                <button
                                                    on:click={() => {
                                                        Confirm.show(
                                                            "Remove",
                                                            `Remove ${f} From Admin Gen Report Fields?`,
                                                            "Yes",
                                                            "No",
                                                            () => {
                                                                currentAdminGenReportFields.splice(
                                                                    i,
                                                                    1
                                                                );

                                                                currentAdminGenReportFields =
                                                                    currentAdminGenReportFields;

                                                                updateReportFields();
                                                            },
                                                            () => {},
                                                            {}
                                                        );
                                                    }}
                                                    class="ui purple mini button"
                                                    >{f}</button
                                                >
                                            </div>
                                        {/each}
                                    </div>
                                </div>

                                <div class="addFieldForm">
                                    <div class="currentFieldsTitle">
                                        Add Field
                                    </div>

                                    <form
                                        on:submit|preventDefault={() => {
                                            currentAdminGenReportFields.push(
                                                currentlyAddingField
                                            );
                                            currentAdminGenReportFields =
                                                currentAdminGenReportFields;

                                            updateReportFields();
                                            currentlyAddingField = "";
                                            showFieldsSettingsCol = false;
                                        }}
                                    >
                                        <div class="field">
                                            <label for="newField">
                                                Field
                                            </label>
                                            <input
                                                type="text"
                                                name="field"
                                                id="newField"
                                                placeholder="New Field"
                                                required
                                                bind:value={currentlyAddingField}
                                            />
                                        </div>

                                        <div
                                            class="field"
                                            style="padding-top: 1em;text-align:center;"
                                        >
                                            <button
                                                class="ui basic icon mini purple button"
                                            >
                                                <i class="plus icon" /> Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
                <!-- update fields col -->

                <div class="reportsTableCol">
                    <table
                        class="ui basic striped unstackable single line table"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Branch</th>
                                <th>Data</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Print</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each adminGenReports as r, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{r.branch}</td>
                                    <td>
                                        {#if r.data}
                                            {#each r.data as d}
                                                <div class="dataField">
                                                    <span class="fieldName"
                                                        >{d.name}</span
                                                    >
                                                    :<span class="fieldValue"
                                                        >{d.value}</span
                                                    >
                                                </div>
                                            {/each}
                                        {/if}
                                    </td>
                                    <td>{r.createdBy}</td>
                                    <td>{formatDate(r.createdAt)} </td>
                                    <td>
                                        <button
                                            class="ui purple mini icon basic button"
                                            on:click={() => {
                                                generatePdf(r);
                                            }}
                                        >
                                            <i class="print icon" />
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="pagesCol" />
            </div>
        </div>
    </div>
</main>

<!-- auth modal -->
{#if showAuthTokenModal}
    <AuthToken
        bind:authenticatedUser
        payload={authTokens}
        errorMessage={AUTH_ERROR_MESSAGE}
        cancelMessage={AUTH_CANCEL_MESSAGE}
        on:success={authTokenSuccess}
        on:cancel={cancelAuthentication}
    />
{/if}
<!-- auth modal -->

<!-- add report modal  -->
{#if showAddAdminGenReportsModal}
    <AddAdminGenReport
        {fields}
        {authenticatedUser}
        {branches}
        on:cancel={() => {
            showAddAdminGenReportsModal = false;
        }}
        on:success={() => {
            showAddAdminGenReportsModal = false;
            getAdminGenReports();
        }}
    />
{/if}

<!-- add report modal  -->

<style>
    main {
        margin-top: 1em;
        margin-bottom: 2em;
    }
    .reportsTableCol {
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

    .fieldValue {
        margin-left: 0.1em;
        font-weight: 600;
    }

    .dataField {
        padding-inline: 0.4em;
    }

    .updateFieldsTitle {
        color: var(--text-primary-light);
        font-weight: 600;
        padding-top: 1em;
        border-bottom: 1px solid rgba(102, 102, 102, 0.182);
    }

    .upateReportFieldContent {
        display: flex;
        padding: 1em;
        justify-content: space-between;
        flex-direction: column;
    }

    .currentFieldsTitle {
        color: var(--text-primary-light);
        font-weight: 600;
        padding-top: 1em;
        border-bottom: 1px solid rgba(102, 102, 102, 0.182);
    }

    .currentFieldsContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .fieldBtn {
        padding-top: 1em;
    }

    .toRemoveField {
        color: crimson;
        font-size: x-small;
    }
</style>
