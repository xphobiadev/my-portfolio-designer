import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/data";

export default async function Home() {
  const projects = await getProjects();
  return (
    <>
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-900 via-obsidian-900/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent z-10" />
          {/* Replace with actual portrait from Supabase when ready */}
          <div className="w-full h-full bg-obsidian-800 absolute right-0" />
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold-400/10 blur-[120px] rounded-full z-10" />
        </div>

        <div className="container mx-auto px-6 md:px-12 z-20 mt-12">
          <span className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4 block font-medium">
            Mohamed Bouliani
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase leading-[0.9] tracking-tight mb-6">
            I Design <br />
            <span className="text-gold-400">Experiences</span> <br />
            That Tell Stories
          </h1>
          <p className="text-gray-400 max-w-xl text-lg font-light mb-10">
            Designer. Photographer. Videographer. Audio Engineer. <br />
            Building powerful brands and immersive experiences.
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
          >
            Explore My Work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full border-y border-white/5 bg-obsidian-900/50 relative z-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-heading text-gold-400 mb-2">10+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Years<br />Experience</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-heading text-gold-400 mb-2">120+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Projects<br />Completed</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-heading text-gold-400 mb-2">15+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Awards<br />Received</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-heading text-gold-400 mb-2">50+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Happy<br />Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm tracking-[0.3em] text-gold-400 uppercase mb-3">Selected Work</h2>
            <p className="text-3xl md:text-5xl font-heading font-bold uppercase">Featured Projects</p>
          </div>
          <Link href="/work" className="text-sm uppercase tracking-widest text-gray-400 hover:text-gold-400 transition-colors hidden md:block">
            View All Work &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project: any) => (
            <Link href={`/work/${project.slug}`} key={project.id} className="group block relative aspect-[4/3] rounded-2xl overflow-hidden glass hover:-translate-y-1 transition-all duration-500 bg-obsidian-800">
              {/* Optional: Add actual Image here using next/image with project.cover_image */}
              <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors z-10" />
              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-obsidian-900 via-obsidian-900/80 to-transparent z-20">
                <p className="text-gold-400 text-[10px] tracking-widest uppercase mb-1 drop-shadow-md">{project.category}</p>
                <h3 className="text-xl font-heading font-medium text-white mb-2 drop-shadow-md">{project.title}</h3>
                <p className="text-xs text-gray-300 drop-shadow-md">{project.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-obsidian-900/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-gold-400/5 to-transparent blur-3xl z-0" />
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-sm tracking-[0.3em] text-gold-400 uppercase mb-3">Expertise</h2>
            <p className="text-3xl md:text-5xl font-heading font-bold uppercase leading-tight mb-6">
              A Multidisciplinary <br /> Approach
            </p>
            <p className="text-gray-400 mb-8 max-w-lg leading-relaxed font-light">
              Combining strategy, cinematic design, and high-performance technology to craft seamless digital experiences that elevate brands and deeply engage audiences.
            </p>
            <Link href="/about" className="text-xs inline-flex items-center gap-3 tracking-[0.2em] uppercase text-white hover:text-gold-400 transition-colors">
              Learn more about me <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            {[
              { title: "Design & UI/UX", desc: "Award-winning interfaces that captivate users and enforce brand identity." },
              { title: "Photography & Video", desc: "Cinematic visual storytelling, tailored for premium platforms." },
              { title: "Audio Engineering", desc: "Immersive soundscapes and high-fidelity production." },
              { title: "Full-Stack Development", desc: "Next.js applications with seamless, high-performance architectures." }
            ].map((srv, i) => (
              <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-gold-400/30 transition-all duration-300">
                <h3 className="text-lg font-heading tracking-wide text-white mb-2">{srv.title}</h3>
                <p className="text-sm font-light text-gray-400">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
