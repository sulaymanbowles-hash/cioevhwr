import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Ordering & Quotes",
      questions: [
        {
          q: "How do I request a quote?",
          a: "You can request a quote through our online catalog by adding items to your RFQ cart and submitting the form, or by contacting our sales team directly via phone or email. We respond to all quote requests within 24 hours."
        },
        {
          q: "What information do I need to provide for a quote?",
          a: "We'll need the part number(s), quantity required, and your delivery timeline. Additional information like company name, shipping address, and any special requirements helps us provide the most accurate quote."
        },
        {
          q: "Do you offer volume discounts?",
          a: "Yes, we offer competitive pricing for volume orders. Contact our sales team with your requirements for a custom quote tailored to your needs."
        },
        {
          q: "What are your minimum order quantities?",
          a: "We have no minimum order quantity. Whether you need 1 piece or 10,000, we're here to help."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "What are your typical lead times?",
          a: "For in-stock items, we ship within 24-48 hours. Custom or made-to-order items typically have 2-4 week lead times, but we'll provide specific timelines with your quote."
        },
        {
          q: "Do you offer expedited shipping?",
          a: "Yes, we offer same-day shipping for time-critical orders and AOG situations. Contact our 24/7 AOG hotline for immediate assistance."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship worldwide. We handle all export documentation and comply with ITAR and EAR regulations for controlled items."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive tracking information via email. You can also contact customer service for order status updates."
        }
      ]
    },
    {
      category: "Quality & Certifications",
      questions: [
        {
          q: "What certifications do you hold?",
          a: "We are AS9120B and ISO 9001:2015 certified. We're also ITAR registered and maintain full compliance with all applicable aerospace quality standards."
        },
        {
          q: "Do you provide certificates of conformance?",
          a: "Yes, every shipment includes a Certificate of Conformance (C of C). We can also provide Material Test Reports (MTR), FAIR documentation, and other quality documents upon request."
        },
        {
          q: "How do you ensure material traceability?",
          a: "We maintain complete chain of custody documentation from original manufacturer to end user. Every component is traceable through batch/lot numbers and accompanying certifications."
        },
        {
          q: "Are all products new/genuine?",
          a: "Yes, we only sell new, genuine OEM parts from authorized manufacturers. We never deal in surplus, used, or counterfeit materials."
        }
      ]
    },
    {
      category: "Products & Inventory",
      questions: [
        {
          q: "How large is your inventory?",
          a: "We stock over 150,000 active SKUs covering fasteners, fittings, pins, hardware, and related aerospace components."
        },
        {
          q: "Can you source hard-to-find parts?",
          a: "Yes, our sourcing team has extensive industry connections and can locate obsolete or hard-to-find components. Contact us with your requirements."
        },
        {
          q: "Do you offer engineering support?",
          a: "Yes, our technical team can assist with part selection, alternative recommendations, and application guidance."
        },
        {
          q: "What manufacturers do you represent?",
          a: "We're authorized distributors for major aerospace fastener manufacturers including Arconic, PCC Fasteners, Lisi Aerospace, SPS Technologies, and many others."
        }
      ]
    },
    {
      category: "Payment & Terms",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept wire transfers, ACH, checks, and major credit cards. Net terms are available for qualified customers."
        },
        {
          q: "How do I apply for credit terms?",
          a: "Contact our credit department to request a credit application. Approval typically takes 2-3 business days."
        },
        {
          q: "Do you accept government purchase orders?",
          a: "Yes, we're experienced with federal, state, and military procurement processes. We're registered in SAM and comply with all government contracting requirements."
        },
        {
          q: "What is your return policy?",
          a: "Returns of unused, unaltered stock items are accepted within 30 days with a 15% restocking fee. Custom or special order items are non-returnable."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="py-24 px-6 md:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <TechLabel className="mb-6">Support</TechLabel>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Find answers to common questions about our products, services, and processes.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No results found. Try different keywords.
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFaqs.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-6 pb-4 border-b-2 border-black">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = catIndex * 100 + faqIndex;
                      const isOpen = openIndex === globalIndex;
                      
                      return (
                        <div
                          key={faqIndex}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-lg pr-4">{faq.q}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black text-white rounded-2xl p-12 text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
            <p className="text-gray-400 mb-8 text-lg">
              Our team is here to help. Contact us directly for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded inline-block"
              >
                Contact Support
              </a>
              <a
                href="tel:+1-903-723-0693"
                className="border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded inline-block"
              >
                Call: (903) 723-0693
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
