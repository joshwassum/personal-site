import React, { useState } from 'react';
import { Code, Database, Globe, Smartphone, Palette, Server, Zap, Shield } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: string;
  icon?: React.ComponentType<any>;
  description: string;
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const skills: Skill[] = [
    // Frontend Skills
    { name: 'React', proficiency: 95, category: 'frontend', description: 'Modern React with hooks, context, and performance optimization' },
    { name: 'TypeScript', proficiency: 90, category: 'frontend', description: 'Type-safe JavaScript development' },
    { name: 'Next.js', proficiency: 85, category: 'frontend', description: 'Full-stack React framework' },
    { name: 'Tailwind CSS', proficiency: 92, category: 'frontend', description: 'Utility-first CSS framework' },
    { name: 'HTML/CSS', proficiency: 95, category: 'frontend', description: 'Semantic HTML and modern CSS' },
    { name: 'JavaScript', proficiency: 90, category: 'frontend', description: 'ES6+ features and modern patterns' },

    // Backend Skills
    { name: 'Python', proficiency: 88, category: 'backend', description: 'FastAPI, Django, and data processing' },
    { name: 'FastAPI', proficiency: 85, category: 'backend', description: 'Modern Python web framework' },
    { name: 'Node.js', proficiency: 80, category: 'backend', description: 'Server-side JavaScript development' },
    { name: 'PostgreSQL', proficiency: 75, category: 'backend', description: 'Relational database management' },
    { name: 'MongoDB', proficiency: 70, category: 'backend', description: 'NoSQL database design' },
    { name: 'Redis', proficiency: 65, category: 'backend', description: 'In-memory data structure store' },

    // DevOps Skills
    { name: 'Docker', proficiency: 75, category: 'devops', description: 'Containerization and deployment' },
    { name: 'Git', proficiency: 90, category: 'devops', description: 'Version control and collaboration' },
    { name: 'CI/CD', proficiency: 70, category: 'devops', description: 'Continuous integration and deployment' },
    { name: 'AWS', proficiency: 65, category: 'devops', description: 'Cloud infrastructure and services' },

    // Mobile Skills
    { name: 'React Native', proficiency: 75, category: 'mobile', description: 'Cross-platform mobile development' },
    { name: 'Expo', proficiency: 70, category: 'mobile', description: 'React Native development platform' },

    // Other Skills
    { name: 'GraphQL', proficiency: 70, category: 'other', description: 'API query language' },
    { name: 'REST APIs', proficiency: 85, category: 'other', description: 'API design and development' },
    { name: 'Testing', proficiency: 75, category: 'other', description: 'Unit, integration, and E2E testing' },
  ];

  const categories = [
    { id: 'all', name: 'All Skills', icon: Code, color: 'text-blue-600' },
    { id: 'frontend', name: 'Frontend', icon: Palette, color: 'text-green-600' },
    { id: 'backend', name: 'Backend', icon: Server, color: 'text-purple-600' },
    { id: 'devops', name: 'DevOps', icon: Zap, color: 'text-orange-600' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, color: 'text-pink-600' },
    { id: 'other', name: 'Other', icon: Globe, color: 'text-indigo-600' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'text-green-600 dark:text-green-400';
    if (proficiency >= 80) return 'text-blue-600 dark:text-blue-400';
    if (proficiency >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          Technical <span className="text-primary-600 dark:text-primary-400">Skills</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          A comprehensive overview of my technical expertise and proficiency levels
          across various technologies and frameworks.
        </p>
      </div>

      {/* Skill Categories */}
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

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <div key={index} className="card group hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
                {skill.name}
              </h3>
              <span className={`text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>
                {getProficiencyLabel(skill.proficiency)}
              </span>
            </div>
            
            <p className="text-secondary-600 dark:text-secondary-400 mb-4 text-sm">
              {skill.description}
            </p>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                <span>Proficiency</span>
                <span>{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    skill.proficiency >= 90 ? 'bg-green-500' :
                    skill.proficiency >= 80 ? 'bg-blue-500' :
                    skill.proficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Overview */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
          Skills Overview
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.slice(1).map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category.id);
            const avgProficiency = categorySkills.length > 0 
              ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.proficiency, 0) / categorySkills.length)
              : 0;
            
            return (
              <div key={category.id} className="card text-center">
                <div className={`flex justify-center mb-4 ${category.color}`}>
                  <category.icon size={48} />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                  {category.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  {categorySkills.length} skills
                </p>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {avgProficiency}%
                </div>
                <p className="text-sm text-secondary-500 dark:text-secondary-500">
                  Average proficiency
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Journey */}
      <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 text-center">
          Continuous Learning
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Currently Learning
            </h3>
            <ul className="space-y-2 text-secondary-600 dark:text-secondary-400">
              <li>• Rust for systems programming</li>
              <li>• Machine Learning with Python</li>
              <li>• Advanced React patterns</li>
              <li>• Cloud architecture design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Learning Goals
            </h3>
            <ul className="space-y-2 text-secondary-600 dark:text-secondary-400">
              <li>• Master microservices architecture</li>
              <li>• Deep dive into performance optimization</li>
              <li>• Explore emerging technologies</li>
              <li>• Contribute to open source projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 