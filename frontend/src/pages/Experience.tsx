import React, { useState } from 'react';
import { Calendar, MapPin, Building, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
  isExpanded: boolean;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: 'Software Engineering Lead',
      company: 'Linear B Systems',
      location: 'Remote',
      duration: 'Oct 2022 - Present',
      description: 'Leading software engineering initiatives with focus on database management, DevOps operations, and technical architecture.',
      technologies: ['Node.js', 'TypeScript', 'JavaScript', 'MySQL', 'XML', 'AWS', 'LiquiBase'],
      achievements: [
        'Manage MySQL database with 50+ million unique rows of data',
        'Optimize search capabilities and database performance',
        'Train team members on LiquiBase deployment software',
        'Support DevOps team in AWS infrastructure management',
        'Participate in design and planning meetings as technical voice',
        'Lead database deployments and optimization strategies'
      ],
      isExpanded: false
    },
    {
      id: '2',
      title: 'Associate Software Engineer',
      company: 'Linear B Systems',
      location: 'Remote',
      duration: 'Feb 2019 - Mar 2024',
      description: 'Full-stack development with focus on backend systems, data analytics, and accessibility compliance.',
      technologies: ['TypeScript', 'MySQL', 'React.js', 'Node.js', 'Tableau', 'Python', 'JSON'],
      achievements: [
        'VLM Backend Development: TypeScript API calls and MySQL data manipulation',
        'VLM Data Analytics: Tableau big data analysis in enterprise SCRUM environment',
        'Website Spider Project: Developed custom accessibility analysis tool with configurable depth and traversal options',
        'VA Time and Attendance System: Created 508-compliant training lessons for Department of Veterans Affairs',
        'Integrated accessibility tools with Ra11yUp compliance analysis application',
        'Updated courseware for quarterly VATAS releases with Section 508 compliance testing'
      ],
      isExpanded: false
    },
    {
      id: '3',
      title: 'Power Platform Development Lead',
      company: 'Transformative Management Solutions LLC',
      location: 'Blacksburg, Virginia',
      duration: 'Mar 2020 - Jan 2022',
      description: 'Led Power Platform development initiatives with focus on data integration and business intelligence solutions.',
      technologies: ['Microsoft SQL Server', 'Microsoft Power Platform', 'Microsoft Azure', 'Azure DevOps', 'JSON', 'Power BI', 'Power Apps'],
      achievements: [
        'Univision Labor Tracking: Integrated SQL Server & Project Online data using APIs and stored procedures',
        'Univision Budget Tracking: Established Azure DevOps project and implemented CI/CD pipeline for SQL deployments',
        'WBS Data Management: Developed Work Breakdown Structure maintenance application with EVM analytics',
        'College of Performance Management: Designed and deployed new website from requirements to production',
        'Created comprehensive labor tracking views combining SQL Server, Excel, and Project Online data',
        'Implemented YAML-based CI/CD pipelines for automated SQL deployments'
      ],
      isExpanded: false
    }
  ]);

  const toggleExpanded = (id: string) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, isExpanded: !exp.isExpanded } : exp
      )
    );
  };

  const companyLinks: Record<string, string> = {
    'Linear B Systems': '', // No public link provided
    'Transformative Management Solutions LLC': '', // No public link provided
  };
  const remoteRoles = ['Software Engineering Lead', 'Associate Software Engineer'];
  const leadershipRoles = ['Software Engineering Lead', 'Power Platform Development Lead'];
  const promotionCompanies = ['Linear B Systems'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          Work <span className="text-primary-600 dark:text-primary-400">Experience</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          My professional journey in software engineering, from database management to 
          AI-augmented development, with a focus on enterprise solutions and technical leadership.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-primary-200 dark:bg-primary-800"></div>

        {experiences.map((experience, index) => (
          <div key={experience.id} className={`relative mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-secondary-900"></div>

            {/* Experience Card */}
            <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
              <div className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 flex items-center gap-2">
                      {experience.title}
                      {leadershipRoles.includes(experience.title) && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-300" title="Leadership">Leadership</span>
                      )}
                      {remoteRoles.includes(experience.title) && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-300" title="Remote">Remote</span>
                      )}
                      {promotionCompanies.includes(experience.company) && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold border border-yellow-300" title="Promotion">Promotion</span>
                      )}
                    </h3>
                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium gap-2">
                      <Building size={16} className="mr-2" />
                      {experience.company}
                      {companyLinks[experience.company] && (
                        <a href={companyLinks[experience.company]} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${experience.company} website`} className="ml-1">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpanded(experience.id)}
                    className="text-secondary-500 hover:text-primary-600 transition-colors"
                  >
                    {experience.isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                <div className="flex items-center text-secondary-600 dark:text-secondary-400 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span className="mr-4">{experience.duration}</span>
                  <MapPin size={16} className="mr-2" />
                  <span>{experience.location}</span>
                </div>

                <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                  {experience.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Content */}
                {experience.isExpanded && (
                  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                    <h4 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                          <span className="text-secondary-700 dark:text-secondary-300 text-sm">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Career Summary */}
      <div className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 text-center">
          Career Summary
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
};

export default Experience; 