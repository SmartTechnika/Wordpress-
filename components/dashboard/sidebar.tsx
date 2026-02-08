import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/customers", label: "Customers" },
  { href: "/dashboard/jobs", label: "Jobs" }
];

export async function Sidebar() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white p-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-slate-500">Smart Technika</p>
        <h1 className="text-lg font-semibold text-slate-900">CRM Dashboard</h1>
      </div>
      <nav className="space-y-2 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
        {isAdmin && (
          <Link
            href="/dashboard/users"
            className="block rounded-md px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Users
          </Link>
        )}
      </nav>
      <div className="mt-auto text-xs text-slate-400">
        Logged in as {session?.user?.name ?? "User"}
      </div>
    </aside>
  );
}
