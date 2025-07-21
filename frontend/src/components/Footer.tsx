import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/joshwassum',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/joshwassum',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:joshwassum97@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-secondary-600 dark:text-secondary-400">
            <p>&copy; {currentYear} Josh Wassum. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* Made with love */}
          <div className="text-secondary-600 dark:text-secondary-400 text-sm">
            <p>Made with ❤️ using React & Python</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 