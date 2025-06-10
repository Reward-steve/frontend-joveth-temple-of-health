import logo from "../assets/img/jwtLogo.jpg";

export function AuthHolder({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full bg-[gradient-to-br from-[#e0e7ff] to-[#f0f4ff]]">
      {/* Left side: Form holder */}
      <div className="w-full md:w-1/2 flex justify-center items-start md:items-center py-8 md:py-0">
        {children}
      </div>
      {/* Right side: Intro and logo */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-[#1e3a5f">
        <section className="w-[90%] text-center flex flex-col items-center gap-[10%] h-[100vh] justify-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Joveth Temple of Health (JTH)
          </h2>
          <div className="flex justify-center items-center w-full mb-4">
            <img
              src={logo}
              alt="logo"
              className="rounded-[10px] w-3/5 md:w-2/5 object-cover"
            />
          </div>
          <p className="text-white text-center">
            Discover the power of personalized health insights and seamless
            tracking with Joveth Temple of Health
          </p>
        </section>
      </div>
    </main>
  );
}
