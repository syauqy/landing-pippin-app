import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-base-300">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-start justify-between hover:text-primary transition-colors text-left"
      >
        <span className="font-semibold text-base-content text-xl pr-4">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-base-content/60 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQAccordion({ faqData }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-base-100 rounded-3xl shadow-lg p-8 md:p-10 divide-y divide-base-300">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
