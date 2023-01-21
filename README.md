
## Table of Contents
- [Response Format](#response-format)
- [Response Code](#response-codes)
- [Headers](#headers)
- [Endpoints](#endpoints)
    1. [Get Ticket](#get-ticket)
    2. [Verify PayPal Payment](#verify-paypal-payment)
    3. [Login to Watch](#login-to-watch)
    4. [Verify Login](#verify-login)
    5. [Initiate Stripe Payment](#initiate-stripe-payment)
    6. [Admin Login](#admin-login)
    7. [Admin Dashboard Stats](#get-admin-dashboard-stat)
    8. [Admin Get Users](#get-users)
    9. [Admin Get Transactions](#get-transactions)
    10. [Generate Ticket](#generate-ticket)
    11. [Change Password](#change-password)
    12. [Logout](#logout)
- [License](#license)

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

- `Accept` set to `application/json`
- `Authorization` set to `Bearer {TOKEN}` where required

## Endpoints

URL: `https://api.sparklesintherufflesmovie.com` \
Suffix: `/v0/`


### Get Ticket

This is used to initiate get ticket

- Endpoint: `{URL}+{Suffix}+'/get-ticket'`
- Method: `POST`
- Body

                {
                    'name' => 'required',
                    'email' => 'required',
                    'country' => 'required'
                }

- Successful Response for Nigeria

                {
                    "success": true,
                    "data": {
                        "orderID": "MDN48901655734130",
                        "amount": 2000
                    },
                    "message": "Data Initiated successfully"
                }

- Successful Response for Outside Nigeria

                {
                    "success": true,
                    "data": {
                        "amount": 10
                    },
                    "message": "Data Initiated successfully"
                }

### Verify PayPal Payment

This is used to verify and activate PayPal Payment

- Endpoint: `{URL}+{Suffix}+'/verify-paypal-payment'`
- Method: `POST`
- Body

                {
                    'paymentId' => 'required',
                    'email' => 'required'
                }

- Failed Response

                {
                    "success": false,
                    "message": "The payment verification failed. We have emailed you the reason"
                }

- Successful Response

                {
                    "success": true,
                    "data": {},
                    "message": "Your Ticket has been sent to your email successfully"
                }

### Login to Watch

This is used to validate ticket code \n

- Endpoint: `{URL}+{Suffix}+'/login'`
- Method: `POST`
- Body

                {
                    'email' => 'required'
                    'ticket' => 'required',
                }

- Failed Response

                {
                    "success": false,
                    "message": "The email or ticket does not exist"
                }

- Successful Response

                {
                    "success": true,
                    "data": {
                        "token": "1|xkeicNMEJVaeO6Z7mv2u7drJncof385ylxalEXMZ"
                    },
                    "message": "Logged in successfully"
                }

### Verify Login

This is used to validate login

- Endpoint: `{URL}+{Suffix}+'/user'`
- Method: `GET`
- Header: `Authorization`: `Bearer {token}`

- Failed Response

                {
                    unauthenticated
                }

- Successful Response

                {
                    "success": false,
                    "data": {
                        "url": "https://youtube.com/332323"
                    }
                }

### Initiate Stripe Payment

This is used to initiate stripe payment

- Endpoint: `{URL}+{Suffix}+'/stripe-payment'`
- Method: `POST`
- Body: 

                {
                    email: "nacojohn@gmail.com"
                }

- Successful Response: A redirect to Stripe payment

### Admin Login

This is used to validate ticket code \n

- Endpoint: `{URL}+{Suffix}+'/admin-login'`
- Method: `POST`
- Body

                {
                    'email' => 'required'
                    'password' => 'required',
                }

- Failed Response

                {
                    "success": false,
                    "message": "The email or password is invalid"
                }

- Successful Response

                {
                    "success": true,
                    "data": {
                        "token": "2|25LKwhDaBxXwhz5ZUwCNFveghBzXW0KCsWSsldsS"
                    },
                    "message": "Logged in successfully"
                }

### Get Admin Dashboard Stat

This is used to fetch admin dashobard

- Endpoint: `{URL}+{Suffix}+'/dashboard'`
- Method: `GET`
- Header: `Authorization`: `Bearer {token}`

- Failed Response

                {
                    unauthenticated
                }

- Successful Response

                {
                    "success": true,
                    "data": {
                        "users": 2,
                        "total_transactions": 2,
                        "successful_transactions": 2,
                        "pending_transactions": 0,
                        "total_naira": "1,000.00",
                        "total_usd": "10.00"
                    },
                    "message": "Stat retrieved"
                }

### Get Users

This is used to fetch all users

- Endpoint: `{URL}+{Suffix}+'/users'`
- Method: `GET`
- Header: `Authorization`: `Bearer {token}`
- Optional Queries: `&country=Nigeria`

- Failed Response

                {
                    unauthenticated
                }

- Successful Response

                {
                    "data": [
                        {
                            "name": "Nnanna John",
                            "email": "nacojohn@gmail.com",
                            "country": "Nigeria",
                            "date_created": null
                        },
                        {
                            "name": "Nnanna John 2",
                            "email": "nacojohn2@gmail.com",
                            "country": "Nigeria",
                            "date_created": null
                        }
                    ],
                    "links": {
                        "first": "http://127.0.0.1:8000/v0/users?page=1",
                        "last": null,
                        "prev": null,
                        "next": null
                    },
                    "meta": {
                        "current_page": 1,
                        "from": 1,
                        "path": "http://127.0.0.1:8000/v0/users",
                        "per_page": 30,
                        "to": 2
                    }
                }

    **Note:** If `next_page_url` is not null, enable the Next Button to make request to next page else make it disabled; same with `prev_page_url`

### Get Transactions

This is used to fetch all transactions

- Endpoint: `{URL}+{Suffix}+'/transactions'`
- Method: `GET`
- Header: `Authorization`: `Bearer {token}`
- Optional Queries: `&status=paid`

- Failed Response

                {
                    unauthenticated
                }

- Successful Response

                {
                    "data": [
                        {
                            "orderId": "0LU087967W9604130",
                            "ticket_code": "T0NPFv",
                            "currency": "USD",
                            "amount": "10.00",
                            "status": "Paid",
                            "date_created": "4 days ago",
                            "user": {
                                "name": "Nnanna John",
                                "email": "nacojohn@gmail.com"
                            }
                        }
                    ],
                    "links": {
                        "first": "http://127.0.0.1:8000/v0/transactions?page=1",
                        "last": null,
                        "prev": null,
                        "next": "http://127.0.0.1:8000/v0/transactions?page=2"
                    },
                    "meta": {
                        "current_page": 1,
                        "from": 1,
                        "path": "http://127.0.0.1:8000/v0/transactions",
                        "per_page": 1,
                        "to": 1
                    }
                }

    **Note:** If `next_page_url` is not null, enable the Next Button to make request to next page else make it disabled; same with `prev_page_url`

### Generate Ticket

This is used to initiate get ticket

- Endpoint: `{URL}+{Suffix}+'/generate-ticket'`
- Method: `POST`
- Header: `Authorization`: `Bearer {token}`
- Body

                {
                    'name' => 'required',
                    'email' => 'required',
                }

- Successful Response

                {
                    "success": true,
                    "data": {
                        "email": "nacojohn@gmail.com",
                        "ticket": "qFb50W"
                    },
                    "message": "Ticket generated and emailed to receipient successfully"
                }

### Change Password

This is used to initiate get ticket

- Endpoint: `{URL}+{Suffix}+'/change-password'`
- Method: `POST`
- Header: `Authorization`: `Bearer {token}`
- Body

                {
                    'current_password' => 'required',
                    'new_password' => 'required',
                    'confirm_password' => 'required',
                }

- Successful Response

                {
                    "success": true,
                    "data": "",
                    "message": "Password changed successfully"
                }

    **Note:** On successful change, redirect the user to admin login page

### Logout

This is used to logout before clearing token on your local storage

- Endpoint: `{URL}+{Suffix}+'/logout'`
- Method: `GET`
- Header: `Authorization`: `Bearer {token}`

**Note:** Clear your local token and redirect to login page on successful request


## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).