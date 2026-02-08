import { prisma } from "@/lib/prisma";
import { CustomerForm } from "./customer-form";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Add new customer</h2>
        <p className="text-sm text-slate-500">
          Store customer contact details and service notes.
        </p>
        <div className="mt-4">
          <CustomerForm />
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Customer list</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-100">
                  <td className="py-3 font-medium text-slate-900">{customer.name}</td>
                  <td className="py-3 text-slate-600">{customer.email}</td>
                  <td className="py-3 text-slate-600">{customer.phone}</td>
                  <td className="py-3 text-slate-600">{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && (
            <p className="mt-4 text-sm text-slate-500">No customers yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
