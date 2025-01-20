export default function LoginLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full bg-slate-100">
      {auth}
      {children}
    </div>
  );
}
