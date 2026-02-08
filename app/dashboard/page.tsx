import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  const [customerCount, employeeCount, jobCount] = await Promise.all([
    prisma.customer.count(),
    prisma.user.count(),
    prisma.job.count({
      where: isAdmin
        ? undefined
        : {
            assignedToId: session?.user?.id
          }
    })
  ]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Customers", value: customerCount },
          { label: "Employees", value: employeeCount },
          { label: "Active Jobs", value: jobCount }
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
          </div>
        ))}
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Today&apos;s focus</h3>
        <p className="mt-2 text-sm text-slate-600">
          Track scheduled jobs, assign technicians, and keep detailed service notes to
          maintain excellent customer relationships.
        </p>
      </section>
    </div>
  );
}
