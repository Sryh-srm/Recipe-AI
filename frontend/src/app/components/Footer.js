import Link from "next/link";
import LogoIcon from "@/app/components/LogoIcon";

const FOOTER_LINKS = {
  "Built With": ["Next.js", "FastAPI", "Elasticsearch", "Gemini", "Groq", "Tailwind CSS"],
  Project: ["GitHub Repository"],
  "Built for": ["GDG Cloud Buildathon", "Elastic Ecosystem"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 mt-auto border-t border-white/[0.06]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-5">
            <Link
              href="/"
              id="footer-logo"
              className="flex items-center gap-2.5"
              aria-label="Recipe AI home"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] shadow-md shadow-[#7C3AED]/20">
                <LogoIcon />
              </span>
              <span className="text-lg font-bold text-white">
                Recipe <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto sm:mx-0">
              AI-powered semantic recipe search — discover, cook, and enjoy
              meals tailored to you.
            </p>
            {/* Social links */}
            <div className="flex items-center justify-center sm:justify-start gap-4">
              {[
                {
                  label: "Twitter",
                  href: "#",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25z",
                },
                {
                  label: "GitHub",
                  href: "#",
                  path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z",
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  id={`footer-social-${label.toLowerCase()}`}
                  aria-label={`Recipe AI on ${label}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.07] text-slate-500 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      id={`footer-link-${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-600">
            &copy; {year} Recipe AI. Made by Suryansh Sharma.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 flex-wrap">
            {["GitHub", "LinkedIn", "Portfolio"].map((item) => (
              <a
                key={item}
                href="#"
                id={`footer-legal-${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
