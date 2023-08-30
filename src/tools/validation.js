const numberValidation = new RegExp('^[0-9]+$');
const salaryValidation = new RegExp('([0-9]+\.?[0-9]*|\.[0-9]+)$');

export function isEmpty(value){
    if(value.toString()[0] === ' ' || value.toString().length === 0) return true;
    return false;
}

export function checkName(value){
    if(value.length < 5 || value.length > 20 || isEmpty(value)) return true;
    return false;
}

export function checkIdNumber(value){
    if(value.length !== 11 || numberValidation.test(value) === false) return true;
    return false;
}

export function checkPhoneNumber(value){
    if(value.length < 7 || numberValidation.test(value) === false) return true;
    return false;
}

export function checkSalary(value){
    if(salaryValidation.test(value) === false || isEmpty(value)) return true;
    return false;
}