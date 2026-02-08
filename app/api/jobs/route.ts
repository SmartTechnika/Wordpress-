import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { jobSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const assignedToId =
    session.user.role === "ADMIN" ? parsed.data.assignedToId : session.user.id;

  const job = await prisma.job.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      status: parsed.data.status,
      scheduledAt: new Date(parsed.data.scheduledAt),
      customerId: parsed.data.customerId,
      assignedToId: assignedToId || null
    }
  });

  return NextResponse.json(job, { status: 201 });
}
