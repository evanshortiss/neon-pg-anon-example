# Neon's Serverless Postgres with PostgreSQL Anonymizer

## Deployment Setup

Create the following secrets in the repository settings:

* `NEON_API_KEY` - Refer to the [Neon documentation](https://neon.tech/docs/manage/api-keys) to find this.
* `NEON_PROJECT_ID` - Can be found in your Neon **Project settings** screen.
* `VERCEL_TOKEN` - Create a token on the [Vercel Accounts Settings](https://vercel.com/account/tokens) screen.

In your Vercel project, go to *Settings > Git > Ignored Build Step* and set it
to `Don't build anything`. The reason for this is that you'll use GitHub
Actions to trigger the build.
