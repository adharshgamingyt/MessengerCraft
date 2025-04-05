import { Navbar } from "@/components/my ui/Home/navbar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-s1 h-full w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
