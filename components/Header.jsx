// import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";

// const Header = () => {
//   return (
//     <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md z-50 border-b">
//       <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link href="/">
//           <Image src={"/logo.png"} alt="Logo" width={90} height={60} />
//         </Link>
//         <div className="flex items-center gap-3">
//           <Show when="signed-out">
//             <SignInButton forceRedirectUrl="/dashboard">
//               <button variant="outline" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
//                 Sign in
//               </button>
//             </SignInButton>
//             <SignUpButton forceRedirectUrl="/dashboard">
//               <button className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
//                 Sign up
//               </button>
//             </SignUpButton>
//             </Show>

//             <Show when="signed-in">
//               <UserButton afterSignOutUrl="/" />
//             </Show>
//           </div>
//       </nav>
//     </header>
//   )
// }

// export default Header

// import React from "react";
// import Link from "next/link";
// import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
// import { checkUser } from "@/lib/checkUser";
// import Image from "next/image";
// import { Button } from "./ui/button";

// const Header = async () => {
//   await checkUser();

//   return (
//     <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm transition-all">
//       <nav className="container mx-auto flex items-center justify-between px-6 py-4">

//         {/* Logo */}
//         <Link href="/" className="flex items-center transition-transform hover:opacity-80">
//           <Image
//             src="/logo.png"
//             alt="Flowoid Logo"
//             width={200}
//             height={60}
//             className="h-12 w-auto object-contain"
//             priority
//           />
//         </Link>

//         {/* Action Buttons */}
//         <div className="flex items-center space-x-4">
//           {/* Signed In */}
//           <Show when="signed-in">
//             {/* Button: Dashboard */}
//             {/* Button: Add Transaction */}
//             {/* Button: User Profile */}
//           </Show>

//           {/* Signed Out */}
//           <Show when="signed-out">
//             <SignInButton forceRedirectUrl="/dashboard">
//               <Button variant="outline">
//                 Sign in
//               </Button>
//             </SignInButton>
//             <SignUpButton forceRedirectUrl="/dashboard">
//               <Button>
//                 Sign up
//               </Button>
//             </SignUpButton>
//           </Show>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;




import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Flowoid Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation Links - Signed Out */}
        <div className="hidden items-center space-x-8 md:flex">
          <Show when="signed-out">
            <a
              href="#features"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#testimonials"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              Testimonials
            </a>
          </Show>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">

          {/* Signed In */}
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">
                  Dashboard
                </span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">
                  Add Transaction
                </span>
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10"
                },
              }}
            />
          </Show>

          {/* Signed Out */}
          <Show when="signed-out">
            <SignInButton fallbackRedirectUrl="/dashboard">
              <Button variant="outline">
                Login
              </Button>
            </SignInButton>
          </Show>

        </div>
      </nav>
    </header>
  );
};

export default Header;