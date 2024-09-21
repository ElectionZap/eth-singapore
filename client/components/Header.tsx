import * as React from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { menuOptions } from "@/utils/menu";
import ConnectButton from "./ConnectButton";
import { useWallet } from "@/contexts/Wallet";

export default function Header() {
  const { account } = useWallet();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 px-24",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-md"
          : "bg-background"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="w-36 flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Election</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {menuOptions.map((option, index) => (
            <Link key={index} href={option.label === "Profile" ? `/profile/${account}` : option.href}>
              <Button variant="ghost" className="hover:bg-accent">
                {option.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col space-y-4 mt-6">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Button>
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Connect Button */}
        <ConnectButton />
      </div>
    </header>
  );
}
