import type { Metadata } from "next";
import { Nanum_Brush_Script } from "next/font/google";

const nanumBrushScript = Nanum_Brush_Script({
  variable: "--font-nanum-brush-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "💗 KIMDONGHEE PUMP IT UP 💗",
  description: "💗💗💗💗💗💗💗💗💗💗",
};

export default function SaveTheDateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${nanumBrushScript.variable} antialiased`}>{children}</div>
  );
}
