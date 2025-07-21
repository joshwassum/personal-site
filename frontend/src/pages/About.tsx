import React from 'react';
import { GraduationCap, Award, Heart, Code, Database, Brain, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Photo */}
      <div className="flex justify-center mb-8">
        <img
          src="/profile.jpeg"
          alt="Josh Wassum before a half marathon"
          className="w-40 h-40 rounded-full object-cover border-4 border-primary-600 dark:border-primary-400 shadow-lg"
        />
      </div>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          About <span className="text-primary-600 dark:text-primary-400">Me</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          Software Engineering Lead passionate about AI-augmented development, database optimization, 
          and creating innovative solutions that bridge technology and human potential.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Personal Story */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
              My Story
            </h2>
            <div className="space-y-6 text-secondary-700 dark:text-secondary-300">
              <p>
                I'm a Software Engineering Lead at Linear B Systems with over 5 years of experience in 
                full-stack development, database management, and DevOps operations. My journey in 
                technology has been driven by a passion for solving complex problems and creating 
                efficient, scalable solutions.
              </p>
              <p>
                <strong>My greatest strength is my ability to solve any problem I am presented with, given enough time. I have no fear of learning new technologies and skills, and I thrive on tackling new challenges head-on.</strong>
              </p>
              <p>
                Currently, I manage a MySQL database with over 50 million unique rows, optimize search 
                capabilities, and lead technical initiatives that impact enterprise-level systems. 
                My expertise spans from database administration to AI integration, with a particular 
                focus on how artificial intelligence can augment human development capabilities.
              </p>
              <p>
                I believe in the power of AI as a tool to enhance human creativity and productivity, 
                not replace it. This philosophy drives my work on personal projects like the MTGA AI 
                Assistant, where I explore how AI can provide personalized insights while maintaining 
                individual decision-making and strategy.
              </p>
              <p>
                My goal is to transition into system architecture, where I can design and implement 
                solutions that leverage the best of both human expertise and AI capabilities, creating 
                systems that are not only technically excellent but also enhance the human experience.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="space-y-6">
          {/* Education */}
          <div className="card">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center">
              <GraduationCap className="mr-2" />
              Education
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                  Brigham Young University - Idaho
                </h4>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Bachelor of Science - Computer Software Engineering
                </p>
                <p className="text-sm text-secondary-500 dark:text-secondary-500">
                  2021 - 2022 • 4.0 GPA • Summa Cum Laude
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                  New River Community College
                </h4>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Associate's Degree - General Studies Computer Science
                </p>
                <p className="text-sm text-secondary-500 dark:text-secondary-500">
                  2018 - 2020 • 4.0 GPA • Phi Theta Kappa • Summa Cum Laude
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="card">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center">
              <Award className="mr-2" />
              Certifications
            </h3>
            <div>
              <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                Liquibase Certified Practitioner
              </h4>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Liquibase • June 2024
              </p>
            </div>
          </div>

          {/* Interests */}
          <div className="card">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center">
              <Heart className="mr-2" />
              Personal Interests
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                <Code className="mr-2" size={16} />
                <span>AI & Machine Learning</span>
              </div>
              <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                <Database className="mr-2" size={16} />
                <span>Database Optimization</span>
              </div>
              <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                <Brain className="mr-2" size={16} />
                <span>Personal Projects</span>
              </div>
              <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                <span className="mr-2">🏃‍♂️</span>
                <span>Working Out & Running</span>
              </div>
              <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                <span className="mr-2">👨‍👩‍👧‍👦</span>
                <span>Family Time</span>
              </div>
              <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                <span className="mr-2">🎮</span>
                <span>Video Games (CRPGs & Card Games)</span>
              </div>
              <div className="flex items-center text-secondary-700 dark:text-secondary-300">
                <span className="mr-2">🃏</span>
                <span>Magic: The Gathering</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Links */}
      <div className="mt-12 card">
        <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center">
          <ExternalLink className="mr-2" />
          Contact & Links
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-secondary-700 dark:text-secondary-300">
            <span className="mr-2" aria-hidden="true">📧</span>
            <a
              href="mailto:joshwassum97@gmail.com"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              aria-label="Email Josh Wassum"
            >
              joshwassum97@gmail.com
            </a>
          </div>
          <div className="flex items-center text-secondary-700 dark:text-secondary-300">
            <span className="mr-2" aria-hidden="true">📱</span>
            <a
              href="tel:2763784385"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              aria-label="Call Josh Wassum"
            >
              (276) 378-4385
            </a>
          </div>
          <div className="flex items-center text-secondary-700 dark:text-secondary-300">
            <span className="mr-2" aria-hidden="true">🔗</span>
            <a
              href="https://www.linkedin.com/in/joshwassum/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              aria-label="LinkedIn Profile"
            >
              LinkedIn Profile
            </a>
          </div>
          <div className="flex items-center text-secondary-700 dark:text-secondary-300">
            <span className="mr-2" aria-hidden="true">🐙</span>
            <a
              href="https://github.com/joshwassum?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              aria-label="GitHub Repositories"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 