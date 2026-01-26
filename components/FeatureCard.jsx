import React from "react";

const FeatureCard = ({ icon: Icon, title, desc }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-md transition-all group">
      <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors shadow-sm">
        <Icon className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

export default FeatureCard;
