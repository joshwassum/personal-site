import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Github, Linkedin, Twitter } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'josh.wassum@example.com',
      link: 'mailto:josh.wassum@example.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '(540) 123-4567',
      link: null, // Remove clickable link to prevent robocallers
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Blacksburg, VA',
      link: 'https://maps.google.com/?q=Blacksburg+VA',
    },
    {
      icon: Clock,
      title: 'Availability',
      value: 'Mon-Fri, 9AM-6PM EST',
      link: null,
    },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: Linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: Twitter,
      color: 'hover:text-blue-400 dark:hover:text-blue-300',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 id="contact-heading" className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
          Get In <span className="text-primary-600 dark:text-primary-400">Touch</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          I'm always interested in new opportunities and exciting projects.
          Let's discuss how we can work together!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            Send a Message
          </h2>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2" aria-live="polite">
              <CheckCircle className="text-green-600 dark:text-green-400" size={20} aria-hidden="true" />
              <span className="text-green-800 dark:text-green-200">
                Message sent successfully! I'll get back to you soon.
              </span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2" aria-live="polite">
              <AlertCircle className="text-red-600 dark:text-red-400" size={20} aria-hidden="true" />
              <span className="text-red-800 dark:text-red-200">
                Something went wrong. Please try again.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form" aria-labelledby="contact-heading">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Name
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                  errors.name
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                  errors.email
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Subject
              </label>
              <input
                {...register('subject')}
                type="text"
                id="subject"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 ${
                  errors.subject
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
                }`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Message
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={6}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none ${
                  errors.message
                    ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800'
                }`}
                placeholder="Tell me about your project or opportunity..."
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} aria-hidden="true" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
              Contact Information
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <info.icon className="text-primary-600 dark:text-primary-400" size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-900 dark:text-secondary-100">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                        aria-label={info.title + ': ' + info.value}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-secondary-600 dark:text-secondary-400">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
              Follow Me
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-secondary-100 dark:bg-secondary-800 rounded-lg flex items-center justify-center text-secondary-600 dark:text-secondary-400 transition-colors duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon size={24} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Response */}
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
              Quick Response
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              I typically respond to messages within 24 hours during business days.
              For urgent matters, feel free to reach out via phone.
            </p>
            <div className="text-sm text-secondary-500 dark:text-secondary-500">
              <p>• Project inquiries: 24-48 hours</p>
              <p>• Job opportunities: 24 hours</p>
              <p>• General questions: 48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 