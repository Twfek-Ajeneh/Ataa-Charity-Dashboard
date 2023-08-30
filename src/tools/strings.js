isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

export function comma( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export function dateFormat(date){
    return date.toISOString().split("T")[0];
}

export function monthDateFormat(date){
    var months = 
    [
        "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

export function calcPercent(target , cur){
    target = parseInt(target , 10);
    cur = parseInt(cur , 10);
    return (cur*100)/target;
}

export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr] , filename + `.${mime.substring(mime.indexOf('/')+1)}`, {type : mime});
}

export function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}

export function maxDate(first , second){
    const firstDate = new Date(first);
    const secondDate = new Date(second);
    const date = new Date(Math.max.apply(null ,[firstDate , secondDate]));
    return dateFormat(date);
}