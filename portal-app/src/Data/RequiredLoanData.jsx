// This file contains exported detailed lists of all the data and file that is required for each loan
// The lists are set up to be able to be mapped and made into a form.
// All data has fieldName and fieldType attributes. (if fieldType is "radio", it also has an options attribute with list of option names)
// All files have fileName, maxUploads, template, and hasFromPortalOption attributes.

// Author: R. Markowitz
// Last Updated: Jan. 16 2025

import React from "react";
import {validateField, phoneRegex, phoneInvalidMsg, emailRegex, emailInvalidMsg, ssnRegex, ssnInvalidMsg, priceRegex, priceInvalidMsg,
    nameRegex, nameInvalidMsg, percentRegex, percentInvalidMsg, addressRegex, addressInvalidMsg, dateRegex, dateInvalidMsg, 
    priceOrPercentRegex, priceOrPercentInvalidMsg, intRegex, intInvalidMsg, intOrNARegex, longTextRegex, longTextInvalidMsg,
    pricePerTimeRegex, pricePerTimeInvalidMsg, pricePerTimeOrNARegex} from './Regex'

// The following are the fields of DATA for needed for all loans. This is the complete list for purchase loans.
export const allLoanInfo = [{fieldName: "LLC Name", fieldType: "text", regex: nameRegex, invalidMsg: nameInvalidMsg},
                {fieldName: "Property Address", fieldType: "text", regex: addressRegex, invalidMsg: addressInvalidMsg}, 
                {fieldName: "Purchase Price", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Purchase Date (mm/dd/yyyy)", fieldType: "text", regex: dateRegex, invalidMsg: dateInvalidMsg},
                {fieldName: "Amount of Loan Request ($) or Loan To Value (%)", fieldType: "text", regex: priceOrPercentRegex, invalidMsg: priceOrPercentInvalidMsg},
                {fieldName: "Prepayment Penalty", fieldType: "radio", options: ["3%", "2%", "1%"]},
                {fieldName: "Contact Number for Appraiser", fieldType: "text", regex: phoneRegex, invalidMsg: phoneInvalidMsg}
            ];

// Refinance loans require additional data. The following is a complete list of all required fields
export const refiInfo = [...allLoanInfo, 
                {fieldName: "Property Type", fieldType: "radio", options: ["Single Family", "2-4 Units","5+  Units", "Condo"]},
                {fieldName: "Number of Units", fieldType: "text", regex: intOrNARegex, invalidMsg: intInvalidMsg, state: "disabled", placeHolder: "N/A"},
                {fieldName: "HOA Fees", fieldType: "text", regex: pricePerTimeOrNARegex, invalidMsg: pricePerTimeInvalidMsg, state: "disabled", placeHolder: "N/A"},
                {fieldName: "Occupancy Status", fieldType: "radio", options: ["Occupied", "Vacant"]},
                {fieldName: "Estimated Current Market Value (As is)", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Existing Debt", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Monthly Rent/Market Rent", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
            ];
        
// Fix and Flip Loans require all the data for "Scope of Work". The following is a complete list of all the fields
export const fixAndFlipInfo = [...allLoanInfo,
                {fieldName: "Plans & Permits Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Plans & Permits Description", fieldType: "radio", options: ["Building permit", "Building permit and other permits", "Plans and permits", "Architect/structure engineering", "Architect/structure engineering and permits"]},
                {fieldName: "Demolition Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Demolition Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Roof & Gutters Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Roof & Gutters Description", fieldType: "radio", options: ["New roof", "Repair roof", "New roof and new gutters", "Repair fascia and/or gutters", "New roof in the addition", "New gutters"]},
                {fieldName: "Windows Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Windows Description", fieldType: "radio", options: ["Replace all windows", "Replace 1-2 windows", "Replace 3-5 windows", "Replace 6-10 windows", "Repair windows as needed", "Install new windows in the addition"]},
                {fieldName: "Paint Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Paint Description", fieldType: "radio", options: ["New paint throughout the interior", "Paint touchups"]},
                {fieldName: "Flooring Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Flooring Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Kitchen Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Kitchen Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Bathrooms Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Bathrooms Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Plumbing Work Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Plumbing Work Description", fieldType: "radio", options: ["All new plumbing system", "Repair plumbing system", "Install new water heater"]},
                {fieldName: "Electrical Work Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Electrical Work Description", fieldType: "radio", options: ["Repair electric system", "All new light fixtures and switches / outlets", "All new light fixtrures and switches / outletx", " All new electircal system with all new light fixtures, switches, and outlets", "Upgrade electrical panel", "Upgrade electrical panel and repairs as needed", "All new electrical system with all new light fixtures, switches, and outlets for the addition"]},
                {fieldName: "HVAC Work Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "HVAC Work Description", fieldType: "radio", options: ["All new HVAC system", "Repair HVAC system", "Replace HVAC system from electric to gas", "Install new furnace", "Install new furnace with new ducting"]},
                {fieldName: "Yard / Landscaping Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Yard / Landscaping Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Cleanup Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Cleanup Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Other1 Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Other1 Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Other2 Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Other2 Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg},
                {fieldName: "Other3 Budget", fieldType: "text", regex: priceRegex, invalidMsg: priceInvalidMsg},
                {fieldName: "Other3 Description", fieldType: "text", regex: longTextRegex, invalidMsg: longTextInvalidMsg}
            
            ];

// The following are the FILES required for all loans.
const allLoanFiles = [{fileName: "LLC", maxUploads: "1", template: "", hasFromPortalOption: "yes"},
                {fileName: "EIN", maxUploads: "1", template: "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number", hasFromPortalOption: "yes"},
                {fileName: "Operating Agreement", maxUploads: "1", template: "/FileTemplates/Operating Agreement Template.docx", hasFromPortalOption: "yes"},
                {fileName: "Bank Statements", maxUploads: "multiple", template: "", hasFromPortalOption: "yes"},
                {fileName: "Voided Check", maxUploads: "1", template: "", hasFromPortalOption: "no"},
                {fileName: "Insurance Document", maxUploads: "1", template: "", hasFromPortalOption: "yes", toolTip: "Required: Mortgagee Clause, Coverage equals loan amount"},
                {fileName: "Insurance Reciept/Invoice", maxUploads: "1", template: "", hasFromPortalOption: "yes"},
                {fileName: "W9", maxUploads: "1", template: "/FileTemplates/W9 Template.pdf", hasFromPortalOption: "yes"},
                {fileName: "Lease Verification", maxUploads: "1", template: "", hasFromPortalOption: "no", toolTip: "(if rented)"},
                {fileName: "Rent Verification", maxUploads: "1", template: "/FileTemplates/Rent Verification Template.pdf", hasFromPortalOption: "no", toolTip: "(if rented)"},
                {fileName: "Security Deposit Receipt", maxUploads: "1", template: "/FileTemplates/Security Deposit Receipt Template.docx", hasFromPortalOption: "no", toolTip: "(if rented, but do not have rent verification yet)"}
            ];

// Refinance loans require additional files. The following is a complete list of all required files.
export const refiFiles = [...allLoanFiles,
                {fileName: "Payoff", maxUploads: "multiple", template: "/FileTemplates/Payoff Template.docx", hasFromPortalOption: "no"},
                {fileName: "VOM", maxUploads: "multiple", template: "/FileTemplates/VOM Template.pdf", hasFromPortalOption: "no"},
                {fileName: "Rehab Completed", maxUploads: "1", template: "/FileTemplates/Rehab List Template.xlsx", hasFromPortalOption: "no"},
                {fileName: "ACH",  maxUploads: "1", template: "/FileTemplates/ACH Template_REFI.pdf", hasFromPortalOption: "yes"},
                {fileName: "Property Management Questionaire", maxUploads: "1", template: "/FileTemplates/Property Management Questionnaire Template.pdf", hasFromPortalOption: "no"}
            ];

// Purchase loans require different additional files. The following is a complete list of all required files.
export const purchaseFiles = [...allLoanFiles, 
                {fileName: "Purchase Contract", maxUploads: "1", template: "", hasFromPortalOption: "no"},
                {fileName: "ACH",  maxUploads: "1", template: "/FileTemplates/ACH Template_PURCH.pdf", hasFromPortalOption: "yes"},
            ];

// Fix and Flip loans require additional files to the purchase loan list. The following is a complete list of all required files.
export const fixAndFlipFiles = [...purchaseFiles, ]
            //     {fileName: "Scope of Work", maxUploads: "1", template: "https://iskamortg.privatelenderportal.com/create-scope-of-work/", hasFromPortalOption: "no"}
            // ];

