export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-col justify-between bg-[#002366] text-white p-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center font-bold">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight">AI-Recruit360</span>
        </div>

        <div className="space-y-6">
          <blockquote className="text-2xl font-medium leading-relaxed">
            "We cut our hiring time by 70% and eliminated fraudulent candidates completely. The Truthfulness Score is a game changer."
          </blockquote>
        </div>

        <div className="text-sm text-blue-300">
          © 2026 AI-Recruit360 Inc.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
