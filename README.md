# 🧑‍💻 Portfolio

This is my personal portfolio site built with Astro.
It showcases my work as a backend engineer and documents what I’ve learned throughout my development journey.

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

``` .env
PUBLIC_GITHUB_USER_URL=https://github.com/your-username
PUBLIC_ZENN_USER_URL=https://zenn.dev/your-username
```

- Install dependencies

```bash
pnpm install
```

- Start the dev server

```
pnpm run dev
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
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
