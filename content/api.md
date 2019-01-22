## Authentication
You access the API securely via HTTPS. For protected routes, it will be unavailable without valid authentication. A valid json web token (JWT) should be passed as a header for all protected routes.

#### Authentication Header

```javascript
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Login

Use this method to attempt to log in a user and generate a valid json web token (JWT). 
If successful, a JWT will be returned. Use this as the `x-access-token` header for all future API calls from this user.

Property | Description
---|---
`email` | `(required)` The user's e-mail.
`password` | `(required)` The user's password (sha1 encrypted).

```endpoint
POST /v1/auth/
```

#### Example body response

```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTAwMDAsImZpcnN0TmFtZSI6IkRhbiIsImxhc3ROYW1lIjoiQXJwb2lrYSIsImZ1bGxOYW1lIjoiRGFuIEFycG9pa2EiLCJlbWFpbCI6ImRhbkBlbGVnYW50c2VhZ3VsbHMuY29tIn0sImlhdCI6MTU0NzIzMDQwMywiZXhwIjoxNTQ3MjM0MDAzfQ.FZDgJpZJVImpi_DmjDn28Rhposb8YSpF10INQ5uKCbs"
}
```

## Users

### Create User

Create a user account.

Property | Description
---|---
`firstName` | `(required)` The user's first name.
`lastName` | `(required)` The user's last name.
`company` | `(optional)` The user's company.
`email` | `(required)` The user's e-mail.
`password` | `(required)` The user's password (sha1 encrypted).
`confirmPassword` | `(required)` The user's password confirmed (sha1 encrypted).
`address.streetAddress` | `(optional)` The user's street address.
`address.locality` | `(optional)` The user's locality locality/city.
`address.region` | `(optional)` The user's state or province.
`address.postalCode` | `(optional)` The user's postal code.
`address.countryName` | `(optional)` The user's country name.

```endpoint
POST /v1/api/users/
```

#### Example request body

```javascript
const user = {
	"firstName": "Jacob",
	"lastName": "Proffer",
	"company": "Elegant Seagulls Inc.",
	"email": "jacob@elegantseagulls.com",
    "password": "f862f167b85d41b225785c70d70808bc7337c1fe",
    "confirmPassword": "f862f167b85d41b225785c70d70808bc7337c1fe",
	"address": {
		"streetAddress": "100 N. 3rd St.",
		"locality": "Marquette",
		"region": "MI",
		"postalCode": "49855",
		"countryName": "United States"
	}
}
```
#### Example request

```javascript
axios.post('/api/users', user)
  .then(response => {
    console.log(response);
  })
}
```

#### Example response

```javascript
{
    "success": true,
    "userId": 14234,
    "email": "jacob@elegantseagulls.com",
    "message": "Account created."
}
```

### List Users

Lists all users. (limit to 100 users per response)

```endpoint
GET /v1/users/
```

#### Example request

```javascript
axios.get('/v1/users')
  .then(response => {
    console.log(response);
  })
}
```

### Get User

Retrieve the data for a given user.

*Note:* To retrieve user data on a different user than the currently authenticated user requires an access level of 5 or greater.
#### Example request

```javascript
axios.get('/v1/user/12345')
  .then(response => {
    console.log(response);
  })
}
```

#### Example response
```json
{
  "success": true,
  "user": {
    "id": 426,
    "vault_id": null,
    "first_name": "Jacob",
    "last_name": "Proffer",
    "email": "jacob@elegantseagulls.com",
    "company": "Elegant Seagulls",
    "streetAddress": "100 N. 3rd St.",
    "locality": "Marquette",
    "region": "MI",
    "postal_code": "49855",
    "country_name": "United States",
    "access_level": 0
  }
}
```

## W4W Projects

### Get W4W Project

```endpoint
GET /v1/projects/:projectsId
```

### List W4W Projects

Return a list of Wave for Water projects. These projects are created by administrators.

Property | Description
---|---
`page` | `(optional)` The page of results to return. Default is page 1.
`limit` | `(optional)` The number of projects to return per page. Default is 25 with a max of 100.
`category` | `(optional)` The category to limit project results too.
`query` | `(optional)` The term to search categories by. All other parameters will be respected even if set.

```endpoint
GET /v1/projects/
```

## Clean Water Corps (CWC) Projects

### Get CWC Project

```endpoint
GET /v1/cwcs/:cwcsId
```

### List CWC Projects

Return a list of Clean Water Corps (CWC) projects. These projects are created by CWC members or administrators.

Property | Description
---|---
`page` | `(optional)` The page of results to return. Default is page 1.
`limit` | `(optional)` The number of projects to return per page. Default is 25 with a max of 100.
`category` | `(optional)` The category to limit project results too.
`query` | `(optional)` The term to search categories by. All other parameters will be respected even if set.

```endpoint
GET /v1/cwcs/
```

## Courier Projects

### Get Courier Project

```endpoint
GET /v1/couriers/:couriersId
```

### List Courier Projects

Return a list of Courier projects. These projects are created by normal users.

Property | Description
---|---
`page` | `(optional)` The page of results to return. Default is page 1.
`limit` | `(optional)` The number of projects to return per page. Default is 25 with a max of 100.
`order` | `(optional)` The direction to order results by. `asc` to order by least funded and `desc` to order by most funded. If this value is not set, the projects will be ordered by most recent created.
`query` | `(optional)` The term to search categories by. All other parameters will be respected even if set.

```endpoint
GET /v1/couriers/
```

## Fundraisers

### Get Fundraiser

```endpoint
GET /v1/fundraisers/:fundraiserId
```

### List Fundraisers

Return a list of Fundraisers projects. These projects are created by normal users.

Property | Description
---|---
`page` | `(optional)` The page of results to return. Default is page 1.
`limit` | `(optional)` The number of projects to return per page. Default is 25 with a max of 100.
`order` | `(optional)` The direction to order results by. `asc` to order by least funded and `desc` to order by most funded. If this value is not set, the projects will be ordered by most recent created.
`query` | `(optional)` The term to search categories by. All other parameters will be respected even if set.

```endpoint
GET /v1/fundraisers/
```

## Braintree General

### Get Client Token

## Braintree Payment Methods

### Get Payment Methods

## Braintree Plans

A plan is a recurring billing cycle. For example: $25 / month or $50 / month indefinitely (or until canceled or deleted).
See [Braintree Recurring Billing](https://developers.braintreepayments.com/guides/recurring-billing/plans) for more details.

### Get Plan

Use this method to fetch a single plan.

Property | Description
---|---
`planId` | `(required)` The Braintree plan identifier.

```endpoint
GET /v1/braintree/plans/:planId/
```

#### Example response body
```json
{
    "id": "3kzr",
    "merchantId": "55zxbq9thtg9r24f",
    "billingDayOfMonth": null,
    "billingFrequency": 1,
    "currencyIsoCode": "USD",
    "description": "",
    "name": "Monthly $100",
    "numberOfBillingCycles": null,
    "price": "100.00",
    "trialDuration": null,
    "trialDurationUnit": null,
    "trialPeriod": false,
    "createdAt": "2019-01-07T15:53:29Z",
    "updatedAt": "2019-01-07T15:53:29Z",
    "addOns": [],
    "discounts": []
}
```

### Get Plans

List all available plans inside Braintree. 

```endpoint
GET /v1/braintree/plans/
```

#### Example response body

```json
[
    {
        "id": "3kzr",
        "merchantId": "55zxbq9thtg9r24f",
        "billingDayOfMonth": null,
        "billingFrequency": 1,
        "currencyIsoCode": "USD",
        "description": "",
        "name": "Monthly $100",
        "numberOfBillingCycles": null,
        "price": "100.00",
        "trialDuration": null,
        "trialDurationUnit": null,
        "trialPeriod": false,
        "createdAt": "2019-01-07T15:53:29Z",
        "updatedAt": "2019-01-07T15:53:29Z",
        "addOns": [],
        "discounts": []
    },
    {
        "id": "c2z6",
        "merchantId": "55zxbq9thtg9r24f",
        "billingDayOfMonth": null,
        "billingFrequency": 1,
        "currencyIsoCode": "USD",
        "description": "",
        "name": "Monthly $25",
        "numberOfBillingCycles": null,
        "price": "25.00",
        "trialDuration": null,
        "trialDurationUnit": null,
        "trialPeriod": false,
        "createdAt": "2019-01-07T15:43:22Z",
        "updatedAt": "2019-01-07T15:43:22Z",
        "addOns": [],
        "discounts": []
    }
]
```

## Braintree Subscriptions

### Get Subscription

### Get Subscriptions

## Braintree Webhooks

### Post Disbursements



```endpoint
POST /v1/braintree/subscriptionTransactions
```

### Post Subscription Transactions

```endpoint
POST /v1/braintree/disbursements/
```

## Subscriptions

### Create Subscription

