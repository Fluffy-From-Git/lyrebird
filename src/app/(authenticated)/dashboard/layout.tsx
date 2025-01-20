import NavBar from "@/app/(authenticated)/dashboard/_components/navbar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="h-full bg-slate-100">{children}</div>
    </>
  );
}
