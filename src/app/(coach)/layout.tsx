import { AppLayout } from "@/components/layout/AppLayout";

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
