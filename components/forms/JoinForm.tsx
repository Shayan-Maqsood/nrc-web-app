"use client";

import { useState } from "react";
import { submitForm } from "@/lib/forms/submit";
import { CustomSelect } from "./CustomSelect";

interface JoinFormProps {
  type: "executive" | "volunteer";
  roleId?: string;
  roleTitle?: string;
}

const DEPARTMENTS: string[] = [
  "SMME",
  "SEECS",
  "SCME",
  "SCEE",
  "NICE",
  "IESE",
  "IGIS",
  "SINES",
  "SNS",
  "ASAB",
  "S3H",
  "NBS",
  "SADA",
  "NSHS",
  "USPCAS-E"
];

// Replace these dummy roles with your actual executive roles when ready
const EXECUTIVE_ROLES = [
  "Human Resources", "Technical", "Event Mangement", "Sponsorships", "External Relations", "Marketing", "Registrations", "Finance", "Logistics", "Decor", "Social Media Marketing", "Media", "Graphics", "Administration"
];

export function JoinForm({ type, roleId, roleTitle }: JoinFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    studentId: "",
    batch: "",
    department: "",
    role: roleId ?? "",
    motivation: "",
    experience: "",
    portfolio: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitForm(`join-${type}`, { ...form, type });
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.message);
    }
  };

  const handleCustomSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass =
    "w-full min-h-[52px] bg-[rgba(232,79,14,0.02)] hover:bg-[rgba(232,79,14,0.05)] border border-[rgba(232,79,14,0.2)] text-white placeholder:text-[#6B7285] px-4 py-3 md:px-5 md:py-4 text-base focus:outline-none focus:border-[#E84F0E] focus:ring-1 focus:ring-[#E84F0E] transition-all duration-300 rounded-none";

  // Dropdown select class with custom orange chevron icon
  const selectClass =
    `${inputClass} appearance-none cursor-pointer bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em_1em]` +
    ` bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23E84F0E%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]`;

  const label = (text: string, required = false) => (
    <span className="flex items-center font-mono text-[11px] tracking-[0.25em] text-[#9AA0B2] uppercase my-2!">
      {text}{required && <span className="text-[#E84F0E] ml-1.5 text-sm leading-none">*</span>}
    </span>
  );

  if (status === "success") {
    return (
      <div className="border border-[rgba(232,79,14,0.3)] p-12 text-center">
        <div className="font-display font-black text-[#E84F0E] text-3xl mb-3">APPLICATION RECEIVED</div>
        <p className="text-[#9AA0B2] text-sm">
          We&apos;ve received your application{roleTitle ? ` for ${roleTitle}` : ""}. Our HR team will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      {/* Name & Email */}
      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          {label("Full Name", true)}
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your full name"
            autoComplete="name"
          />
        </div>
        <div>
          {label("Email", true)}
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div>
        {label("Phone Number", true)}
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
          placeholder="+92 300 0000000"
          autoComplete="tel"
        />
      </div>

      {/* Student ID, Batch, & Department Dropdown */}
      <div className="grid sm:grid-cols-3 gap-8">
        <div>
          {label("Student ID", true)}
          <input
            id="studentId"
            name="studentId"
            type="text"
            required
            value={form.studentId}
            onChange={handleChange}
            className={inputClass}
            placeholder="XXXXXXXXXX"
          />
        </div>
        <div>
          {label("Batch")}
          <input
            id="batch"
            name="batch"
            type="text"
            value={form.batch}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. 2024"
          />
        </div>
        <div>
          {label("Department / School", true)}
          <CustomSelect
            id="department"
            name="department"
            value={form.department}
            onChange={handleCustomSelectChange}
            options={DEPARTMENTS}
            placeholder="Select Department"
            required
          />
        </div>
      </div>

      {/* Role Dropdown (Executive Only) */}
      {type === "executive" && (
        <div>
          {label("Role Applying For", true)}
          <CustomSelect
            id="role"
            name="role"
            value={form.role}
            onChange={handleCustomSelectChange}
            options={EXECUTIVE_ROLES}
            placeholder="Select Executive Role"
            required
          />
        </div>
      )}

      {/* Motivation Textarea */}
      <div>
        {label("Motivation", true)}
        <textarea
          id="motivation"
          name="motivation"
          required
          rows={4}
          value={form.motivation}
          onChange={handleChange}
          className={`${inputClass} min-h-[120px] resize-none`}
          placeholder="Why do you want to join NRC?"
        />
      </div>

      {/* Relevant Experience Textarea */}
      <div>
        {label("Relevant Experience")}
        <textarea
          id="experience"
          name="experience"
          rows={4}
          value={form.experience}
          onChange={handleChange}
          className={`${inputClass} min-h-[120px] resize-none`}
          placeholder="Tell us about any relevant robotics, engineering, or technical experience."
        />
      </div>

      {/* Portfolio Field (Executive Only) */}
      {type === "executive" && (
        <div>
          {label("Portfolio / GitHub")}
          <input
            id="portfolio"
            name="portfolio"
            type="url"
            value={form.portfolio}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://github.com/…"
          />
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-[#C1121F]" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto mb-12 sm:mb-0 self-start inline-flex items-center justify-center gap-2 font-display text-xs tracking-[0.2em] text-white bg-[#E84F0E] px-8 py-4 rounded-full hover:bg-[#FF6B2B] hover:shadow-[0_0_20px_rgba(232,79,14,0.4)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
      >
        {status === "loading" ? "SUBMITTING…" : "SUBMIT APPLICATION →"}
      </button>
    </form>
  );
}