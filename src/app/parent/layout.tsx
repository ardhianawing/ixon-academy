import { AppLayout } from "@/components/layout/AppLayout";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
