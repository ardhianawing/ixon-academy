import { AppLayout } from "@/components/layout/AppLayout";

export default function ScoutingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
