
// Regex strings for different types of fields
const phoneRegex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/
const ssnOrEinRegex = /^\d{3}-?\d{2}-?\d{4}$|^\d{2}-?\d{7}$/
const priceRegex = /^\$?\d{1,3}(,?\d{3})*(\.\d{2})?$/
const nameRegex = /^[a-zA-Z0-9\s'-]{1,100}$/
const percentRegex = /^\d{1,3}%{1}$/
const addressRegex = /^\d+\s[a-zA-Z0-9\s,.'-]{3,200}\d{4,5}$/
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/
const priceOrPercentRegex = /^\$\d{1,3}(,?\d{3})*(\.\d{2})?$|^\d{1,3}%$/
const intRegex = /^\d{1,3}$/
const intOrNARegex = /^[\d{1,3}]|N\/A$/
const longTextRegex = /^[a-zA-Z0-9\s,'-\/.]{0,500}$/
const pricePerTimeRegex = /^\$?\d{1,3}(,?\d{3})*(\.\d{2})?\/(a-zA-Z){5}$/
const pricePerTimeOrNARegex = /^\$?\d{1,3}(,?\d{3})*(\.\d{2})?\/[a-zA-Z]+$|^N\/A$/
const creditScoreRegex = /^\d{3}$/

// Invalid input messages corresponding to specific regex strings
const priceInvalidMsg = "Please enter a valid $ amount Ex: $1,000."
const phoneInvalidMsg = "Please enter a valid phone number Ex: 732-732-7732."
const nameInvalidMsg = "Pleae enter a valid name. The name must be 100 characters or less of only letters, numbers, ' or -."
const longTextInvalidMsg = "Text must be 500 characters or less and may only include letters, numbers, commas, ' , and -."
const addressInvalidMsg = "Please enter a valid address. Ex: 1111 Sample Blvd, Lakewood, NJ, 08701"
const emailInvalidMsg = "Please enter a valid email. Ex: sample@example.com"
const ssnInvalidMsg = "Please enter a valid 9 digit SSN. Ex: 000-00-0000"
const ssnOrEinInvalidMsg = "Please enter a valid 9 digit SSN or EIN. Need help with EIN? Paste \'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online\' into your browser for help."
const percentInvalidMsg = "Please enter a valid percent. Ex: 80%"
const dateInvalidMsg = "Please enter a valid date. Ex: 01/01/2000"
const priceOrPercentInvalidMsg = "Please enter a valid $ amount or %. Please specify if you entered a $ or %. Ex: 80%"
const intInvalidMsg = "Please enter a valid number 0-999."
const pricePerTimeInvalidMsg = "Please enter a valid $ amount with a frequency Ex: 200/yr"
const creditScoreInvalidMsg = "Please enter a valid 3 digit credit score Ex: 765."


// Function to validate data
// Params: {fieldName: "", fieldType:"text", regex: <Regex>, value: ""}
// Return: True if valid, false if invalid
const validateField = (field) => {
    const value = field.value.trim();

    const isValidRegex = (field.regex).test(value);

    if (isValidRegex){
        return true;
    }else{
        return false;
    }

}

export {validateField, phoneRegex, phoneInvalidMsg, emailRegex, emailInvalidMsg, ssnRegex, ssnInvalidMsg, ssnOrEinRegex, ssnOrEinInvalidMsg, priceRegex, priceInvalidMsg,
    nameRegex, nameInvalidMsg, percentRegex, percentInvalidMsg, addressRegex, addressInvalidMsg, dateRegex, dateInvalidMsg, 
    priceOrPercentRegex, priceOrPercentInvalidMsg, intRegex, intInvalidMsg, intOrNARegex, longTextRegex, longTextInvalidMsg,
    pricePerTimeRegex, pricePerTimeInvalidMsg, pricePerTimeOrNARegex, creditScoreRegex, creditScoreInvalidMsg}