"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { jobSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const formSchema = jobSchema;

type FormValues = z.infer<typeof formSchema>;

type JobFormProps = {
  customers: { id: string; name: string }[];
  employees: { id: string; name: string }[];
  isAdmin: boolean;
};

export function JobForm({ customers, employees, isAdmin }: JobFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      setError("Unable to create job.");
      return;
    }

    reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="title">Job title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Input id="status" {...register("status")} placeholder="Scheduled" />
          {errors.status && (
            <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="scheduledAt">Scheduled date</Label>
          <Input id="scheduledAt" type="date" {...register("scheduledAt")} />
          {errors.scheduledAt && (
            <p className="mt-1 text-xs text-red-500">{errors.scheduledAt.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="customerId">Customer</Label>
          <select
            id="customerId"
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            {...register("customerId")}
          >
            <option value="">Select customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customerId && (
            <p className="mt-1 text-xs text-red-500">{errors.customerId.message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...register("description")} />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>
      {isAdmin && (
        <div>
          <Label htmlFor="assignedToId">Assign to</Label>
          <select
            id="assignedToId"
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            {...register("assignedToId")}
          >
            <option value="">Unassigned</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Create job"}</Button>
    </form>
  );
}
