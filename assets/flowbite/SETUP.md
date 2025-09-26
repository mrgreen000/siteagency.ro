# FlowBite - Application UI code

## Getting started

Make sure that you have locally installed the following frameworks and runtime environments:
- [Node](https://nodejs.org/en/download/releases/) (>= 12.3.0) and npm
- [Hugo](https://gohugo.io/getting-started/quick-start/)
- [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)

After you've installed the mandatory tools, the next step would be to open a terminal and run the command below in order to install project's dependencies:

```
npm install
```

## Setting up the development environment

Run `npm start` - command that will start a [hugo webserver](https://gohugo.io/commands/hugo_server/) together with a webpack bundler, tools that are continuously watching your file for changes and serve them in the browser at http://localhost:1313.

## Building for production

There are two ways to generate your production files:
- **encrypted files**: if you want all the css class names used in your html files to be encrypted and your javascript code to be obfuscated,  you have to run `npm run encrypt:build`;
- **normal files**: if you just want to generate the production files, you have to run `npm run build`.

For both cases, after the script terminates, your production files will be placed within `.build` folder, at the root of the project.

## Deployment

For the time being, the `.build` folder resulted in the [build process](#building-for-production), will be published in a cloudflare worker. For this, run the commands below:
- **Note** run this command only if this is your first time trying to publish the project: `wrangler login`
- Next run: `npm run deploy`
- Finally, to check if the project was deployed successfully go to https://flowbite.com/application-ui/demo/ and look for the latest changes.

In order to re-configure or update the cloudflare worker please check [their documentation](https://developers.cloudflare.com/workers/get-started/guide).

## Releasing for download

Run the following command to generate the final zip file that will be uploaded:

```
npm run release -- --version=x.x.x
```

Note: the version is an optional parameter and this can be used for all the other data and key pairs for the `package.json` from the final zip.

## Deployment to AWS

Find the CloudFront URL by going to AWS Amplify -> Rewrites and Redirects and find the S3 bucket (currently https://d1cn3duxb6oqjn.cloudfront.net) on S3.

Find the directories (ie. marketing-ui/ or application-ui) and upload the contents of the .build folder to the corresponding directory.

Then in the AWS Amplify Rewrites and Redirects and the corresponding URL rewrites based on the source files.

## Deployment via AWS/Flowbite.com-next.js

The easiest way to do this is by running `npm run encrypt:build` and upload the contents of the `.build/` folder inside the `public/` folder of the `flowbite.com-nextjs` project.

Then set up the redirect and rewrites in the Next.js project and or AWS Amplify Rewrites and Redirects.