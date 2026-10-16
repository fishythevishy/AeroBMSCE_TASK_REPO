import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Send, MapPin, Compass } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    tier: 'Platinum Partner',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#090910] border border-[#29263C] rounded-xl p-6 sm:p-8 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8888C8] hover:text-[#F4F2FF] transition-colors p-1"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#B9B7FF]/10 text-[#B9B7FF] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F4F2FF] font-display">
              Inquiry Dispatched to Propel Lab-3
            </h3>
            <p className="text-xs sm:text-sm text-[#8888C8] max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to AeroBMSCE. A representative from the partnership desk
              will review your inquiry at <span className="text-[#B9B7FF]">aerobmsce@bmsce.ac.in</span> and respond shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2 bg-[#15151F] text-[#F4F2FF] hover:bg-[#29263C] rounded-md text-xs font-mono transition-colors"
              >
                CLOSE WINDOW
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B9B7FF] uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>AEROBMSCE PARTNERSHIP DESK</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F4F2FF] font-display">
              Connect with Propel Lab-3
            </h3>
            <p className="text-xs text-[#8888C8] mt-1 mb-6">
              Official aerospace innovation club of BMS College of Engineering · Basavanagudi, Bengaluru
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D7D7E4] block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Kumar"
                    className="w-full bg-[#030305] border border-[#29263C] focus:border-[#B9B7FF] rounded px-3 py-2 text-[#F4F2FF] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#D7D7E4] block mb-1">Corporate / Institution Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full bg-[#030305] border border-[#29263C] focus:border-[#B9B7FF] rounded px-3 py-2 text-[#F4F2FF] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D7D7E4] block mb-1">Organization / Company</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Aerospace Dynamics Ltd."
                    className="w-full bg-[#030305] border border-[#29263C] focus:border-[#B9B7FF] rounded px-3 py-2 text-[#F4F2FF] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#D7D7E4] block mb-1">Collaboration Interest</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full bg-[#030305] border border-[#29263C] focus:border-[#B9B7FF] rounded px-3 py-2 text-[#F4F2FF] outline-none transition-colors"
                  >
                    <option value="Platinum Partner">Platinum Partner (Title / Strategic)</option>
                    <option value="Gold Partner">Gold Partner (High Visibility)</option>
                    <option value="Silver Partner">Silver Partner (Media &amp; Events)</option>
                    <option value="Technical Partner">Technical &amp; Ecosystem Partner</option>
                    <option value="Research Interaction">Research / Academic Mentorship</option>
                    <option value="Student Recruitment">Talent Recruitment Inbound</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#D7D7E4] block mb-1">Message or Project Query *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your interest in sponsoring team travel, providing technical tools, or initiating research collaboration..."
                  className="w-full bg-[#030305] border border-[#29263C] focus:border-[#B9B7FF] rounded px-3 py-2 text-[#F4F2FF] outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-[#8888C8]">
                  Direct desk: aerobmsce@bmsce.ac.in
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#B9B7FF] hover:bg-white text-[#030305] font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
