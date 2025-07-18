# Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- Git

### Initial Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd personal-site

# Install all dependencies
npm run setup
```

### Development Workflow

#### Start Both Frontend and Backend
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

#### Start Frontend Only
```bash
npm run dev:frontend
```

#### Start Backend Only
```bash
npm run dev:backend
```

## 📁 Project Structure

```
personal-site/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript types
│   └── package.json
├── backend/                 # Python backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── requirements.txt
│   └── main.py
└── docs/                   # Documentation
```

## 🛠️ Development Commands

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Commands
```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start development server
python main.py

# Run tests
pytest
```

## 🎨 Styling Guidelines

### Tailwind CSS
- Use Tailwind utility classes for styling
- Custom components are defined in `src/index.css`
- Color scheme follows the design system in `PLANNING.md`

### Component Structure
```tsx
import React from 'react';

interface ComponentProps {
  // Define props here
}

const Component: React.FC<ComponentProps> = ({ /* props */ }) => {
  return (
    <div className="component-classes">
      {/* Component content */}
    </div>
  );
};

export default Component;
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```bash
cp backend/env.example backend/.env
```

Update the values in `.env` as needed.

### Frontend Configuration
- Tailwind config: `frontend/tailwind.config.js`
- Vite config: `frontend/vite.config.ts`
- TypeScript config: `frontend/tsconfig.json`

## 📝 Git Workflow

### Branch Naming
- `phase-1-foundation` - Foundation setup
- `phase-2-pages` - Core pages development
- `phase-3-features` - Advanced features
- `phase-4-deployment` - Testing and deployment

### Commit Messages
Use conventional commit format:
```
type(scope): description

Examples:
feat(frontend): add dark mode toggle
fix(backend): resolve CORS issue
docs: update README with setup instructions
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
source venv/bin/activate
pytest
```

## 🚀 Deployment

### Frontend (GitHub Pages)
1. Build the project: `npm run build`
2. Deploy using GitHub Actions

### Backend (Railway/Vercel)
1. Connect repository to deployment platform
2. Set environment variables
3. Deploy automatically on push to main

## 📚 Resources

- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For questions or issues:
- Check the documentation
- Review the planning document
- Create an issue in the repository 