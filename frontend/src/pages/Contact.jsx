import { useState } from "react";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields!");
      return;
    }
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      value: "support@travelai.com",
      sub: "We reply within 24 hours"
    },
    {
      icon: "📞",
      title: "Call Us",
      value: "+91 98765 43210",
      sub: "Mon - Sat, 9AM - 6PM"
    },
    {
      icon: "📍",
      title: "Location",
      value: "Jaipur, Rajasthan",
      sub: "India 302001"
    },
    {
      icon: "💬",
      title: "Live Chat",
      value: "Available on App",
      sub: "24/7 Support"
    }
  ];

  const faqs = [
    {
      q: "How does AI Trip Planning work?",
      a: "Our AI analyzes your destination, budget, and days to create a personalized day-by-day itinerary automatically."
    },
    {
      q: "Is Travel AI free to use?",
      a: "Yes! Basic trip planning is completely free. Premium features are available for advanced users."
    },
    {
      q: "Can I edit my generated trip plan?",
      a: "Absolutely! You can edit, update, or delete any trip from the My Trips section anytime."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071120] 
                    via-[#0a1b3d] to-[#09152a] text-white">

      {/* HERO */}
      <div className="relative h-[250px] bg-cover bg-center"
           style={{
             backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80')"
           }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center 
                        justify-center h-full text-center px-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 
                         to-cyan-400 bg-clip-text text-transparent">
            Contact Us 📞
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* CONTACT INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((info, i) => (
            <div key={i}
                 className="bg-white/10 backdrop-blur-lg rounded-2xl p-6
                            border border-white/10 text-center
                            hover:border-blue-500/50 hover:scale-105
                            transition-all duration-300">
              <span className="text-4xl">{info.icon}</span>
              <h3 className="text-lg font-bold mt-3">{info.title}</h3>
              <p className="text-blue-400 font-medium mt-1">{info.value}</p>
              <p className="text-gray-400 text-sm mt-1">{info.sub}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">

          {/* CONTACT FORM */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8
                          border border-white/10">

            <h2 className="text-2xl font-bold mb-6">
              Send Us a Message ✉️
            </h2>

            {submitted ? (
              // SUCCESS MESSAGE
              <div className="flex flex-col items-center justify-center 
                              py-16 text-center">
                <span className="text-7xl">✅</span>
                <h3 className="text-2xl font-bold mt-4">Message Sent!</h3>
                <p className="text-gray-400 mt-2">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 
                             px-6 py-2 rounded-xl font-medium transition-all">
                  Send Another
                </button>
              </div>
            ) : (
              // FORM
              <div className="space-y-4">

                {/* NAME */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-white/10 border border-white/10
                               rounded-xl px-4 py-3 outline-none
                               focus:border-blue-500 transition-all
                               placeholder-gray-500"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/10
                               rounded-xl px-4 py-3 outline-none
                               focus:border-blue-500 transition-all
                               placeholder-gray-500"
                  />
                </div>

                {/* SUBJECT */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full bg-white/10 border border-white/10
                               rounded-xl px-4 py-3 outline-none
                               focus:border-blue-500 transition-all
                               placeholder-gray-500"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    className="w-full bg-white/10 border border-white/10
                               rounded-xl px-4 py-3 outline-none
                               focus:border-blue-500 transition-all
                               placeholder-gray-500 resize-none"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-500 hover:bg-blue-600
                             py-3 rounded-xl font-bold transition-all
                             hover:shadow-lg hover:shadow-blue-500/30">
                  Send Message 🚀
                </button>

              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* MAP */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl 
                            border border-white/10 overflow-hidden h-64">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.38280654!2d75.65046970000001!3d26.8853548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4b15077f%3A0x45e325a28f7e44c3!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

            {/* FAQ */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6
                            border border-white/10">
              <h2 className="text-xl font-bold mb-5">
                Frequently Asked Questions ❓
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i}
                       className="bg-white/5 rounded-2xl p-4
                                  border border-white/10">
                    <p className="font-semibold text-blue-300">
                      Q: {faq.q}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      A: {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30
                        rounded-3xl p-8 text-center border border-blue-500/20">
          <h2 className="text-2xl font-bold">Follow Us 🌐</h2>
          <p className="text-gray-400 mt-2">
            Stay connected on social media
          </p>
          <div className="flex justify-center gap-4 mt-6">
            {[
              { label: "Twitter", icon: "🐦" },
              { label: "Instagram", icon: "📸" },
              { label: "LinkedIn", icon: "💼" },
              { label: "GitHub", icon: "💻" }
            ].map((s, i) => (
              <button key={i}
                      className="bg-white/10 hover:bg-blue-500
                                 px-5 py-2 rounded-xl font-medium
                                 transition-all hover:scale-105
                                 flex items-center gap-2">
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;