# Vilo

Vilo is an all-in-one platform for developers to create LaTeX documents, build portfolios, follow learning roadmaps, apply for jobs, and use AI tools to improve their workflow and productivity.

The platform is designed to help developers learn, build, document, and get job .

<img src="https://res.cloudinary.com/dyv9kenuj/image/upload/q_auto/f_auto/v1775499144/Screenshot_from_2026-04-06_23-42-03_xfq86r.png" alt="Dashboard" width="full"/>

## live demo

https://vilo-wine.vercel.app/

## What You Can Do With Vilo

- Create and edit LaTeX documents
- Build and manage developer portfolios
- Follow structured learning roadmaps
- Apply for jobs
- Use AI to generate and improve content
- Export documents as PDF or LaTeX
  Manage projects and documents in one workspace

### Features

1. LaTeX Document Editor
2. Developer Portfolio Builder
3. Learning Roadmaps
4. Job Application System
5. AI Features

## Tech Stack

| Layer              | Technology                                       |
| :----------------- | :----------------------------------------------- |
| **Frontend**       | Next.js, Tailwind CSS, Monaco Editor, React Flow |
| **Backend**        | Next.js API Routes, Prisma ORM, PostgreSQL       |
| **AI Integration** | Vercel AI SDK, Google AI                         |
| **Icons & Style**  | Lucide Icons, KaTeX                              |
| **Validation**     | Zod, TypeScript                                  |

---

## Preview

---

## Getting Started

Follow these steps to set up Vilo locally:

### 1. Clone the repo

```bash
git clone [https://github.com/your-username/vilo.git]

cd vilo
```

Install dependencies

```
bun install
```

## Environment Variables

#### Create a .env file in the root directory and add the following:

```
Code snippet
DATABASE_URL="your-postgresql-url"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
OPENAI_API_KEY="your-openai-key"

```

## Run the app

```


# Development mode
npm run dev
```

## Build and Start

```
bun run build
```

## Contributing

Contributions are welcome. Fork the repository, clone it locally, create a new branch, make your changes, and submit a pull request. Please ensure your code follows the project structure and coding style.

## Show your support

Give a ⭐️ if this project helped you!

## License

Distributed under the MIT License.
