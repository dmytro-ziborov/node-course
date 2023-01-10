//Validator object. Describes validation method for email.phone number,password
const Validator = {
    'validateEmail': (email) => /^[a-z\d][a-z\d.+-]{1,19}@[a-z\d.!$%&’*+/=?^_-]{1,15}\.[a-z]{1,5}$/.test(email),
    'validatePhone': (number) => /^(?=([\s-]*)?(\+\d\d?)?([\s-]*)((\(([\s-]*\d[\s-]*){3}\))|(([\s-]*\d[\s-]*){3}))([\s-]*\d[\s-]*){7}$).{10,25}$/.test(number),
    'validatePassword': (password) => /^(?=\w*[a-z])(?=\w*[A-Z])(?=\w*\d)\w{8,}$/.test(password)
}

//data to validate
const emails = [
    'fi@secondpart.end',
    'first-part@.se=cond%p.art.end',
    'first.part@se=cond%part.r',

    'f@secondart.end,',
    'first-part@.se=cond@part.end',
    '-firstpart@.se=cond%.enddeded',
    'firs_tpart@.se.en',
    'firstpart@.se.enddeded'
];
const phones = [
    '+38 (099) 567 8901',
    '+38 099 5 6 7 8 9  01',
    '+3 099 567 89 01',
    '(09-9) 567-890-1',
    '--  (099) 56    7 890-1',
    '099 5678901',
    '0995678901',
    '+38 (099) 567 8901-------',

    '+38 (099) 567 8901 0',
    '+38 099 a0000000',
    '+38 (0989) 567 8901',
    '+48 (0989) 567 890-1',
    '0995678901-------------------------------------------',
    '099567890122222222222222223231231231231231231231312312321'
];
const passwords = [
    'C00l_Pass',
    'SupperPas1',
    'Cool_pass',
    'C00l'
];

console.log('\nEmails validation\n');
validate(emails,Validator.validateEmail);

console.log('\nPhone numbers validation\n');
validate(phones,Validator.validatePhone);

console.log('\nPasswords validation\n');
validate(passwords,Validator.validatePassword);

//validates data and displays result
function validate(data,validation){
    //display results as table
    console.table(data.map(element=>{
        return {'origin':element,'result':validation(element)};
    }));

    //display results as text
    //data.forEach(element => {console.log(element,validation(element));});
}