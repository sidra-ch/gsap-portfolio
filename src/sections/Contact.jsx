import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

// Replace these with your EmailJS credentials from https://emailjs.com
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const InputField = ({ label, name, type = "text", value, onChange, required }) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={name}
      className="text-[10px] tracking-[0.3em] uppercase font-medium text-black/50 dark:text-white/40"
    >
      {label} {required && <span className="text-gold">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-transparent border-b border-black/30 dark:border-white/15 py-2.5 text-sm font-light tracking-wide outline-none transition-colors duration-300 text-black dark:text-white placeholder:text-black/35 dark:placeholder:text-white/20 focus:border-gold"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

const Contact = () => {
  const text = `Got a question or a project idea?
    I'd love to hear from you.`;

  const marqueeItems = [
    "Available for work",
    "Full Stack Developer",
    "React · Node.js · .NET",
    "Let's build something",
    "Available for work",
    "Full Stack Developer",
    "React · Node.js · .NET",
    "Let's build something",
  ];

  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 60,
      opacity: 0,
      delay: 0.3,
      duration: 0.9,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ".social-link" },
    });
    gsap.from(".contact-form", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-white dark:bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code It"}
          title={"Contact"}
          text={text}
          textColor={"text-black dark:text-white"}
          withScrollTrigger={true}
        />

        <div className="px-10 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <div className="flex flex-col gap-10 font-light text-black dark:text-white uppercase">
            <div className="social-link">
              <h2 className="lg:text-[28px] text-[22px] leading-none">E-mail</h2>
              <div className="w-full h-px my-2 bg-black/30 dark:bg-white/30" />
              <a
                href="mailto:ms.sidrachaudhary@gmail.com"
                className="text-base tracking-wider lowercase text-gold hover:text-gold/70 transition-colors duration-200"
              >
                ms.sidrachaudhary@gmail.com
              </a>
            </div>

            <div className="social-link">
              <h2 className="lg:text-[28px] text-[22px] leading-none">Social Media</h2>
              <div className="w-full h-px my-2 bg-black/30 dark:bg-white/30" />
              <div className="flex flex-wrap gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs leading-loose tracking-widest uppercase text-black/70 dark:text-white/70 hover:text-gold transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>

            <div className="social-link normal-case">
              <h2 className="lg:text-[28px] text-[22px] leading-none uppercase">Availability</h2>
              <div className="w-full h-px my-2 bg-black/30 dark:bg-white/30" />
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-light tracking-wide normal-case text-black/70 dark:text-white/60">
                  Open to freelance & full-time opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Name" name="name" value={form.name} onChange={handleChange} required />
              <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-[10px] tracking-[0.3em] uppercase font-medium text-black/50 dark:text-white/40"
              >
                Message <span className="text-gold">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/30 dark:border-white/15 py-2.5 text-sm font-light tracking-wide outline-none resize-none transition-colors duration-300 text-black dark:text-white focus:border-gold placeholder:text-black/35 dark:placeholder:text-white/20"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="self-start mt-2 px-8 py-3 text-xs font-black tracking-[0.25em] uppercase border border-black/40 dark:border-white/20 text-black dark:text-white hover:bg-gold hover:border-gold hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-xs tracking-widest text-green-500 uppercase">
                Message sent — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs tracking-widest text-red-400 uppercase">
                Something went wrong. Please try emailing directly.
              </p>
            )}
          </form>
        </div>
      </div>

      <Marquee items={marqueeItems} className="text-black dark:text-white bg-transparent" />
    </section>
  );
};

export default Contact;
