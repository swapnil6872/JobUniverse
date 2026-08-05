import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, Eye, FileText, UserCheck } from 'lucide-react';

const SafetyTips = () => {
  const tips = [
    {
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      title: "Never Pay for Job Applications",
      description: "JobUniverse and legitimate employers will never ask you to pay for training, interviews, or job offers. Report any user asking for money."
    },
    {
      icon: <Eye className="w-6 h-6 text-indigo-600" />,
      title: "Protect Personal Financial Info",
      description: "Do not share bank account details, Social Security numbers, or credit card info during the initial application process."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-indigo-600" />,
      title: "Verify Company Identity",
      description: "Ensure communications come from official company domain emails rather than personal accounts like Gmail or Yahoo."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-indigo-600" />,
      title: "Watch for Suspicious Offers",
      description: "Be wary of job offers that seem too good to be true, require immediate wire transfers, or lack a clear job description."
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      title: "Keep Interactions On-Platform",
      description: "Communicate through JobUniverse messaging system as long as possible to maintain a clear record of interactions."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: "Report Fraudulent Postings",
      description: "If you encounter a suspicious job listing or profile, use the 'Report' button immediately so our team can investigate."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">Stay Protected</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">Job Universe Safety Center</h1>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Your safety is our priority. Follow these guidelines to ensure a secure job search experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-indigo-50 rounded-lg w-fit mb-4">
                {tip.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900">Encountered something suspicious?</h4>
              <p className="text-sm text-slate-600">Report fraudulent listings immediately to keep our platform safe for everyone.</p>
            </div>
          </div>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-5 py-2.5 rounded-lg whitespace-nowrap transition-colors">
            Report an Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;