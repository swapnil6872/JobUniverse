import React, { useState } from 'react';
import { Search, ChevronDown, MessageSquare, Mail, HelpCircle, BookOpen, User } from 'lucide-react';

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { icon: <User className="w-5 h-5" />, title: "Account & Profile", count: "12 articles" },
    { icon: <BookOpen className="w-5 h-5" />, title: "Applying for Jobs", count: "18 articles" },
    { icon: <HelpCircle className="w-5 h-5" />, title: "Employer Services", count: "10 articles" },
    { icon: <MessageSquare className="w-5 h-5 text-indigo-600" />, title: "Trust & Safety", count: "8 articles" }
  ];

  const faqs = [
    {
      q: "How do I create an account on JobUniverse?",
      a: "Click on the 'Sign Up' button at the top right corner. Select whether you are a Job Seeker or Employer, fill in your details, and verify your email."
    },
    {
      q: "Is JobUniverse free for job seekers?",
      a: "Yes, JobUniverse is completely free for job seekers to search, apply for jobs, and create professional profiles."
    },
    {
      q: "How do I track my submitted applications?",
      a: "Navigate to your Account Dashboard and select 'My Applications' to view status updates on all your submitted applications."
    },
    {
      q: "How can employers post a job listing?",
      a: "Employers can switch to an Employer account, visit the Employer Dashboard, and click 'Post a Job' to publish new openings."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Search Section */}
      <div className="bg-indigo-700 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">How can we help you?</h1>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for articles, questions, or topics..."
            className="w-full pl-12 pr-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-500 cursor-pointer transition-colors">
              <div className="text-indigo-600 mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-slate-900">{cat.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 last:border-0 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
                >
                  <span className="font-medium text-slate-800 hover:text-indigo-600">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed pl-1">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-indigo-50 rounded-xl p-8 border border-indigo-100">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Still need assistance?</h3>
          <p className="text-slate-600 text-sm mb-6">Our support team is available to help you with any issue.</p>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
              <Mail className="w-4 h-4" /> Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;