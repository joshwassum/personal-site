import React, { useState } from 'react';
import { Code, Globe, Palette, Server, Zap, Brain } from 'lucide-react';

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
    { name: 'React', proficiency: 70, category: 'frontend', description: 'Currently developing proficiency, working on modern React patterns' },
    { name: 'TypeScript', proficiency: 85, category: 'frontend', description: 'Advanced TypeScript development with type safety' },
    { name: 'JavaScript', proficiency: 85, category: 'frontend', description: 'Advanced JavaScript with ES6+ features and modern patterns' },
    { name: 'HTML/CSS', proficiency: 80, category: 'frontend', description: 'Semantic HTML and responsive CSS design' },

    // Backend Skills
    { name: 'Python', proficiency: 85, category: 'backend', description: 'Advanced Python development, data processing, and automation' },
    { name: 'Node.js', proficiency: 85, category: 'backend', description: 'Advanced server-side JavaScript development' },
    { name: 'MySQL', proficiency: 95, category: 'backend', description: 'Expert database management with 50M+ row optimization' },
    { name: 'SQL Server', proficiency: 95, category: 'backend', description: 'Expert SQL Server administration and optimization' },
    { name: 'Java', proficiency: 70, category: 'backend', description: 'Intermediate Java development' },
    { name: 'DAX', proficiency: 70, category: 'backend', description: 'Intermediate DAX for data analysis' },
    { name: 'Shell Scripting', proficiency: 70, category: 'backend', description: 'Intermediate shell scripting and automation' },

    // DevOps Skills
    { name: 'Azure CI/CD', proficiency: 85, category: 'devops', description: 'Advanced Azure DevOps pipelines and deployment' },
    { name: 'DevOps Operations', proficiency: 85, category: 'devops', description: 'Advanced DevOps practices and infrastructure management' },
    { name: 'AWS', proficiency: 70, category: 'devops', description: 'Intermediate AWS cloud services and infrastructure' },
    { name: 'LiquiBase', proficiency: 90, category: 'devops', description: 'Expert database deployment and version control' },

    // AI & Tools
    { name: 'AI Development', proficiency: 80, category: 'ai', description: 'Proficient with Cursor, ChatGPT, Kiro, and Co-pilot' },
    { name: 'LLMs', proficiency: 75, category: 'ai', description: 'Actively exploring large language models and their implications' },
    { name: 'Tableau', proficiency: 80, category: 'ai', description: 'Advanced data visualization and analytics' },

    // Other Skills
    { name: 'REST APIs', proficiency: 85, category: 'other', description: 'API design and development with TypeScript' },
    { name: 'XML/JSON', proficiency: 85, category: 'other', description: 'Data transformation and integration' },
    { name: 'SCRUM/Jira', proficiency: 85, category: 'other', description: 'Enterprise-level agile development' },
  ];

  const categories = [
    { id: 'all', name: 'All Skills', icon: Code, color: 'text-blue-600' },
    { id: 'frontend', name: 'Frontend', icon: Palette, color: 'text-green-600' },
    { id: 'backend', name: 'Backend', icon: Server, color: 'text-purple-600' },
    { id: 'devops', name: 'DevOps', icon: Zap, color: 'text-orange-600' },
    { id: 'ai', name: 'AI & Tools', icon: Brain, color: 'text-pink-600' },
    { id: 'other', name: 'Other', icon: Globe, color: 'text-indigo-600' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const certifiedSkills = ['LiquiBase'];
  const keySkills = ['MySQL', 'SQL Server', 'TypeScript', 'Python', 'DevOps Operations', 'Azure CI/CD'];

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
          across various technologies and frameworks, with a focus on database management, 
          AI integration, and DevOps practices.
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
              <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 flex items-center gap-2">
                {skill.name}
                {certifiedSkills.includes(skill.name) && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold border border-green-300" title="Certified">Certified</span>
                )}
                {keySkills.includes(skill.name) && skill.proficiency >= 90 && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-300" title="Key Skill">Key Skill</span>
                )}
              </h3>
              <span className={`text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>{getProficiencyLabel(skill.proficiency)}</span>
            </div>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4 text-sm">{skill.description}</p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <li>• Large Language Models (LLMs) and their implications</li>
              <li>• Advanced AI integration in development workflows</li>
              <li>• System architecture and design patterns</li>
              <li>• Advanced React patterns and optimization</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Learning Goals
            </h3>
            <ul className="space-y-2 text-secondary-600 dark:text-secondary-400">
              <li>• Master AI-augmented development practices</li>
              <li>• Transition to system architecture role</li>
              <li>• Develop income-generating applications</li>
              <li>• Contribute to open source projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 