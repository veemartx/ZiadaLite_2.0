


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


export const dashCurrentBranchTargetMonth = () => {

    let today = new Date();

    let todaysDay = today.getUTCDate();

    let firstTargetMonth;

    let secondTargetMonth;


    if (todaysDay < 15) {

        // ftm.
        today.setMonth(today.getMonth() - 1);

        firstTargetMonth = today.toLocaleString('default', { month: 'long' });

        // stm
        today.setMonth(today.getMonth());

        secondTargetMonth = today.toLocaleString('default', { month: 'long' });


    } else {

        // ftm.
        today.setMonth(today.getMonth());

        firstTargetMonth = today.toLocaleString('default', { month: 'long' });

        // stm
        today.setMonth(today.getMonth() + 1);

        secondTargetMonth = today.toLocaleString('default', { month: 'long' });


    }


    // console.log(`${firstTargetMonth},${secondTargetMonth}`);

    let targetMonth = firstTargetMonth.slice(0, 3) + ' 16<sup>th</sup> -' + secondTargetMonth.slice(0, 3) + ' 15<sup>th</sup>';

    // console.log(month);
    return targetMonth;
}


export const currentAndPreviousMonths = () => {
    let today = new Date();

    // set currentMonth
    today.setMonth(today.getMonth());

    let currentMonth = today.toLocaleString("default", { month: "long" });

    // set previousMonth
    today.setMonth(today.getMonth() - 1);

    let previousMonth = today.toLocaleString("default", { month: "long" });

    return {
        currentMonth: currentMonth,
        previousMonth: previousMonth
    }

}