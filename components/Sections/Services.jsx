'use client';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';


const Images = [
  { src: "/home.jpg", alt: "Kitchen Renovation", label: "Kitchen", icon: "🧱" },
  { src: "/painting.jpg", alt: "Painting Services", label: "Painting", icon: "🎨" },
  { src: "/bathroom.jpg", alt: "Bathroom Renovation", label: "Bathroom", icon: "🪟" },
  { src: "/flooring.jpg", alt: "Flooring Services", label: "Flooring", icon: "🌳" },
  { src: "/home2.jpg", alt: "Insulation Services", label: "Insulation", icon: "🛡" },
];
const Services = ({ t }) => {
  if (!t || !t.services) return null;
  const { services } = t;
  const [openIndex, setOpenIndex] = useState(null);

  // اختر شكل الكارت: 'modern' | 'classic' | 'sideCard'
  const cardStyle = 'modern'; // غيّر هذه القيمة لتجربة الأنماط المختلفة

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // أنماط الكارت
  const getCardClass = (idx) => {
    switch (cardStyle) {
      case 'classic':
        return `group bg-white/95 rounded-2xl shadow border border-slate-200 p-0 flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden w-full`;
      case 'sideCard':
        return `group bg-gradient-to-r from-blue-50 to-indigo-100 rounded-3xl shadow-md border border-blue-200 p-0 flex flex-col md:flex-row items-stretch transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer overflow-hidden w-full`;
      case 'modern':
      default:
        return `group bg-white/90 backdrop-blur-lg rounded-3xl shadow-md border border-slate-200 p-0 flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden w-full`;
    }
  };

  const getImageClass = (idx) => {
    switch (cardStyle) {
      case 'classic':
        return 'w-full h-64 object-cover md:w-1/2 md:h-auto rounded-2xl md:rounded-none md:rounded-r-2xl md:rounded-l-none transition-all duration-300 group-hover:scale-105';
      case 'sideCard':
        return 'w-full h-56 object-cover md:w-1/2 md:h-full rounded-2xl md:rounded-none md:rounded-r-3xl md:rounded-l-none m-0 shadow-md border border-blue-100';
      case 'modern':
      default:
        return 'w-full h-72 object-cover md:w-1/2 md:h-full rounded-3xl md:rounded-none md:rounded-r-3xl md:rounded-l-none transition-all duration-300 group-hover:scale-105';
    }
  };

  const getContentClass = (idx) => {
    switch (cardStyle) {
      case 'classic':
        return 'flex-1 flex flex-col justify-center items-center text-center gap-3 p-7 md:p-9';
      case 'sideCard':
        return 'flex-1 flex flex-col justify-center items-center text-center gap-4 p-6 md:p-10';
      case 'modern':
      default:
        return 'flex-1 flex flex-col justify-center items-center text-center gap-4 p-8 md:p-10';
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 mt-10 via-blue-50 to-indigo-50 py-16 px-4">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[320px] md:h-[500px] flex items-center justify-center mb-16 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/home.jpg')" }}></div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <div className="bg-white/10 backdrop-blur-md  w-[800px] h-[150px] rounded-2xl p-6 md:p-8 border border-white/30 shadow-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 mb-4 text-center drop-shadow-lg">
              {services.title}

            </h2>
            <div className="text-gray-300  text-2xl font-bold text-center mt-2">
              {services?.Home} &nbsp; / &nbsp; {services?.title}
              </div>
           
          </div>
        </div>
      </div>

      <div className="w-full">

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-10">
          {services.items.map((service, idx) => (
            <div
              key={idx}
              className={`group bg-white rounded-3xl shadow-lg border border-slate-100 flex flex-col md:${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-stretch transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
              style={{ minHeight: '340px' }}
            >
              {/* الصورة */}
              <div className="md:w-1/2 h-60 md:h-auto flex items-stretch justify-stretch p-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                <img
                  src={Images[idx]?.src}
                  alt={Images[idx]?.alt}
                  className="w-full h-full object-cover rounded-none md:rounded-l-3xl md:rounded-tr-none shadow"
                  style={{ minHeight: '100%', minWidth: '100%' }}
                />
              </div>
              {/* النصوص */}
              <div className="flex-1 flex flex-col justify-center p-8 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{Images[idx]?.icon}</span>
                  <h3 className="text-2xl font-bold text-main">{service.title}</h3>
                </div>
                {(idx === 0 || idx === 1) ? (
                  <div className="text-dark/80 text-base md:text-lg leading-relaxed mb-4">
                    <p>{service.descriptionIntro}</p>
                    <ul className="list-disc pl-6 my-2">
                      {service.bullets && service.bullets.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <p>{service.descriptionOutro}</p>
                  </div>
                ) : (
                  <p className="text-dark/80 text-base md:text-lg leading-relaxed">{service.description}</p>
                )}
                {service.longDescription && idx !== 0 && (
                  <div className="text-dark/70 text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {service.longDescription}
                  </div>
                )}
                <a
                  href={`/${t.locale || 'fr'}/services/${service.id}`}
                  className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 px-7 rounded-lg shadow hover:from-blue-700 hover:to-indigo-600 transition-all mt-4"
                >
                  {t.quoteButton}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-main to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {services.needCustomService}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {services.teamReadyToHelp}
            </p>
            <Link href={`/${t.locale || 'fr'}/contact`}>
              <button className="bg-white cursor-pointer hover:bg-gray-300 hover:text-white text-main font-bold py-3 px-8 rounded-xl transition-colors">
                {services.contactUs}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
