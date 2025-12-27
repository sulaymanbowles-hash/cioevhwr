import { motion } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { GridBackground } from "../components/ui/GridBackground";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white relative overflow-hidden">
      <GridBackground pattern="lines" opacity={0.03} />
      
      <section className="px-6 md:px-8 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-12"
            >
              <TechLabel className="mb-6">Contact Us</TechLabel>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8 text-gray-900">
                Get in Touch With <br />
                <span className="text-gray-400">Our Team</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-12">
                Our team in Palestine, Texas is ready to assist with your aerospace fastener needs. 
                Whether you need a quote, technical data, or order status, we're here to help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center group-hover:border-black transition-colors bg-gray-50">
                    <Phone className="w-5 h-5 text-gray-600 group-hover:text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-gray-500 text-sm mb-2">Mon-Fri, 8am - 5pm CST</p>
                    <a href="tel:9037230693" className="text-xl font-mono font-bold hover:text-orange-600 transition-colors">
                      (903) 723-0693
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center group-hover:border-black transition-colors bg-gray-50">
                    <Mail className="w-5 h-5 text-gray-600 group-hover:text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-500 text-sm mb-2">Sales & General Inquiries</p>
                    <a href="mailto:sales@afastinc.com" className="text-xl font-mono font-bold hover:text-orange-600 transition-colors">
                      sales@afastinc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center group-hover:border-black transition-colors bg-gray-50">
                    <MapPin className="w-5 h-5 text-gray-600 group-hover:text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Location</h3>
                    <p className="text-gray-500 text-sm mb-2">Headquarters & Distribution Center</p>
                    <address className="not-italic font-mono text-base text-gray-900">
                      255 N US 287<br />
                      Palestine, TX 75803
                    </address>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pt-12"
            >
              <TechnicalBorder className="bg-white p-8 md:p-10 shadow-xl relative">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                  <p className="text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
                </div>
                
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-20 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent</h3>
                    <p className="text-gray-600">Thank you for contacting Aerospace Fasteners Inc.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-black focus:bg-white focus:outline-none transition-all font-mono text-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-black focus:bg-white focus:outline-none transition-all font-mono text-sm"
                          placeholder="email@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-black focus:bg-white focus:outline-none transition-all font-mono text-sm"
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-black focus:bg-white focus:outline-none transition-all font-mono text-sm"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-black focus:bg-white focus:outline-none transition-all resize-none font-mono text-sm"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </TechnicalBorder>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
