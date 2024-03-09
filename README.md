# Neon's Serverless Postgres with PostgreSQL Anonymizer

A live demo of this application with "production" data is available at [the production URL](https://neon-pg-anon-example-xi.vercel.app/).

A preview environment with anonymized (masked), data can be viewed by visiting
a link added by GitHub Actions in Pull Request comments, e.g [this PR comment](https://github.com/evanshortiss/neon-pg-anon-example/pull/2).

## Usage

If you'd like to use this example yourself, you'll need to:

1. [Sign-up for Neon](https://neon.tech/github) to access your free Postgres database.
1. Fork this repository and set some secrets for GitHub Actions.
1. Creaet a project in your Vercel account that uses your fork of this repository.

These steps are explained in detail provied below.

### Postgres Database Setup on Neon

1. Login, and create a project on [Neon](https://neon.tech/github) to obtain a Postgres database.
1. Follow the instructions in Neon's documentation to [import the Employees database](https://neon.tech/docs/import/import-sample-data#employees-database).
1. Create a Neon database branch named `anonymized-main`, then run the commands in *anonymized.sql* against that branch.

### GitHub Action Setup

1. Fork this repository to your own GitHub account.
1. Create the following secrets in your forks repository settings for GitHub Actions:
    * `NEON_API_KEY` - Found in the [account settings screen](https://console.neon.tech/app/settings/api-keys) in the Neon Console.
    * `NEON_PROJECT_ID` - Can be found in the **Project settings** screen in the Neon Console.
    * `VERCEL_TOKEN` - Create a token on the [Vercel Accounts Settings](https://vercel.com/account/tokens) screen.

### Vercel Setup

1. Create a Vercel project by importing your forked version of this repository in your Vercel account.
1. Go to *Settings > Environment Variables* in your Vercel project and create a `DATABASE_URL` variable that points to your employees database on Neon, e.g `postgresql://username:s3c3rpa55wrd@ep-adj-noun-12345.us-east-1.aws.neon.tech/employees?sslmode=require`. Make sure that this variable is set to appy only in the Production environment.
1. In your Vercel project, go to *Settings > Git > Ignored Build Step* and set it to `Don't build anything`. The reason for this is that you'll use GitHub 
Actions to trigger the build.

That's it. Now each pull request you open against your fork of this repository will use GitHub Actions to create a preview database branch that contains anonymized data, and will deploy a Vercel preview environment that uses that anonymized preview branch.
