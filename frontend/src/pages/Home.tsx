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
          Software Engineering Lead with 5+ years of experience in full-stack development, database management, and AI-augmented solutions. I thrive on solving complex problems and leading technical initiatives that drive real impact.
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

      {/* Core Strengths Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <Code size={40} className="mx-auto mb-2 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-semibold mb-2">Problem Solver</h3>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm">
            I excel at tackling new challenges, learning new technologies, and delivering solutions that work—no matter the complexity.
          </p>
        </div>
        <div className="card text-center">
          <Database size={40} className="mx-auto mb-2 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-semibold mb-2">Database & DevOps Expert</h3>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm">
            Managed 50M+ row MySQL databases, led DevOps initiatives, and hold a Liquibase certification for database deployment.
          </p>
        </div>
        <div className="card text-center">
          <Globe size={40} className="mx-auto mb-2 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-semibold mb-2">AI-Augmented Development</h3>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm">
            Passionate about leveraging AI to enhance human creativity and productivity, with hands-on experience in AI integration.
          </p>
        </div>
      </div>

      {/* Career Highlights Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">5+</div>
          <div className="text-secondary-700 dark:text-secondary-300">Years of Experience</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">50M+</div>
          <div className="text-secondary-700 dark:text-secondary-300">Database Rows Managed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">3</div>
          <div className="text-secondary-700 dark:text-secondary-300">Major Projects Led</div>
        </div>
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