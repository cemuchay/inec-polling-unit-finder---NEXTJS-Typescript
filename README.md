## Table of Contents

- [Table of Contents](#table-of-contents)
- [Response Format](#response-format)
- [Response Codes](#response-codes)
- [Headers](#headers)
- [Endpoints](#endpoints)
  - [Get Dates](#get-dates)
  - [Fetch states](#fetch-states)

## Response Format

For every successful request with a 200 or 201 response code, the response is formatted like this:

                {
                    "success": true (boolean),
                    "data": (null or an object),
                    "message": (string)
                }

For every failed request, the response is formatted like this:

                {
                    "success": false (boolean),
                    "message": (string),
                    "data": (null or an object)
                }

## Response Codes

200 - OK \
429 - Too much request, try again after 30 secs \
401 - Unauthorized \
422 - Unprocessed request due to invalid data

## Headers

-  `Accept` set to `application/json`

## Endpoints

URL: `https://inec-polling-unit-finder.vercel.app/api`

### Get Dates

This is used to get election dates

-  Endpoint: `{URL}+'/info/dates'`
-  Method: `Method: GET`

-  Successful Response

                {
                    "data": {
                    "countDownDate": 1677308400000,
                    "currentDate": 1674902214069,
                    "presidentialDate": "Feb 25, 2023 8:00:00",
                    "governorshipDate": "Mar 11, 2023 8:00:00"
                    },
                    "success": true,
                    "message": "Dates Successfully Fetched"
                }

-  Failed Response

                 {
                     "success": true,
                     "message": "Dates Could not be Fetched, Please try Again"
                 }

### Fetch states

This is used to get all states

-  Endpoint: `{URL}+'/states'`
-  Method: `Method: GET`

-  Successful Response

                {
                    "data": [// add states here],
                    "success": true,
                    "message": "States Successfully Fetched"
                }

-  Failed Response

                 {
                     "success": true,
                     "message": "States Could not be Fetched, Please try Again"
                 }

