import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Validation schema
const contactSchema = z.object({
  // Step 1: Contact Info
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  
  // Step 2: Project Type
  projectType: z.enum(["sculpture", "mural", "installation", "memorial", "other"]),
  projectTypeOther: z.string().optional(),
  
  // Step 3: Location
  location: z.string().min(3, "Location is required"),
  isPublicSpace: z.boolean(),
  
  // Step 4: Timeline & Urgency
  timeline: z.enum(["urgent", "3-6months", "6-12months", "12+months", "flexible"]),
  deadline: z.string().optional(),
  
  // Step 5: Budget
  budgetRange: z.enum(["<50k", "50k-100k", "100k-250k", "250k-500k", "500k+"]),
  budgetConfirmed: z.boolean(),
  
  // Step 6: Builder/Architect
  hasArchitect: z.boolean(),
  architectName: z.string().optional(),
  hasBuilder: z.boolean(),
  builderName: z.string().optional(),
  
  // Step 7: Brief
  projectBrief: z.string().min(50, "Please provide more details about your project"),
  inspiration: z.string().optional(),
  
  // Step 8: How they heard about us
  referralSource: z.enum(["search", "social", "referral", "press", "other"]),
  referralDetails: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Create a CRM entry
    // 4. Send autoresponder to user
    
    
    // Simulate email sending (replace with actual email service like Resend, SendGrid, etc.)
    if (process.env.NODE_ENV === "production") {
      // TODO: Send email here
      // Example: await sendEmail({ to: process.env.CONTACT_EMAIL, subject: "New Commission Inquiry", data: validatedData })
    }
    
    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry. We'll be in touch within 24 hours.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.flatten(),
        },
        { status: 400 }
      )
    }
    
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again.",
      },
      { status: 500 }
    )
  }
}



