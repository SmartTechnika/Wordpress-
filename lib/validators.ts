import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone is required"),
  address: z.string().min(4, "Address is required"),
  notes: z.string().optional()
});

export const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be 6 characters"),
  role: z.enum(["ADMIN", "EMPLOYEE"])
});

export const jobSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  status: z.string().min(2, "Status is required"),
  scheduledAt: z.string().min(1, "Schedule date is required"),
  customerId: z.string().min(1, "Customer is required"),
  assignedToId: z.string().optional()
});
