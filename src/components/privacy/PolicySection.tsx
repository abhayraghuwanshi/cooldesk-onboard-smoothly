import React, { useState } from "react";

interface PolicySectionProps {
    title: string;
    id: string;
    children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, id, children }) => {
    const [open, setOpen] = useState(true);

    return (
        <section id= { id } className = "border-b border-gray-200 py-6" >
            <button
        className="w-full flex justify-between items-center text-left"
    onClick = {() => setOpen(!open)}
      >
    <h2 className="text-xl font-semibold text-gray-800" > { title } </h2>
        < span className = "text-blue-600" > { open? "−": "+" } </span>
            </button>
{ open && <div className="mt-3 text-gray-700 leading-relaxed" > { children } </div> }
</section>
  );
};

export default PolicySection;
