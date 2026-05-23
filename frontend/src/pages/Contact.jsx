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
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO WITH IMAGE */}
      <div
        className="relative h-[320px] bg-cover bg-center border-b border-slate-200"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/65 to-cyan-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_35%)]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-cyan-100 px-5 py-2 rounded-full font-bold text-sm mb-5 backdrop-blur-md">
            💬 We are here to help
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-lg">
            Contact Us
          </h1>

          <p className="text-slate-200 mt-4 text-lg max-w-2xl">
            Have a question, feedback, or travel planning issue? Send us a
            message and our team will help you quickly.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* CONTACT INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12 -mt-24 relative z-20">
          {contactCards.map((card, i) => (
            <div
              key={i}
              className="bg-white
                         border border-slate-200 rounded-3xl p-6 text-center
                         shadow-[0_18px_45px_rgba(15,23,42,0.16)]
                         hover:shadow-[0_22px_55px_rgba(59,130,246,0.20)]
                         hover:border-blue-400 hover:-translate-y-1
                         transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-4xl shadow-inner">
                {card.icon}
              </div>

              <h3 className="font-bold text-lg mt-4 text-slate-900">
                {card.title}
              </h3>

              <p className="text-blue-500 font-semibold mt-2">{card.main}</p>

              <p className="text-slate-500 text-sm mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* FORM + MAP + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* FORM */}
          <div
            className="bg-gradient-to-br from-white to-slate-50
                       rounded-3xl p-8 border border-slate-200
                       shadow-[0_14px_40px_rgba(15,23,42,0.12)]"
          >
            <h2 className="text-2xl font-bold mb-2 text-slate-900">
              Send Us a Message ✉️
            </h2>

            <p className="text-slate-500 mb-6">
              Fill the form below and we’ll get back to you soon.
            </p>

            <form className="space-y-5">
              <div>
                <label className="text-sm text-slate-600 font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full mt-2 bg-white border border-slate-200
                             rounded-xl px-4 py-3 outline-none
                             focus:border-blue-500 text-slate-900
                             placeholder-slate-400
                             shadow-[0_6px_18px_rgba(15,23,42,0.06)]
                             focus:shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full mt-2 bg-white border border-slate-200
                             rounded-xl px-4 py-3 outline-none
                             focus:border-blue-500 text-slate-900
                             placeholder-slate-400
                             shadow-[0_6px_18px_rgba(15,23,42,0.06)]
                             focus:shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 font-semibold">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full mt-2 bg-white border border-slate-200
                             rounded-xl px-4 py-3 outline-none
                             focus:border-blue-500 text-slate-900
                             placeholder-slate-400
                             shadow-[0_6px_18px_rgba(15,23,42,0.06)]
                             focus:shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 font-semibold">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full mt-2 bg-white border border-slate-200
                             rounded-xl px-4 py-3 outline-none resize-none
                             focus:border-blue-500 text-slate-900
                             placeholder-slate-400
                             shadow-[0_6px_18px_rgba(15,23,42,0.06)]
                             focus:shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500
                           hover:from-cyan-600 hover:to-blue-600
                           py-4 rounded-xl font-bold text-white
                           transition-all hover:scale-[1.02]
                           shadow-[0_12px_28px_rgba(59,130,246,0.28)]"
              >
                Send Message 🚀
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* MAP */}
            <div
              className="bg-gradient-to-br from-white to-slate-50
                         rounded-3xl p-5 border border-slate-200
                         shadow-[0_14px_40px_rgba(15,23,42,0.12)]"
            >
              <iframe
                title="Jaipur Map"
                src="https://www.google.com/maps?q=Jaipur,Rajasthan,India&output=embed"
                className="w-full h-[260px] rounded-2xl border border-slate-200
                           shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                loading="lazy"
              ></iframe>
            </div>

            {/* FAQ */}
            <div
              className="bg-gradient-to-br from-white to-slate-50
                         rounded-3xl p-6 border border-slate-200
                         shadow-[0_14px_40px_rgba(15,23,42,0.12)]"
            >
              <h2 className="text-2xl font-bold mb-5 text-slate-900">
                Frequently Asked Questions ❓
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4
                               border border-slate-200
                               shadow-[0_8px_24px_rgba(15,23,42,0.08)]
                               hover:shadow-[0_14px_35px_rgba(59,130,246,0.16)]
                               hover:border-blue-300 transition-all"
                  >
                    <p className="font-bold text-blue-500">Q: {faq.q}</p>

                    <p className="text-slate-600 mt-2">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOLLOW US */}
        <div
          className="bg-gradient-to-r from-blue-50 to-cyan-50
                     rounded-3xl p-8 text-center border border-blue-100
                     shadow-[0_16px_45px_rgba(14,165,233,0.18)]"
        >
          <h2 className="text-2xl font-bold text-slate-900">
            Follow Us 🌐
          </h2>

          <p className="text-slate-500 mt-2">Stay connected on social media</p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {["🐦 Twitter", "📸 Instagram", "💼 LinkedIn", "💻 GitHub"].map(
              (social, i) => (
                <button
                  key={i}
                  className="bg-white hover:bg-slate-50
                             border border-slate-200
                             px-6 py-3 rounded-xl font-semibold
                             text-slate-700 transition-all hover:scale-105
                             shadow-[0_8px_22px_rgba(15,23,42,0.08)]
                             hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)]"
                >
                  {social}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;