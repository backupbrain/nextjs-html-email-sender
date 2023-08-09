# Send HTML email test

This project exists to test sending HTML emails.

It is intended to be used for email template developers to send HTML emails to an address to quickly test the rendering of the html email.

Typically sending HTML emails is a tedious process, so creating an easy way to send new template designs for testing should exist.

# Set-up

Copy the `.env.example` to `.env`:

```console
cp .env.example .env
```

Configure the `.env` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
GMAIL_USERNAME=email@example.com
GMAIL_PASSWORD=abc123
GMAIL_CLIENT_ID=oauth_clientid
GMAIL_CLIENT_SECRET=oauth_client_secret
GMAIL_OAUTH_REFRESH_TOKEN=oauth_refresh_token
```

Install dependencies

```console
npm install
```

## Run

Run the website. This will create a website at [localhost:3000](http://localhost:3000)

```console
npm run dev
```


