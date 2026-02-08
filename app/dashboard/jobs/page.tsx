import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobForm } from "./job-form";

export default async function JobsPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  const [customers, employees, jobs] = await Promise.all([
    prisma.customer.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    }),
    prisma.user.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" }
    }),
    prisma.job.findMany({
      where: isAdmin
        ? undefined
        : {
            assignedToId: session?.user?.id
          },
      include: {
        customer: true,
        assignedTo: true
      },
      orderBy: { scheduledAt: "asc" }
    })
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Schedule job</h2>
        <p className="text-sm text-slate-500">
          Track installations, service calls, and maintenance visits.
        </p>
        <div className="mt-4">
          <JobForm customers={customers} employees={employees} isAdmin={isAdmin} />
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Job queue</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2">Job</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Assigned</th>
                <th className="py-2">Status</th>
                <th className="py-2">Scheduled</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-slate-100">
                  <td className="py-3 font-medium text-slate-900">{job.title}</td>
                  <td className="py-3 text-slate-600">{job.customer.name}</td>
                  <td className="py-3 text-slate-600">
                    {job.assignedTo?.name ?? "Unassigned"}
                  </td>
                  <td className="py-3 text-slate-600">{job.status}</td>
                  <td className="py-3 text-slate-600">
                    {job.scheduledAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {jobs.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">No jobs scheduled yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
