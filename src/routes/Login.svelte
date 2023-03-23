<script>
    import axios from "axios";
    import { Notify } from "notiflix";
    import { onMount } from "svelte";
    import ZiadaLogo from "../assets/icons/favicon.png";
    import Footer from "../components/Footer.svelte";
    import { apiBaseUrl } from "../config/config";

    // set credentials to true so as to accept the cookies
    axios.defaults.withCredentials = true;

    let loginBtnLoading = false;

    let password;

    let username;

    const handleLogin = async () => {
        loginBtnLoading = true;

        let dt = {
            username: username,
            password: password,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}login.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.login) {
                Notify.success("Login Successful. Redirecting");

                window.localStorage.ZL_LIU = JSON.stringify(res.user);

                window.location.reload();
            } else {
                Notify.failure("Incorrect Username or Password");
            }

            loginBtnLoading = false;
        } catch (err) {
            console.log(err);

            loginBtnLoading = false;
        }
    };

    onMount(() => {});
</script>

<main>
    <div class="wrappper">
        <div class="loginContainer">
            <div class="ziadaLogo">
                <div class="zlogo">
                    <img src={ZiadaLogo} alt="" />
                </div>

                Ziada<span style="color: rgb(4, 146, 68);font-weight: 600;"
                    >Lite</span
                >&reg;
            </div>

            <div class="wirteUpContainer" style="padding-top: .8em;">
                <div class="wirteUp">
                    The World's most powerful expiries and dead stocks
                    management system
                </div>
            </div>

            <div class="formContainer" style="padding-top: .8em;">
                <form
                    class="ui form"
                    id="loginForm"
                    on:submit|preventDefault={handleLogin}
                >
                    <div class="field">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Your Username"
                            bind:value={username}
                        />
                    </div>

                    <div class="field">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Your Password"
                            bind:value={password}
                        />
                    </div>

                    <br /> <br />

                    <div class="two fields">
                        <div
                            class="field"
                            style="padding-top: 1em;text-align: right;;"
                        >
                            <button
                                class={loginBtnLoading
                                    ? "loginBtn ui orange small loading button"
                                    : "loginBtn ui orange small button"}
                            >
                                <i class="lock icon" /> Login</button
                            >
                        </div>

                        <div class="field" style="padding-top: 1.4em;">
                            <b
                                ><a href="forgot-pass" style="color:#ffff;"
                                    >Forgot Password</a
                                ></b
                            >
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <footer>
        <Footer />
    </footer>
</main>

<style>
    main {
        background: rgb(28, 1, 44);
        height: 100vh;
    }
    .wrappper {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        max-height: 90%;
    }

    .loginContainer {
        max-width: 30em;
        margin: 1em;
    }

    .ziadaLogo {
        font-size: xx-large;
        text-align: center;
        color: #ffffff;
    }

    .zlogo {
        text-align: center;
        padding: 0.5em;
    }

    .zlogo img {
        width: 80px;
        height: auto;
    }

    .wirteUp {
        font-weight: 300;
        font-size: 15px;
        text-align: center;
        line-height: 20px;
        color: #ffffff;
        padding-top: 1em;
        padding-bottom: 1em;
    }

    input {
        width: 92% !important;
        margin: auto !important;
        line-height: 2.5em !important;
        margin-top: 0.4em;
    }

    footer {
        background-color: rgb(255, 255, 255);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        background-color: var(--background-primary);
        position: absolute;
        width: 100vw;
        bottom: 0;
    }
</style>
