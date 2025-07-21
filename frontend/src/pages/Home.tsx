import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Globe } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

const Home: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Modern React applications with TypeScript and responsive design.',
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Robust Python APIs with FastAPI and database management.',
    },
    {
      icon: Globe,
      title: 'Full-Stack Solutions',
      description: 'End-to-end web applications from concept to deployment.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          Hi, I'm{' '}
          <span className="text-primary-600 dark:text-primary-400">Josh Wassum</span>
        </h1>
        <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-3xl mx-auto">
          Full-Stack Developer passionate about creating modern, scalable web applications
          with React and Python.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SectionWrapper sectionName="portfolio">
            <Link
              to="/portfolio"
              className="btn-primary inline-flex items-center justify-center"
            >
              View My Work
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </SectionWrapper>
          <SectionWrapper sectionName="contact">
            <Link
              to="/contact"
              className="btn-secondary inline-flex items-center justify-center"
            >
              Get In Touch
            </Link>
          </SectionWrapper>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="card text-center">
            <div className="flex justify-center mb-4">
              <feature.icon size={48} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
              {feature.title}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <SectionWrapper sectionName="contact">
        <div className="text-center bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Ready to work together?
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6 max-w-2xl mx-auto">
            Let's discuss your project and see how I can help bring your ideas to life.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center justify-center"
          >
            Start a Project
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Home; 