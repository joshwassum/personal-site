import React, { useState } from 'react';
import { ExternalLink, Github, Code, Database, Brain } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
}

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const projects: Project[] = [
    {
      id: '1',
      title: 'MTGA AI Assistant',
      description: 'AI-powered Magic: The Gathering Arena companion app and website that provides personalized collection management advice with a focus on individuality and anti-netdecking strategies.',
      image: '', // removed
      technologies: ['Python', 'React', 'Vite', 'AI Integration', 'TypeScript'],
      category: 'ai',
      status: 'in-progress',
      featured: true
      // githubUrl: '',
      // liveUrl: '',
    },
    {
      id: '2',
      title: 'Web Crawler - Accessibility Analysis',
      description: 'Custom Python-based web crawler that parses websites to identify accessible and inaccessible pages, with configurable depth and traversal options for comprehensive accessibility analysis.',
      image: '', // removed
      technologies: ['Python', 'Web Scraping', 'Accessibility', 'Data Analysis'],
      category: 'backend',
      status: 'completed',
      featured: true
      // githubUrl: '',
      // liveUrl: '',
    },
    {
      id: '3',
      title: 'XML to JSON Converter',
      description: 'Python utility tool designed to facilitate specific data conversion needs between XML and JSON formats, streamlining data transformation workflows.',
      image: '', // removed
      technologies: ['Python', 'Data Transformation', 'XML', 'JSON'],
      category: 'backend',
      status: 'completed',
      featured: false
      // githubUrl: '',
      // liveUrl: '',
    },
    {
      id: '4',
      title: 'Personal Website',
      description: 'Modern portfolio website built with React, TypeScript, and FastAPI, featuring admin authentication, blog management, and AI-augmented development practices.',
      image: '', // removed
      technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'Tailwind CSS'],
      category: 'frontend',
      status: 'completed',
      featured: true,
      githubUrl: 'https://github.com/joshwassum/personal-site',
      // liveUrl: '',
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: Code },
    { id: 'frontend', name: 'Frontend', icon: Code },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'ai', name: 'AI & ML', icon: Brain },
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'completed', name: 'Completed' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'planned', name: 'Planned' },
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main" id="main-content">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          Project <span className="text-primary-600 dark:text-primary-400">Portfolio</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          A showcase of my personal projects, from AI-powered applications to data processing tools, 
          demonstrating my passion for innovation and problem-solving.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-6" aria-label="Project category filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              aria-pressed={selectedCategory === category.id}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              <category.icon size={20} aria-hidden="true" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4" aria-label="Project status filters">
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              aria-pressed={selectedStatus === status.id}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedStatus === status.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              {status.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      {filteredProjects.filter(p => p.featured).length > 0 && (
        <section className="mb-16" aria-labelledby="featured-projects-heading">
          <h2 id="featured-projects-heading" className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects
              .filter(project => project.featured)
              .map((project) => (
                <article key={project.id} className="card group hover:shadow-xl transition-shadow duration-300" aria-labelledby={`project-title-${project.id}`}> 
                  
                  <h3 id={`project-title-${project.id}`} className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github size={20} aria-hidden="true" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink size={20} aria-hidden="true" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section aria-labelledby="all-projects-heading">
        <h2 id="all-projects-heading" className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
          All Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article key={project.id} className="card group hover:shadow-lg transition-shadow duration-300" aria-labelledby={`project-title-${project.id}`}> 
              
              <h3 id={`project-title-${project.id}`} className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                {project.title}
              </h3>
              
              <p className="text-secondary-600 dark:text-secondary-400 mb-4 text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs rounded-full">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github size={16} aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Project Stats */}
      <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8" aria-live="polite">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
          Project Statistics
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {projects.length}
            </div>
            <div className="text-secondary-700 dark:text-secondary-300">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-secondary-700 dark:text-secondary-300">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-secondary-700 dark:text-secondary-300">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-secondary-700 dark:text-secondary-300">Featured</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 