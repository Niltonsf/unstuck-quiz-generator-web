# 🧠 Unstuck Quiz Generator Frontend

Generate 10 quiz questions from any uploaded PDF file using AI.  

## 🛠️ Features
- Upload a PDF and get 10 AI-generated questions from its content
- Seamless integration between the frontend (Next.js) and backend (FastAPI)
- Scalable architecture for future improvements like authentication, saving quizzes, etc.

## 📦 Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/)
- **Queries**: [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- **State Managment**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Niltonsf/unstuck-quiz-generator-web
cd unstuck-quiz-generator-web
```

### 2. Setup

> ⚠️ **Note:** This project requires the [backend](https://github.com/Niltonsf/unstuck-quiz-generator-backend) to be running for full functionality. Make sure the backend server is up before starting the frontend.

#### 2.1 Create the Environment File (`.env`)
```
touch .env
```

#### 2.2 Follow .env.example
```
NEXT_PUBLIC_BASE_URL=
```

#### 2.3 Install packages
```
yarn
```

### 3. Run project
```
yarn dev
```

> The frontend will be available at `http://localhost:3000`.

## 📂 Project Structure
```
.
└── unstuck-quiz-generator/
    ├── └── app/
    │   ├── (public)/
    │   │   ├── (home)/
    │   │   │   └── page.tsx
    │   │   ├── quiz/
    │   │   │   └── page.tsx                  
    │   │   ├── results/
    │   │   │   └── page.tsx
    │   │   └── review/
    │   │       └── page.tsx
    │   ├── favicon.ico
    │   ├── global.css
    │   └── layout.tsx
    ├── components/
    │   ├── home/
    │   │   └── home-drag-and-drop-card.tsx
    │   ├── layout/
    │   │   ├── header.tsx
    │   │   └── loading-overlay.tsx
    │   ├── quiz/
    │   │   ├── quiz.correct-answer.tsx
    │   │   ├── quiz-header.tsx
    │   │   └── quiz-question.tsx
    │   ├── results/
    │   │   ├── results-congratulation-card.tsx
    │   │   ├── results-header.tsx
    │   │   └── results-questions.tsx
    │   ├── review/
    │   │   ├── review-add-name-dialog.tsx
    │   │   ├── review-header.tsx
    │   │   ├── review-no-questions.tsx
    │   │   ├── review-questions-skeleton.tsx
    │   │   └── review-questions.tsx
    │   └── ui/
    │       ├── questions/
    │       │   ├── question-correct-badge.tsx
    │       │   ├── question-header-question.tsx
    │       │   ├── question-header.tsx
    │       │   ├── question-options.tsx
    │       │   ├── question-review-option.tsx
    │       │   └── questions.tsx
    │       ├── score-bar/
    │       │   ├── score-bar-legend.tsx
    │       │   └── score-bar.tsx
    │       ├── alert.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── collapsible.tsx
    │       ├── dialog.tsx
    │       ├── footer-floating-action-button.tsx
    │       ├── form.tsx
    │       ├── input.tsx
    │       ├── logo-title.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── separator.tsx
    │       ├── skeleton.tsx
    │       ├── sonner.tsx
    │       ├── toast-progress.tsx
    │       ├── tooltip.tsx
    │       └── upgrade-dialog.tsx
    ├── lib/
    │   ├── axios.ts
    │   └── utils.ts
    ├── utils/
    │   ├── error-handler.ts
    │   ├── string.ts
    │   ├── time.ts
    │   └── question.ts
    ├── models/
    │   ├── answer.ts
    │   ├── option.ts
    │   └── question.ts
    ├── providers/
    │   └── query-client-provider.tsx
    ├── assets/
    │   ├── images/
    │   │   └── me.jpeg
    │   └── svg/
    │       ├── home/
    │       │   └── folder-with-pdfs.svg
    │       ├── results/
    │       │   └── party-symbols.svg
    │       ├── correct-answer.svg
    │       ├── logo.svg
    │       ├── pdf.svg
    │       └── uploading-quiz.svg
    ├── services/
    │   ├── question-service.ts
    │   └── quiz-service.ts
    └── store/
        └── use-quiz-store.ts
```

## 📌 Notes

- Make sure CORS is properly configured in the FastAPI backend to allow requests from `localhost:3000`.

## 🧪 Example Usage

1. Start the backend and frontend servers.
2. Visit `http://localhost:3000`
3. Upload your PDF.
4. Get a list of 10 quiz questions based on its content.

## 📃 License

This project is licensed under the **Nilton Schumacher F Public License**, which means:

- You can use it.
- You can break it.
- You can improve it.
- If it explodes, it's your fault.
- If it works, it's probably accidental genius.

Made with ❤️ by [Nilton Schumacher F](https://www.linkedin.com/in/nilton-schumacher-filho/). Feel free to connect!
