function Contact() {
  const contactCards = [
    {
      icon: "📧",
      title: "Email Us",
      main: "support@travelai.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: "📞",
      title: "Call Us",
      main: "+91 98765 43210",
      sub: "Mon - Sat, 9AM - 6PM",
    },
    {
      icon: "📍",
      title: "Location",
      main: "Jaipur, Rajasthan",
      sub: "India 302001",
    },
    {
      icon: "💬",
      title: "Live Chat",
      main: "Available on App",
      sub: "24/7 Support",
    },
  ];

  const faqs = [
    {
      q: "How does AI Trip Planning work?",
      a: "Our AI analyzes your destination, budget, and days to create a personalized day-by-day itinerary automatically.",
    },
    {
      q: "Is Travel AI free to use?",
      a: "Yes! Basic trip planning is completely free. Premium features are available for advanced users.",
    },
    {
      q: "Can I edit my generated trip plan?",
      a: "Absolutely! You can edit, update, or delete any trip from the My Trips section anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* HERO */}
      <div
        className="relative h-[320px] bg-cover bg-center border-b border-slate-200 dark:border-slate-800"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-cyan-950/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-cyan-100 px-5 py-2 rounded-full font-bold text-sm mb-5 backdrop-blur-md">
            💬 We are here to help
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white">
            Contact Us
          </h1>

          <p className="text-slate-200 mt-4 text-lg max-w-2xl">
            Have a question, feedback, or travel planning issue? Send us a message.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12 -mt-24 relative z-20">
          {contactCards.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900
                         border border-slate-200 dark:border-slate-800
                         rounded-3xl p-6 text-center
                         shadow-lg dark:shadow-black/30
                         hover:border-cyan-500 hover:-translate-y-1
                         transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-3xl">
                {card.icon}
              </div>

              <h3 className="font-bold text-lg mt-4">{card.title}</h3>

              <p className="text-cyan-500 font-semibold mt-2">{card.main}</p>

              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {card.sub}
              </p>
            </div>
          ))}
        </div>

        {/* FORM + MAP + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* FORM */}
          <div className="bg-white dark:bg-slate-900
                          border border-slate-200 dark:border-slate-800
                          rounded-3xl p-8 shadow-lg dark:shadow-black/30">

            <h2 className="text-2xl font-bold mb-2">Send Message ✉️</h2>

            <form className="space-y-5">

              {["Full Name", "Email Address", "Subject"].map((label, i) => (
                <div key={i}>
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {label}
                  </label>

                  <input
                    type="text"
                    placeholder={label}
                    className="w-full mt-2 px-4 py-3 rounded-xl
                               bg-white dark:bg-slate-800
                               border border-slate-200 dark:border-slate-700
                               focus:border-cyan-500 outline-none
                               transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full mt-2 px-4 py-3 rounded-xl
                             bg-white dark:bg-slate-800
                             border border-slate-200 dark:border-slate-700
                             focus:border-cyan-500 outline-none"
                />
              </div>

              <button
                type="button"
                className="w-full py-4 rounded-xl font-bold text-white
                           bg-gradient-to-r from-cyan-500 to-blue-500
                           hover:scale-[1.02] transition-all"
              >
                Send Message 🚀
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQs ❓</h2>

            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900
                           border border-slate-200 dark:border-slate-800
                           rounded-2xl p-4"
              >
                <p className="font-bold text-cyan-500">Q: {faq.q}</p>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  A: {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER SOCIAL */}
        <div className="bg-slate-100 dark:bg-slate-900
                        border border-slate-200 dark:border-slate-800
                        rounded-3xl p-8 text-center">

          <h2 className="text-2xl font-bold">Follow Us 🌐</h2>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            {["Twitter", "Instagram", "LinkedIn", "GitHub"].map((s, i) => (
              <button
                key={i}
                className="px-6 py-3 rounded-xl font-semibold
                           bg-white dark:bg-slate-800
                           border border-slate-200 dark:border-slate-700
                           hover:scale-105 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;