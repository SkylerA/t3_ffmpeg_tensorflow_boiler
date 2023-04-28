This is some initial experimentation with getting client side video parsing and inference going in the browser, these are minimal steps to get to a dev environment, but a better approach should be explored for production.

# FFMPeg Initial Setup Steps
- `npm install @ffmpeg/ffmpeg @ffmpeg/core`
- Enable SharedBuffer via Cors Headers. See headers addition to next.config.mjs

# Tensorflow Initial Setup Steps
(This was written while working on a mobilenetv3 model that was trained in keras)
- `npm install @tensorflow/tfjs @tensorflow/tfjs-converter @tensorflow/tfjs-backend-webgl`
- convert the model

  ```
  tensorflowjs_converter `
  --input_format=tf_saved_model `
  --output_format=tfjs_graph_model `
  ./path/to/your/model/folder `
  ./path/to/output/folder
  ```

- `cp -r /path/to/converted/model public/` (This is only for local dev)



# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
