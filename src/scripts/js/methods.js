


export const addCommas = (number, dp) => {
    return number.toLocaleString("en-US", {
        minimumFractionDigits: dp,
        maximumFractionDigits: dp,
    });
}



export const numberFormat = (number, options) => {

    let precision = 0;

    if (options.type == 'number' && options.notation == 'compact') {

        if (number > 1000) {
            precision = 2;
        }
    }



    if (options.type == 'currency') {
        precision = 2;
    }

    const formatter = Intl.NumberFormat('en-GB', {
        notation: options.notation,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
    });

    let n = formatter.format(number);

    return n;
}


export const getLiu = () => {
    let cookieValue = "ZL-LU";

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieValue}=`);


    if (parts.length === 2) {
        let encodedLiu = parts.pop().split(";").shift();

        return encodedLiu;
    }

}

export const getLiuDetails = () => {
    let localStorangeValue = window.localStorage.ZL_LIU;

    if (localStorangeValue) {
        return JSON.parse(localStorangeValue)
    }

}


export const logout = async (userId) => {

    let ck = "ZL-LU";

    document.cookie =
        ck + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";


    window.localStorage.removeItem('ZL_LIU');

    window.location.reload();
}


export const capitalizeEveryFirstLetter = (n) => {

    n.toLowerCase();

    const words = n.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words;
}