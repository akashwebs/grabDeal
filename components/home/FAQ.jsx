'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "How does GrabDeal work?",
    answer:
      "GrabDeal কোনো product sell করে না। আমরা শুধু কোথায় discount চলছে, offer details, expiry time এবং shop link দেখাই।",
  },
  {
    question: "Are the offers verified?",
    answer:
      "Yes. প্রতিটি offer card-এ verified badge থাকবে, যাতে user সহজে বুঝতে পারে information checked করা হয়েছে।",
  },
  {
    question: "Does GrabDeal sell products directly?",
    answer:
      "No. User GrabDeal থেকে information দেখে original brand/shop website বা store থেকে product purchase করবে।",
  },
  {
    question: "What does online or offline offer mean?",
    answer:
      "Online offer মানে website/app থেকে পাওয়া যাবে। Offline offer মানে physical store বা showroom-এ পাওয়া যাবে।",
  },
  {
    question: "What happens when an offer expires?",
    answer:
      "Expired offer automatically remove বা hide হয়ে যাবে, যাতে users outdated discount information না দেখে।",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <div className="grid gap-8 rounded-3xl bg-purple-50 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
            Need Help?
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#16013d]">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-gray-600">
            GrabDeal ব্যবহার করার আগে common questions গুলোর answer দেখে নিন।
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-[#16013d]"
              >
                <span>{faq.question}</span>

                <span className="text-2xl font-black text-purple-700">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-purple-100 px-5 pb-5 text-sm leading-7 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}