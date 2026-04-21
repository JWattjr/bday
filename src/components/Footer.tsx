import { config } from "../siteConfig";

export const Footer = () => {
  return (
    <footer className="py-24 px-6 relative z-10 text-center">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <h2 className="text-3xl md:text-5xl font-serif text-white/90 leading-tight">
          {config.closingLine}
        </h2>
        
        <div className="text-rose/50 font-sans text-sm tracking-widest uppercase">
          Made with <span className="text-rose animate-pulse inline-block">♥</span> for {config.name.split(' ')[0]}
        </div>
      </div>
    </footer>
  );
};
