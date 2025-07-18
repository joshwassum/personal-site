import React, { useState } from 'react';
import { Calendar, MapPin, Building, Users, Award, Code, Database, Globe, Smartphone } from 'lucide-react';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  icon: React.ComponentType<any>;
  type: 'full-time' | 'contract' | 'freelance';
}

const Experience: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const experiences: Experience[] = [
    {
      id: 1,
      title: 'Senior Full-Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      duration: '2022 - Present',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Leading development of enterprise-scale web applications and mentoring junior developers.',
      achievements: [
        'Led a team of 5 developers in building a customer portal serving 100K+ users',
        'Reduced application load time by 40% through performance optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
        'Mentored 3 junior developers and conducted code reviews'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      icon: Code,
      type: 'full-time'
    },
    {
      id: 2,
      title: 'Full-Stack Developer',
      company: 'StartupHub Inc',
      location: 'Remote',
      duration: '2020 - 2022',
      startDate: '2020-03',
      endDate: '2022-01',
      description: 'Built and maintained multiple client projects with modern web technologies.',
      achievements: [
        'Developed 15+ client projects from concept to deployment',
        'Built a real-time collaboration platform with WebSocket integration',
        'Implemented automated testing achieving 90% code coverage',
        'Optimized database queries improving performance by 50%'
      ],
      technologies: ['React', 'Python', 'FastAPI', 'MongoDB', 'Redis', 'WebSocket'],
      icon: Globe,
      type: 'full-time'
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Enterprise Systems',
      location: 'New York, NY',
      duration: '2018 - 2020',
      startDate: '2018-06',
      endDate: '2020-03',
      description: 'Developed robust backend services and APIs for enterprise applications.',
      achievements: [
        'Designed and implemented RESTful APIs serving 1M+ requests daily',
        'Built microservices architecture improving system scalability',
        'Implemented comprehensive logging and monitoring systems',
        'Reduced API response time by 35% through optimization'
      ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      icon: Database,
      type: 'full-time'
    },
    {
      id: 4,
      title: 'Mobile App Developer',
      company: 'MobileTech Solutions',
      location: 'Austin, TX',
      duration: '2017 - 2018',
      startDate: '2017-09',
      endDate: '2018-06',
      description: 'Developed cross-platform mobile applications using React Native.',
      achievements: [
        'Built 3 mobile apps with 50K+ combined downloads',
        'Implemented offline functionality and data synchronization',
        'Optimized app performance reducing crash rate by 80%',
        'Integrated payment processing and push notifications'
      ],
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'Stripe'],
      icon: Smartphone,
      type: 'contract'
    },
    {
      id: 5,
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      location: 'Remote',
      duration: '2016 - 2017',
      startDate: '2016-01',
      endDate: '2017-09',
      description: 'Provided web development services to small businesses and startups.',
      achievements: [
        'Completed 25+ projects for various clients',
        'Built e-commerce platforms and business websites',
        'Provided ongoing maintenance and support services',
        'Established long-term client relationships'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
      icon: Building,
      type: 'freelance'
    }
  ];

  const experienceTypes = [
    { id: 'all', name: 'All Experience', icon: Calendar },
    { id: 'full-time', name: 'Full-Time', icon: Building },
    { id: 'contract', name: 'Contract', icon: Users },
    { id: 'freelance', name: 'Freelance', icon: Award },
  ];

  const filteredExperiences = selectedType === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === selectedType);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'contract': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'freelance': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          Work <span className="text-primary-600 dark:text-primary-400">Experience</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          My professional journey showcasing diverse roles, achievements, and growth
          in the technology industry.
        </p>
      </div>

      {/* Experience Type Filter */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {experienceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedType === type.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              <type.icon size={20} />
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary-200 dark:bg-secondary-700 hidden lg:block"></div>
        
        <div className="space-y-8">
          {filteredExperiences.map((experience) => (
            <div key={experience.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-secondary-900 hidden lg:block"></div>
              
              <div className="lg:ml-16">
                <div className="card group hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <experience.icon className="text-primary-600 dark:text-primary-400" size={24} />
                        <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                          {experience.title}
                        </h3>
                      </div>
                      <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mb-1">
                        {experience.company}
                      </p>
                      <div className="flex items-center space-x-4 text-secondary-600 dark:text-secondary-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin size={16} />
                          <span>{experience.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{experience.duration}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(experience.type)}`}>
                      {experience.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                    {experience.description}
                  </p>
                  
                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Award size={16} className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                          <span className="text-secondary-600 dark:text-secondary-400">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Summary */}
      <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 text-center">
          Experience Summary
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {experiences.length}
            </div>
            <p className="text-secondary-600 dark:text-secondary-400">Total Positions</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              7+
            </div>
            <p className="text-secondary-600 dark:text-secondary-400">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              50+
            </div>
            <p className="text-secondary-600 dark:text-secondary-400">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              15+
            </div>
            <p className="text-secondary-600 dark:text-secondary-400">Technologies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience; 