# Personal Website

A modern personal website built with React frontend and Python backend, designed to showcase my portfolio, skills, and professional experience.

## 🚀 Tech Stack

### Frontend
- **React** - Modern UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server

### Backend
- **Python** - Backend programming language
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Reliable, open-source database

### Deployment
- **GitHub Pages** - Frontend hosting
- **Railway/Vercel** - Backend hosting
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

```
personal-site/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Python backend application
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── requirements.txt
│   └── main.py
├── docs/                   # Documentation
├── README.md
└── PLANNING.md
```

## 🎯 Features

### Core Features
- [ ] **Home Page** - Introduction and overview
- [ ] **About Me** - Personal background and story
- [ ] **Portfolio** - Showcase of projects and work
- [ ] **Skills** - Technical skills and expertise
- [ ] **Experience** - Work history and achievements
- [ ] **Blog** - Articles and thoughts (optional)
- [ ] **Contact** - Contact form and information

### Technical Features
- [ ] **Responsive Design** - Mobile-first approach
- [ ] **Dark/Light Mode** - Theme switching
- [ ] **SEO Optimization** - Meta tags and structured data
- [ ] **Performance** - Fast loading and optimization
- [ ] **Accessibility** - WCAG compliance
- [ ] **Analytics** - Visitor tracking and insights

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🚀 Deployment

### Frontend (GitHub Pages)
1. Build the React app: `npm run build`
2. Deploy to GitHub Pages using GitHub Actions

### Backend (Railway/Vercel)
1. Connect repository to Railway/Vercel
2. Set environment variables
3. Deploy automatically on push to main branch

## 📝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Site**: [Coming Soon]
- **Backend API**: [Coming Soon]
- **GitHub Repository**: [Current Repository]

---

Built with ❤️ using React and Python 