// This file contains a list of all general client related data required
// The data is split into two lists: personal, and financial
// The lists are set up to be able to be mapped and made into a form.
// All data has fieldName and fieldType attributes. (if fieldType is "radio", it also has an options attribute with list of option names)

// Author: R. Markowitz
// Last Updated: March 2025

import {validateField, phoneRegex, phoneInvalidMsg, emailRegex, emailInvalidMsg, ssnRegex, ssnInvalidMsg, ssnOrEinRegex, ssnOrEinInvalidMsg, priceRegex, priceInvalidMsg,
    nameRegex, nameInvalidMsg, percentRegex, percentInvalidMsg, addressRegex, addressInvalidMsg, dateRegex, dateInvalidMsg, 
    priceOrPercentRegex, priceOrPercentInvalidMsg, intRegex, intInvalidMsg, intOrNARegex, longTextRegex, longTextInvalidMsg,
    pricePerTimeRegex, pricePerTimeInvalidMsg, pricePerTimeOrNARegex, creditScoreRegex, creditScoreInvalidMsg} from './Regex'

export const personalInfo = [{fieldName: "First Name", fieldType: "text", regex: nameRegex, invalidMsg: nameInvalidMsg},
                    {fieldName: "Last Name", fieldType: "text", regex: nameRegex, invalidMsg: nameInvalidMsg},
                    {fieldName: "Email", fieldType: "text", regex: emailRegex, invalidMsg: emailInvalidMsg},
                    {fieldName: "Phone Number", fieldType: "text", regex: phoneRegex, invalidMsg: phoneInvalidMsg},
                    {fieldName: "Date of Birth", fieldType: "text", regex: dateRegex, invalidMsg: dateInvalidMsg},
                    // {fieldName: "Social Security Number", fieldType: "text", regex: ssnRegex, invalidMsg: ssnInvalidMsg},
                    {fieldName: "Address", fieldType: "text", regex: addressRegex, invalidMsg: addressInvalidMsg},
                    // {fieldName: "Valid ID", fieldType: "file", file: null}
                ];

export const financialInfo = [{fieldName: "Employer Name", fieldType: "text", regex: nameRegex, invalidMsg: nameInvalidMsg},
                    {fieldName: "Years Employed", fieldType: "text", regex: intRegex, invalidMsg: intInvalidMsg},
                    {fieldName: "Employer Mailing Address", fieldType: "text", regex: addressRegex, invalidMsg: addressInvalidMsg},
                    {fieldName: "Annual Salary", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                    {fieldName: "Annual Bonus", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                    {fieldName: "Annual Rent Income", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                    {fieldName: "Other Annual Income", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                    {fieldName: "Credit Score", fieldType: "text", regex: creditScoreRegex, invalidMsg: creditScoreInvalidMsg}
                ];