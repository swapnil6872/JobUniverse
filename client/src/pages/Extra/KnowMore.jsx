import React, { useState } from 'react';
import { 
  Star, 
  Gift, 
  Share2, 
  Copy, 
  CheckCircle, 
  Sparkles, 
  TrendingUp, 
  Briefcase, 
  ShieldCheck, 
  Award 
} from 'lucide-react';

const KnowMore = () => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [copied, setCopied] = useState(false);
  const referralCode = "JOBUNIVERSE2026";

  // Handle Copying Referral Code
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic Content Matrix Based on Rating (1 to 5)
  const ratingContent = {
    1: {
      title: "We're Committed to Improving Your Experience",
      badge: "Your Feedback Matters",
      description: "It looks like Job Universe hasn't met your expectations yet. Our team is actively working on upgrading job matching algorithms and verifying recruiters daily.",
      actionText: "Report an Issue",
      perk: "Get direct 1-on-1 support to optimize your profile visibility.",
      color: "from-amber-500/10 to-red-500/10 border-red-500/30",
    },
    2: {
      title: "Let's Find You Better Opportunities",
      badge: "Optimization Mode",
      description: "We are expanding our network! Connect your preferences to get access to tailored job alerts, direct recruiter messaging, and resume scoring.",
      actionText: "Update Job Preferences",
      perk: "Unlock free resume review credits by updating your profile.",
      color: "from-amber-500/10 to-orange-500/10 border-orange-500/30",
    },
    3: {
      title: "Good Start! Ready to Level Up?",
      badge: "Growth Potential",
      description: "You're seeing solid opportunities, but the best matches come to active users. Enable instant notifications and apply within 24 hours of posting.",
      actionText: "Explore Top Matches",
      perk: "Claim 1 month of free Application Tracking Insights.",
      color: "from-blue-500/10 to-cyan-500/10 border-cyan-500/30",
    },
    4: {
      title: "You're Making Great Progress!",
      badge: "High Match Rate",
      description: "Your profile is performing well above average! Keep applying to recommended roles and boost your response rate from hiring managers.",
      actionText: "View Priority Jobs",
      perk: "Unlock 5 Free Direct Messages to hiring managers.",
      color: "from-indigo-500/10 to-blue-500/10 border-indigo-500/30",
    },
    5: {
      title: "You're a Job Universe Power User!",
      badge: "VIP Candidate",
      description: "You're getting maximum exposure! High-rating candidates like you are prioritized in recruiter search results across our platform.",
      actionText: "Claim VIP Badge",
      perk: "Enjoy top-tier placement on all active applications.",
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30",
    }
  };

  const currentContent = ratingContent[rating];

  return (
    <div className="bg-[#eff6ff]">
          <div className="max-w-4xl mx-auto p-6 space-y-8 bg-[#21566c] text-slate-100 rounded-2xl shadow-xl border border-slate-800">
      
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium">
          <Briefcase className="w-4 h-4" /> Welcome to Job Universe
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
          Explore Your Universe of Opportunities
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          Discover how Job Universe accelerates your career, invite your network for cash rewards, and unlock personalized perks.
        </p>
      </div>

      {/* Refer & Earn Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 p-6 sm:p-8 rounded-xl border border-indigo-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-semibold text-sm">
              <Gift className="w-5 h-5" />
              <span>Referral Program</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Refer Friends, Earn Up to $50 Each</h2>
            <p className="text-slate-300 text-sm max-w-md">
              Share your personal link. When your connection joins Job Universe and lands an interview, both of you earn rewards!
            </p>
          </div>

          <div className="w-full md:w-auto bg-slate-800/80 p-4 rounded-lg border border-slate-700 space-y-3 min-w-[280px]">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Your Invite Code</span>
            <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-md border border-slate-700">
              <span className="font-mono font-bold text-indigo-400">{referralCode}</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Rating & Content Personalization */}
      <div className="bg-slate-800/50 p-6 sm:p-8 rounded-xl border border-slate-700/60 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-white">How is Job Universe working for you?</h3>
          <p className="text-sm text-slate-400">Select a rating to personalize your platform benefits and features.</p>
          
          {/* Interactive Star Rating */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 transition-transform hover:scale-125 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star 
                  className={`w-8 h-8 ${
                    (hoverRating || rating) >= star 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'text-slate-600'
                  } transition-colors`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Display Based on Rating */}
        <div className={`p-6 rounded-xl bg-gradient-to-r ${currentContent.color} border transition-all duration-300 space-y-4`}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 bg-white/10 rounded-full text-white">
              {currentContent.badge}
            </span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Dynamic Recommendation
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">{currentContent.title}</h4>
            <p className="text-slate-300 text-sm">{currentContent.description}</p>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-indigo-300 font-medium">
              <Award className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{currentContent.perk}</span>
            </div>
            <button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs px-4 py-2.5 rounded-lg transition shrink-0">
              {currentContent.actionText}
            </button>
          </div>
        </div>
      </div>

      {/* Value Proposition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-800 space-y-2">
          <TrendingUp className="w-6 h-6 text-indigo-400" />
          <h4 className="font-semibold text-white">Smart Match Engine</h4>
          <p className="text-xs text-slate-400">AI-driven job matching designed to pair your specific skills with top tech roles.</p>
        </div>
        <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-800 space-y-2">
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
          <h4 className="font-semibold text-white">Verified Employers</h4>
          <p className="text-xs text-slate-400">Every recruiter and job post on Job Universe is manually vetted for quality.</p>
        </div>
        <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-800 space-y-2">
          <Share2 className="w-6 h-6 text-indigo-400" />
          <h4 className="font-semibold text-white">Community Perks</h4>
          <p className="text-xs text-slate-400">Earn rewards and gain platform exposure by bringing qualified talent aboard.</p>
        </div>
      </div>

    </div>
    </div>

  );
};

export default KnowMore;