<p align="center">
  <a href="https://www.webriq.com">
    <img src="https://cdn.sanity.io/images/9itgab5x/production/140d0c9644c0aa1a5dbc817b18e9d3f8d18b43ea-125x124.png" alt="WebriQ logo" />
  </a>
  <h1 align="center">Discover StackShift</h1>
</p>

> StackShift is a composable content and commerce solution GLUED together to a single workflow and publishing tool.

## Getting Started

StackShift integrates this [Next.js](https://nextjs.org/) with [Sanity studio](https://www.sanity.io/). To work on a local environment, clone and setup this repository and run on development server:

```bash
yarn dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio) to start adding content and [http://localhost:3000](http://localhost:3000) to preview pages for your website.

## Learn More

Here are some helpful resources to know more about the StackShift experience:

- [Why StackShift](https://www.webriq.com/stackshift)
- [Composable Content and Commerce Out of the Box](https://www.webriq.com/composable-content-and-commerce-out-of-the-box)
- [StackShift User Experience](https://www.canva.com/design/DAFGKQdB-2U/IBvFqNYXNz-x1eNCSrSXOQ/view?utm_content=DAFGKQdB-2U&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Connecting newsletter signups to PublishForge

If this site is linked to a [PublishForge](https://www.publishforge.cloud) project, `newsletter`
form submissions can also be added as subscribers in that project's **Newsletter**
(alongside the normal webriq-forms submission). The link is **optional** — sites without
a PublishForge simply skip this setup.

This uses the form's built-in **Webhook Settings** (no code, no env change on the site):

1. In Sanity Studio, open the `newsletter` section's form → **Webhook Settings**.
2. Add the PublishForge ingest URL:

   ```
   https://<your-publishforge-domain>/api/newsletter/webhook
   ```

3. In the PublishForge deployment, add the newsletter form's id to
   `NEWSLETTER_WEBHOOK_FORM_IDS` (comma-separated allowlist).

On submission, the webriq-forms backend POSTs the payload to that URL **after**
reCAPTCHA passes; PublishForge creates an active subscriber tagged
`source: stackshift`. The webhook is fire-and-forget — if the endpoint is
unconfigured or unavailable, the form still submits and redirects exactly as usual.

## Get in touch with us

Let’s work together on your digital experience project. Check out the [WebriQ](https://www.webriq.com/contact-us) website for more details.
