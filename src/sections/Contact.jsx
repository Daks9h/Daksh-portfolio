import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import LaserButton from '../components/LaserButton';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || `Error dispatching message (HTTP ${response.status})`);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#ffffff']
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 7000);
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage(
        err.message || 'Transmission failed. You can also contact Daksh directly at dakshlalwani89@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-4 pb-16 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="section-title">
            GET IN TOUCH
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Communication Channels & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="cyber-card p-4 sm:p-6 rounded-xl border border-white/[0.08] space-y-4">
              <h3 className="text-base font-semibold text-white pb-2 border-b border-white/[0.06]">
                Direct Contact Channels
              </h3>

              {/* Email Card */}
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-[#111622] border border-white/[0.06] hover:border-cyan-500/40 transition-all group"
              >
                <div className="p-2.5 rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs overflow-hidden">
                  <span className="text-slate-400 text-[11px] block">Email Address</span>
                  <span className="text-white font-medium group-hover:text-cyan-300 transition-colors truncate block">
                    {portfolioData.personal.email}
                  </span>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-[#111622] border border-white/[0.06] hover:border-emerald-500/40 transition-all group"
              >
                <div className="p-2.5 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 text-[11px] block">Direct Phone</span>
                  <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                    {portfolioData.personal.phone}
                  </span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg bg-[#111622] border border-white/[0.06] hover:border-blue-500/40 transition-all group"
              >
                <div className="p-2.5 rounded-md bg-blue-950/60 text-blue-400 border border-blue-500/30 group-hover:scale-105 transition-transform">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div className="text-xs overflow-hidden">
                  <span className="text-slate-400 text-[11px] block">LinkedIn Profile</span>
                  <span className="text-white font-medium group-hover:text-blue-300 transition-colors truncate block">
                    linkedin.com/in/dakshlalwani-374212308
                  </span>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg bg-[#111622] border border-white/[0.06] hover:border-purple-500/40 transition-all group"
              >
                <div className="p-2.5 rounded-md bg-purple-950/60 text-purple-400 border border-purple-500/30 group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div className="text-xs overflow-hidden">
                  <span className="text-slate-400 text-[11px] block">GitHub Portfolio</span>
                  <span className="text-white font-medium group-hover:text-purple-300 transition-colors truncate block">
                    github.com/Daks9h
                  </span>
                </div>
              </a>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/917898068165"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#07090e] bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

            </div>

            {/* Google Maps Location Embed of LNCT Bhopal */}
            <div className="cyber-card p-4 rounded-xl border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Bhopal, Madhya Pradesh, India
                </span>
                <span className="text-[11px] font-mono text-cyan-400">LNCT Campus</span>
              </div>
              <div className="h-44 w-full rounded-lg overflow-hidden border border-white/[0.06]">
                <iframe
                  title="LNCT Bhopal Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.967838541164!2d77.46465497528136!3d23.189626579058774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c41c7b8e5c1d3%3A0xb30419d2fa784d12!2sLakshmi%20Narain%20College%20of%20Technology%20(LNCT)%2C%20Bhopal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="cyber-card p-4 sm:p-6 md:p-8 rounded-xl border border-white/[0.08] shadow-2xl relative">
              <h3 className="text-lg font-bold text-white mb-6 pb-3 border-b border-white/[0.06]">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                
                {/* Field 1: Name */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium block">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-2.5 bg-[#111622] border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder:text-slate-500 rounded-lg transition-all"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium block">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@company.com"
                    className="w-full px-4 py-2.5 bg-[#111622] border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder:text-slate-500 rounded-lg transition-all"
                  />
                </div>

                {/* Field 3: Message */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium block">
                    Project or Role Details <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full px-4 py-2.5 bg-[#111622] border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder:text-slate-500 rounded-lg transition-all resize-none"
                  ></textarea>
                </div>

                {/* Feedback State */}
                {isSubmitted && (
                  <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-lg flex items-center gap-2.5 text-emerald-300 text-xs font-medium animate-fadeIn">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Message received! Daksh will respond to your inquiry shortly.</span>
                  </div>
                )}

                {/* Error State */}
                {errorMessage && (
                  <div className="p-3.5 bg-red-950/60 border border-red-500/40 rounded-lg flex items-start gap-2.5 text-red-300 text-xs font-medium animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p>{errorMessage}</p>
                      <a
                        href={`mailto:${portfolioData.personal.email}`}
                        className="text-cyan-400 hover:underline mt-1 inline-block"
                      >
                        Send directly via your email client →
                      </a>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <LaserButton
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  variant="cyan"
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </LaserButton>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
