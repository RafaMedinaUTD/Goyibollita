import React from 'react';
import Header from '../components/Header';

const faqs = [
  {
    question: "What are your shipping options?",
    answer: "We offer Standard (5-7 business days), Expedited (2-3 business days), and International shipping. Rates are calculated at checkout based on your location and order size."
  },
  {
    question: "How long does it take to create a custom order?",
    answer: "Custom plushies and figurines are made-to-order. Production time is typically 2-4 weeks before the item is shipped. This can vary depending on complexity and our current order queue."
  },
  {
    question: "Can I track my order?",
    answer: "Yes! Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website to monitor your package's journey."
  },
  {
    question: "Do you ship internationally?",
    answer: "Absolutely! We ship to most countries worldwide. Please be aware that international customers are responsible for any customs fees, import duties, or taxes imposed by their country."
  },
  {
    question: "What if my order arrives damaged?",
    answer: "We pack every order with extreme care, but if your item arrives damaged, please contact us within 48 hours of delivery with photos of the product and packaging. We will work with you to find a solution, which may include a replacement or a refund."
  }
];

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div className="py-6">
        <dt className="text-lg font-semibold text-slate-900 dark:text-white">{question}</dt>
        <dd className="mt-2 text-base text-slate-600 dark:text-slate-400">{answer}</dd>
    </div>
);

const FaqPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-slate-900 dark:text-white">Shipping FAQ</h1>
            <p className="text-center text-lg text-slate-500 dark:text-slate-400 mb-12">
                Everything you need to know about getting your custom creations.
            </p>
            <dl className="divide-y divide-slate-200 dark:divide-slate-700">
                {faqs.map((faq, index) => <FaqItem key={index} question={faq.question} answer={faq.answer} />)}
            </dl>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
