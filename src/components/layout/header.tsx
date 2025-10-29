
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/company', label: 'Company' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-card/60 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg font-headline text-neutral-100">{siteConfig.name}</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-auto" aria-label="Open menu">
              <Menu />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-card border-r border-white/10">
            <DialogTitle className="sr-only">Main Menu</DialogTitle>
            <DialogDescription className="sr-only">
              Navigation links for the Maharudh AI website.
            </DialogDescription>
            <div className="flex flex-col h-full py-6">
                <div className="px-6">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="font-bold text-lg font-headline text-neutral-100">{siteConfig.name}</span>
                    </Link>
                </div>
                <nav className="flex flex-col items-start space-y-4 px-6 mt-8">
                    {navLinks.map(({ href, label }) => (
                    <Link
                        key={label}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                        'text-lg font-medium transition-colors hover:text-glow-blue',
                        pathname === href ? 'text-glow-blue' : 'text-neutral-400'
                        )}
                    >
                        {label}
                    </Link>
                    ))}
                </nav>
                 <div className="mt-auto px-6 space-y-4">
                    <Button asChild size="lg" className="w-full font-bold bg-glow-blue text-background hover:bg-glow-blue/90 shadow-lg shadow-glow-blue/20 transition-all duration-300 hover:shadow-glow-blue/40">
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get a Free Quote</Link>
                    </Button>
                </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'transition-colors hover:text-glow-blue',
                pathname === href ? 'text-neutral-100' : 'text-neutral-400'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
             <Button asChild size="lg" className="hidden md:flex font-bold bg-glow-blue text-background hover:bg-glow-blue/90 shadow-lg shadow-glow-blue/20 transition-all duration-300 hover:shadow-glow-blue/40">
                <Link href="/contact">Get a Free Quote</Link>
            </Button>
        </div>

      </div>
    </header>
  );
};

export default Header;
