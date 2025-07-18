import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Code, Database, Globe, Smartphone, Palette } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'fullstack',
      githubUrl: 'https://github.com/yourusername/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
      category: 'frontend',
      githubUrl: 'https://github.com/yourusername/task-app',
      liveUrl: 'https://task-app-demo.com',
      featured: true,
    },
    {
      id: 3,
      title: 'API Gateway Service',
      description: 'A microservices API gateway built with Python and FastAPI, handling authentication, rate limiting, and request routing.',
      image: '/api/placeholder/400/300',
      technologies: ['Python', 'FastAPI', 'Redis', 'Docker'],
      category: 'backend',
      githubUrl: 'https://github.com/yourusername/api-gateway',
      liveUrl: 'https://api-gateway-docs.com',
      featured: false,
    },
    {
      id: 4,
      title: 'Mobile Fitness App',
      description: 'A React Native fitness tracking app with workout plans, progress tracking, and social features.',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
      category: 'mobile',
      githubUrl: 'https://github.com/yourusername/fitness-app',
      liveUrl: 'https://fitness-app-demo.com',
      featured: false,
    },
    {
      id: 5,
      title: 'Design System Library',
      description: 'A comprehensive design system built with React and Storybook, featuring reusable components and design tokens.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Storybook', 'TypeScript', 'Styled Components'],
      category: 'frontend',
      githubUrl: 'https://github.com/yourusername/design-system',
      liveUrl: 'https://design-system-docs.com',
      featured: false,
    },
    {
      id: 6,
      title: 'Data Analytics Dashboard',
      description: 'A real-time analytics dashboard with interactive charts, data visualization, and export capabilities.',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
      category: 'fullstack',
      githubUrl: 'https://github.com/yourusername/analytics-dashboard',
      liveUrl: 'https://analytics-demo.com',
      featured: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: Filter },
    { id: 'fullstack', name: 'Full Stack', icon: Code },
    { id: 'frontend', name: 'Frontend', icon: Palette },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          My <span className="text-primary-600 dark:text-primary-400">Portfolio</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          A collection of projects that showcase my skills in full-stack development,
          from concept to deployment.
        </p>
      </div>

      {/* Featured Projects */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
          Featured Projects
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="card group hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                  <Globe size={64} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-secondary-900 p-3 rounded-full hover:bg-primary-100 transition-colors duration-200"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-secondary-900 p-3 rounded-full hover:bg-primary-100 transition-colors duration-200"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
                {project.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Categories */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              <category.icon size={20} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* All Projects Grid */}
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
          All Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card group hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="w-full h-40 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                  <Globe size={48} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-secondary-900 p-2 rounded-full hover:bg-primary-100 transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-secondary-900 p-2 rounded-full hover:bg-primary-100 transition-colors duration-200"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                {project.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-3 text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 