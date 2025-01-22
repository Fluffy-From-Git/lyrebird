import NavBar from "@/app/(authenticated)/_components/navbar";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-full bg-slate-100">
        <NavBar />
        {children}
      </div>
    </>
  );
}
