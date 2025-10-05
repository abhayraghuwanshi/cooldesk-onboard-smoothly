import React from 'react';

// --- Icon Components (for buttons) ---


// --- Feature Data ---
interface Feature {
    illustration: JSX.Element;
    title: string;
    desc: string;
    gridClasses: string;
    bgClass: string;
}

// --- Components ---
const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
    return (
        <div className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${feature.gridClasses} ${feature.bgClass}`}>
            <div className="flex-grow flex items-center justify-center mb-4 min-h-[120px] md:min-h-[160px]">
                {feature.illustration}
            </div>
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
        </div>
    );
};


export default FeatureCard;




