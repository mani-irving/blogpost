import React from "react";
import { Lightbulb, Users, Code, Sparkles } from "lucide-react";

const cardData = [
  {
    title: "Our Mission",
    icon: <Lightbulb className="text-yellow-500 w-6 h-6" />,
    description:
      "Empowering developers and designers with a space to learn, grow, and express themselves.",
  },
  {
    title: "Our Community",
    icon: <Users className="text-blue-500 w-6 h-6" />,
    description:
      "A global network of creatives building projects, sharing knowledge, and supporting each other.",
  },
  {
    title: "Built for Developers",
    icon: <Code className="text-green-500 w-6 h-6" />,
    description:
      "Clean UI, fast performance, and modern tools like React, Framer Motion, and Tailwind CSS.",
  },
  {
    title: "Open & Creative",
    icon: <Sparkles className="text-purple-500 w-6 h-6" />,
    description:
      "Write freely, explore ideas, and teach something new. This is your space.",
  },
];

export default function About() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="https://i.pinimg.com/1200x/5c/56/32/5c563274dc0d04985d23f7d4ac0905ed.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white/40">
            About Us
          </h1>
          <p className="text-lg mt-4 text-gray-200/40">
            Who we are, what we do & why it matters.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cardData.map(({ title, icon, description }) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20
              text-white hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                {icon}
                <h3 className="text-xl font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-gray-200">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
