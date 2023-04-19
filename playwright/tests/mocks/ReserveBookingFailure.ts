export const reservebookingfailure = {
    body: `
    {
        "BookingNumber": null,
        "ExternalTransactionId": null,
        "TransactionResultInformationMessage": null,
        "TransactionResultExceptionMessage": null,
        "TransactionResultStatusIsOK": false,
        "TransactionResultOutputDictionary": {
            "CreateGroupBooking": null,
            "CreateBooking": null,
            "CreateMembership": [
                {
                    "MemberNumber": 0,
                    "MemberGuid": "e644e127-d991-40b2-8059-4b9a19926ce4",
                    "ProviderGroupReference": 0,
                    "Email": null
                },
                {
                    "MemberNumber": 0,
                    "MemberGuid": "7b428b2b-3167-4ab7-a601-8a43b7aaa9eb",
                    "ProviderGroupReference": 0,
                    "Email": null
                }
            ]
        }
    }
`
}