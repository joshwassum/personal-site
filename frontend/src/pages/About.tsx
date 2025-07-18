import React from 'react';
import { Calendar, MapPin, GraduationCap, Briefcase, Heart, Code, Database, Globe } from 'lucide-react';

const About: React.FC = () => {
  const timeline = [
    {
      year: '2023',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Company',
      description: 'Leading development of scalable web applications using React and Python.',
      icon: Briefcase,
    },
    {
      year: '2021',
      title: 'Full-Stack Developer',
      company: 'Startup',
      description: 'Built and maintained multiple client projects with modern technologies.',
      icon: Code,
    },
    {
      year: '2019',
      title: 'Software Engineer',
      company: 'Enterprise Corp',
      description: 'Developed backend services and APIs using Python and FastAPI.',
      icon: Database,
    },
    {
      year: '2017',
      title: 'Computer Science Degree',
      company: 'University',
      description: 'Graduated with honors in Computer Science and Software Engineering.',
      icon: GraduationCap,
    },
  ];

  const interests = [
    {
      icon: Code,
      title: 'Coding',
      description: 'Building innovative solutions and exploring new technologies.',
    },
    {
      icon: Globe,
      title: 'Travel',
      description: 'Exploring new cultures and experiencing different perspectives.',
    },
    {
      icon: Heart,
      title: 'Fitness',
      description: 'Staying active and maintaining a healthy lifestyle.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          About <span className="text-primary-600 dark:text-primary-400">Me</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          Passionate full-stack developer with a love for creating meaningful digital experiences
          and solving complex problems through innovative technology solutions.
        </p>
      </div>

      {/* Personal Story */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            My Story
          </h2>
          <div className="space-y-4 text-secondary-600 dark:text-secondary-400">
            <p>
              Hello! I'm Josh Wassum, a dedicated full-stack developer with over 6 years of experience
              in creating web applications that make a difference. My journey in technology began with
              a curiosity about how things work on the internet, which evolved into a passion for
              building digital solutions that solve real-world problems.
            </p>
            <p>
              I specialize in modern web technologies, particularly React and Python, and I'm always
              excited to learn new tools and frameworks that can help me create better user experiences.
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source
              projects, or sharing knowledge with the developer community.
            </p>
            <p>
              I believe in writing clean, maintainable code and creating applications that are not only
              functional but also delightful to use. Every project I work on is an opportunity to learn
              something new and push the boundaries of what's possible.
            </p>
          </div>
        </div>

        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            Quick Facts
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="text-primary-600 dark:text-primary-400" size={20} />
              <span className="text-secondary-600 dark:text-secondary-400">
                Based in San Francisco, CA
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-primary-600 dark:text-primary-400" size={20} />
              <span className="text-secondary-600 dark:text-secondary-400">
                6+ years of experience
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="text-primary-600 dark:text-primary-400" size={20} />
              <span className="text-secondary-600 dark:text-secondary-400">
                Computer Science Degree
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Code className="text-primary-600 dark:text-primary-400" size={20} />
              <span className="text-secondary-600 dark:text-secondary-400">
                50+ projects completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Journey */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
          Professional Journey
        </h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-secondary-200 dark:bg-secondary-700"></div>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-start space-x-6">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-secondary-900"></div>
                
                <div className="ml-16 flex-1">
                  <div className="card">
                    <div className="flex items-center space-x-3 mb-3">
                      <item.icon className="text-primary-600 dark:text-primary-400" size={24} />
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {item.company}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interests & Hobbies */}
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
          Beyond Coding
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {interests.map((interest, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4">
                <interest.icon size={48} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                {interest.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About; 