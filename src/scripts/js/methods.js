// @ts-nocheck
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { navigate } from "svelte-navigator";





dayjs.extend(customParseFormat)


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
    window.localStorage.removeItem('ZLUSRTKNS');
    window.localStorage.removeItem('ZLSTNGS');
    window.localStorage.removeItem('ZLPMS');


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


export const getExpiryDateConstraints = () => {
    let now = dayjs();

    let ninthMonthFromNow = dayjs(now).add(9, 'months').format('YYYY-MM');
    let eighthMonthFromNow = dayjs(now).add(8, 'months').endOf('month').format('YYYY-MM');


    return {
        minDeadStockExpiryMonth: ninthMonthFromNow,
        minDeadStockExpiryDate: dayjs(ninthMonthFromNow + '-01').endOf('month').format('MMM DD, YYYY'),
        maxShortExpiryMonth: eighthMonthFromNow,
        maxShortExpiryDate: dayjs(eighthMonthFromNow + '-01').endOf('month').format('MMM DD, YYYY'),

    };
}

export const getMaxShortExpiryDate = () => {

    let date = new Date();

    let year = date.getFullYear();

    let month = date.getMonth() + 1;

    let day = date.getDate();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;

    }

    let todaysDate = year + "-" + month + "-" + day;

    // console.log(todaysDate);

    // add
    var result = new Date(todaysDate);
    result.setDate(result.getDate() + 250);

    // console.log(result);

    var lastDayOfMonth = new Date(result.getFullYear(), result.getMonth() + 1, 0);

    let lastDayYear = lastDayOfMonth.getFullYear();

    let lastDayMonth = lastDayOfMonth.getMonth() + 1;

    let lastDayDate = lastDayOfMonth.getDate();

    if (lastDayMonth < 10) {
        lastDayMonth = "0" + lastDayMonth;
    }

    if (lastDayDate < 10) {
        lastDayDate = "0" + lastDayDate;

    }

    let lastDayMonthDate = lastDayYear + "-" + lastDayMonth

    // console.log(lastDayMonthDate);
    return lastDayMonthDate;

}


// returns the last day of the ninth mont from today
export const getMinDeadStockExpiryDate = () => {

    let date = new Date();

    let ninthMonthFromNow = dayjs(date).add(9, 'months')

    return ninthMonthFromNow;
}

export const formatDate = (d) => {

    // if date includes time
    if (d.length > 12) {
        return dayjs(d).format('MMM DD, YYYY H:m:s');

    } else {
        return dayjs(d).format('MMM DD, YYYY');

    }
}


// takes an object of the filters to apply
// eg for delete products only admins, region, region-managers,Auditor
// for now we allow only position constraints
const filterPermittedTokens = (filter) => {
    let authTokensString = window.localStorage.ZLUSRTKNS;

    let authTokens = [];

    if (authTokensString) {
        let allTokens = JSON.parse(authTokensString);

        // allowed positions
        let allowedPositions = filter.pos.allowed;

        // if all
        if (allowedPositions[0] == 'all') {
            authTokens = allTokens;
        } else {

            // token structure
            // {"u":"wertyuisjlcgk","t":"6795","p":"admin","d":"Technical Support"}
            let allowedTokens = allTokens.at.filter((t) => {

                if (allowedPositions.includes(t.p)) {
                    return t;
                }
            })

            authTokens = allowedTokens;
        }
    }

    return authTokens;
}


export const getPermittedTokens = (resource, action, users, permissions) => {

    // console.log(users);
    // an array of allowed positions
    let allowed;

    // console.log(permissions);

    // filter the array for resource
    let filteredResourceArray = permissions.filter((p) => {
        if (p.resource == resource) {
            // chech the action here,
            if (action == p.action) {
                return p;

            }

        }
    })

    // remember to  add this to settings
    let defaultAllowed = ['admin'];

    if (filteredResourceArray.length < 1) {
        allowed = defaultAllowed;
    } else {
        allowed = filteredResourceArray[0].allowed;
    }

    // filter the users
    let filteredAllowedTokensArray = users.filter((u) => {

        if (allowed.includes(u.position)) {
            return u;
        }
    })

    console.log(filteredAllowedTokensArray);

    return filteredAllowedTokensArray;

}


export const goBack = () => {
    navigate(-1);
}


// gets a month year eg (02-2023)
export const getFirstAndLastDatesOfAMonth = (month) => {

    month = month + '-01';

    console.log(month);

    return {
        first: dayjs(month).startOf('month').format('YYYY-MM-DD'),
        last: dayjs(month).endOf('month').format('YYYY-MM-DD')
    }

}