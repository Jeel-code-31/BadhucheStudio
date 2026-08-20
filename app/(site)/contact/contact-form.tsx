"use client"

import type React from "react"
import { useState } from "react"
import { TextReveal } from "@/components/text-reveal"
import { GradientButton } from "@/components/gradient-button"
import "./contact-form.css"

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate message length
    if (!values.message || values.message.trim().length < 50) {
      setError("Please provide at least 50 characters describing your project.")
      setIsSubmitting(false)
      return
    }

    try {
      // Create FormData object from the form
      const formData = new FormData(e.currentTarget)

      // Add Access Key and metadata for Web3Forms
      formData.append("access_key", "c4407d01-0ad7-4676-a396-bd9a6c1b0b3c")
      formData.append("subject", "New Inquiry - Badhuche Art Studio (badhuche@gmail.com)")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        setValues({})
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Failed to submit form. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value })) 
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-20">
        <TextReveal>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#B8963F] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#B8963F]">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </TextReveal>
        <TextReveal delay={100}>
          <h2 className="oh-headline text-2xl mb-4">Thank you for reaching out</h2>
        </TextReveal>
        <TextReveal delay={200}>
          <p className="oh-body">
            Our team will review your inquiry and respond within 24-48 business hours. We look forward to discussing
            your vision.
          </p>
        </TextReveal>
      </div>
    )
  }

  return (
    <div className="contact-form-border">
      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Name */}
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder=" "
            value={values.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            className="form-input min-h-[44px] text-base"
            required
            autoComplete="name"
          />
          <label className={`form-label ${focused === "name" || values.name ? "active" : ""}`}>Enter Your name...</label>
          <div
            className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${focused === "name" ? "w-full" : "w-0"}`}
            style={{ background: "linear-gradient(90deg, #c2542d, #b8963f)" }}
          />
        </div>
        {/* Location - REQUIRED by API */}
        <div className="form-group">
          <input
            type="text"
            name="location"
            placeholder=" "
            value={values.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            onFocus={() => setFocused("location")}
            onBlur={() => setFocused(null)}
            className="form-input"
            required
          />
          <label className={`form-label ${focused === "location" || values.location ? "active" : ""}`}>
            Project Location (City, Country)
          </label>
          <div className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${focused === "location" ? "w-full" : "w-0"}`}
            style={{ background: "linear-gradient(90deg, #c2542d, #b8963f)" }} />
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder=" "
            value={values.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            className="form-input min-h-[44px] text-base"
            required
            autoComplete="email"
            inputMode="email"
          />
          <label className={`form-label ${focused === "email" || values.email ? "active" : ""}`}>Enter Your Email Address...</label>
          <div
            className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${focused === "email" ? "w-full" : "w-0"}`}
            style={{ background: "linear-gradient(90deg, #c2542d, #b8963f)" }}
          />
        </div>

        {/* Organization */}
        <div className="form-group">
          <input
            type="text"
            name="organization"
            placeholder=" "
            value={values.organization || ""}
            onChange={(e) => handleChange("organization", e.target.value)}
            onFocus={() => setFocused("organization")}
            onBlur={() => setFocused(null)}
            className="form-input"
          />
          <label className={`form-label ${focused === "organization" || values.organization ? "active" : ""}`}>
            Enter Organization / Company Name...
          </label>
          <div
            className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${focused === "organization" ? "w-full" : "w-0"}`}
            style={{ background: "linear-gradient(90deg, #c2542d, #b8963f)" }}
          />
        </div>

        {/* Project Type */}
        <div className="form-group">
          <input
            type="text"
            name="type"
            placeholder=" "
            value={values.type || ""}
            onChange={(e) => handleChange("type", e.target.value)}
            onFocus={() => setFocused("type")}
            onBlur={() => setFocused(null)}
            className="form-input"
          />
          <label className={`form-label ${focused === "type" || values.type ? "active" : ""}`}>
            Project Type: Airport, Museum, Temple, Public Space...
          </label>
          <div
            className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${focused === "type" ? "w-full" : "w-0"}`}
            style={{ background: "linear-gradient(90deg, #c2542d, #b8963f)" }}
          />
          
        </div>

        {/* Budget Range */}
        <div className="form-group">
          <input
            type="text"
            name="budget"
            placeholder=" "
            value={values.budget || ""}
            onChange={(e) => handleChange("budget", e.target.value)}
            onFocus={() => setFocused("budget")}
            onBlur={() => setFocused(null)}
            className="form-input"
          />
          <label className={`form-label ${focused === "budget" || values.budget ? "active" : ""}`}>
            Estimated Budget Range...
          </label>
          <div className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${focused === "budget" ? "w-full" : "w-0"}`}
            style={{ background: "linear-gradient(90deg, #c2542d, #b8963f)" }}
          />
        </div>

        {/* Message */}
        <div className="form-group">
          <textarea
            name="message"
            rows={4}
            placeholder=" "
            value={values.message || ""}
            onChange={(e) => handleChange("message", e.target.value)}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            className="form-input resize-none min-h-[120px] text-base"
            required
          />
          <label className={`form-label ${focused === "message" || values.message ? "active" : ""}`}>
            Tell us about your vision, the space, and what you hope to achieve...
          </label>
          <div
            className={`absolute bottom-1.5 left-0 h-[2px] transition-all duration-300 ${focused === "message" ? "w-full" : "w-0"}`}
            style={{ background: "linear-gradient(90deg, #c2542d, #b8963f)" }}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="inline-block">
          <GradientButton
            type="submit"
            onClick={() => { }}
            texture="gold-leaf"
            className="min-h-[48px] min-w-[220px] text-[0.75rem]"
            gradient="linear-gradient(135deg, #000000 10%, #c2542d 50%, #b8963f 100%)"
          >
            <span className="relative z-10 flex items-center gap-3">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending Your Inquiry...
                </>
              ) : (
                "Send Commission Inquiry"
              )}
            </span>
          </GradientButton>
        </div>
      </form>
    </div>
  )
}