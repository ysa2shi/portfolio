[日本語READMEはこちら](./README-ja.md)

# 🧑‍💻 Portfolio

This is my personal portfolio site built with Astro. This is my portfolio recording my development learnings.

The site also features my latest articles from Zenn, and is automatically updated using GitHub Actions.

## 🔧 Tech Stack

- Astro – Static site generator
- TypeScript
- Tailwind CSS – Utility-first CSS framework
- GitHub Actions – Automates daily build & deploy
- Cloudflare Pages – Deployment platform

## Setup

- Clone this repository

```bash
git clone https://github.com/ysa2shi/portfolio.git
cd portfolio
```

- Create .env file from .env.example

```bash
cp .env.example .env
```

- Replace the placeholders ({your-username}) with your actual usernames.

```env
PUBLIC_GITHUB_USER_URL=https://github.com/your-username
PUBLIC_ZENN_USER_URL=https://zenn.dev/your-username
```

- Install dependencies

```bash
pnpm install
```

- Start the dev server

```bash
pnpm run dev
```

## 🚀 Project Structure

```
/
├── config/
├── public/
├── src/
│   └── pages/
│   |   └── index.astro
│   └── types/
│       └── index.d.ts
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 🏗️ Architecture Overview

- Static site generation (SSG) with Astro for fast page loads
- Automatic routing for .astro files under `src/pages/`
- UI is modularized in `src/components/` for reusability
- Latest Zenn articles are fetched via `src/utils/fetchZennFeed.ts` and displayed on the top page
- Site settings and constants are managed in the `config/` directory
- Static assets (images, icons, etc.) are placed under `public/`

## 🚢 Deployment

This project is recommended to be deployed on Cloudflare Pages.

1. Create a new project in Cloudflare Pages dashboard
2. Connect your GitHub repository
3. Build command:

   ```sh
   pnpm install && pnpm build
   ```

4. Output directory:

   ```
   dist
   ```

5. Set environment variables as needed (see .env)

## 📬 Contact

For questions or inquiries, please use [GitHub Issues](https://github.com/ysa2shi/portfolio/issues) or contact the [author on GitHub](https://github.com/ysa2shi).

[日本語READMEはこちら](./README.ja.md)
