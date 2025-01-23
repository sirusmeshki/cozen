import CozenLogo from "@/app/assets/icon/cozen-logo";
import NewsMarquee from "@/components/news-marquee";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NewsMarquee />
      <main className="mx-auto flex h-full flex-col gap-3 p-3 xs:gap-6 xs:p-6 sm:gap-9 sm:p-9">
        <header>
          <CozenLogo />
        </header>

        {children}
      </main>
    </>
  );
}
