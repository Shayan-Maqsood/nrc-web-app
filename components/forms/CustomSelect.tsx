"use client";

import { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  id?: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input to pass value during standard HTML form submission */}
      <input type="hidden" id={id} name={name} value={value} required={required} />

      {/* Main Select Button Box */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full min-h-[52px] bg-[#060810] hover:bg-[rgba(232,79,14,0.05)] border border-[rgba(232,79,14,0.2)] px-4 py-3 md:px-5 md:py-4 text-base flex items-center justify-between focus:outline-none focus:border-[#E84F0E] focus:ring-1 focus:ring-[#E84F0E] transition-all duration-300 rounded-none ${
          !value ? "text-gray-500" : "text-white"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        
        {/* Animated Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E84F0E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Menu Popup Container */}
      {isOpen && (
        <div className="absolute z-50 left-0 top-[calc(100%+4px)] w-full bg-[#060810] border border-[rgba(232,79,14,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-none max-h-60 overflow-y-auto">
          {options.map((option: string) => (
            <div
              key={option}
              onClick={() => {
                onChange(name, option);
                setIsOpen(false);
              }}
              className="px-4 py-3 md:px-5 md:py-3.5 text-sm text-gray-300 hover:bg-[#E84F0E] hover:text-white cursor-pointer transition-colors duration-150 rounded-none border-b border-[rgba(232,79,14,0.08)] last:border-none"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}