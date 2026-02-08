import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/dashboard/logout-button";

export async function Topbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div>
        <p className="text-sm text-slate-500">Welcome back,</p>
        <h2 className="text-lg font-semibold text-slate-900">
          {session?.user?.name ?? "Team Member"}
        </h2>
      </div>
      <LogoutButton />
    </header>
  );
}
