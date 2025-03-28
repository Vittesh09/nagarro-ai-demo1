import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const technologies = [
  "machine vision",
  "natural language",
  "intelligent OCR",
  "video analytics",
  "speech",
];

const domains = [
  "e-commerce",
  "aviation",
  "logistics",
  "healthcare",
  "manufacturing",
  "automotive",
  "banking",
  "other",
];

const demos = [
  {
    title: "App - Assessing refurbishment cost of vehicles using machine vision",
    description:
      "Capture car exterior data using a camera and identify defects present in the car components.",
    technologies: ["machine vision"],
    domains: ["automotive"],
    link: "https://example.com/demo1"
  },
  {
    title: "Assess room decor and recommend suitable products using machine vision",
    description:
      "Capture room interior features like color scheme and items using a camera and recommend befitting products from the catalogue.",
    technologies: ["machine vision"],
    domains: ["e-commerce"],
    link: "https://example.com/demo2"
  },
  {
    title: "Count the number of boards using machine vision",
    description:
      "Move across the warehouse pointing the camera at the target to count the number of boards in a stack or the number of packaged units.",
    technologies: ["machine vision"],
    domains: ["manufacturing"],
    link: "https://example.com/demo3"
  },
];

export default function AIDemos() {
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  const toggleFilter = (tag, type) => {
    const setter = type === "technology" ? setSelectedTechnologies : setSelectedDomains;
    const prev = type === "technology" ? selectedTechnologies : selectedDomains;

    setter(prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const clearAllFilters = () => {
    setSelectedTechnologies([]);
    setSelectedDomains([]);
  };

  const filteredDemos = demos.filter((demo) => {
    const techMatch =
      selectedTechnologies.length === 0 ||
      selectedTechnologies.every((tag) => demo.technologies.includes(tag));
    const domainMatch =
      selectedDomains.length === 0 ||
      selectedDomains.every((tag) => demo.domains.includes(tag));
    return techMatch && domainMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="relative w-full h-40 bg-neutral-900 flex items-center justify-center rounded-xl mb-6 overflow-hidden">
        <h1 className="text-white text-3xl md:text-4xl font-bold z-10">
          Nagarro AI Demo
        </h1>
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full grid grid-cols-[repeat(50,1fr)] grid-rows-[repeat(10,1fr)]">
            {Array.from({ length: 500 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-full bg-transparent animate-glowDot"
                style={{ animationDelay: `${(i % 50) * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
        <style>{\`
          @keyframes glowDot {
            0%, 100% { background-color: transparent; }
            50% { background-color: rgba(0, 255, 255, 0.1); box-shadow: 0 0 2px rgba(0, 255, 255, 0.2); }
          }
          .animate-glowDot {
            animation: glowDot 6s ease-in-out infinite;
          }
        \`}</style>
      </div>

      {(selectedTechnologies.length > 0 || selectedDomains.length > 0) && (
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium">Active Filters:</span>
          {[...selectedTechnologies, ...selectedDomains].map((tag) => (
            <span key={tag} className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
          <Button size="sm" variant="outline" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      )}

      <div className="flex gap-6">
        <div className="w-1/4 bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div>
            <h3 className="text-sm font-medium mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech) => (
                <Button
                  key={tech}
                  variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                  onClick={() => toggleFilter(tech, "technology")}
                >
                  {tech}
                </Button>
              ))}
            </div>
            <h3 className="text-sm font-medium mb-2">Domains</h3>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <Button
                  key={domain}
                  variant={selectedDomains.includes(domain) ? "default" : "outline"}
                  onClick={() => toggleFilter(domain, "domain")}
                >
                  {domain}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDemos.map((demo, index) => (
            <Card key={index} className="rounded-2xl shadow hover:shadow-lg transition">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{demo.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{demo.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...demo.technologies, ...demo.domains].map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-xs rounded-full px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  size="sm"
                  onClick={() => window.open(demo.link, "_blank")}
                >
                  View Demo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
