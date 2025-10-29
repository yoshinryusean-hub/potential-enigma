
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="mb-4 flex items-center space-x-2">
                <span className="font-bold text-lg font-headline text-neutral-100">{siteConfig.name}</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                High-quality data annotation for vision and NLP.
              </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-headline font-semibold text-foreground">Quick Links</h4>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
            <Link href="/company" className="text-sm text-muted-foreground hover:text-primary transition-colors">Company</Link>
            <Link href="/onboarding" className="text-sm text-muted-foreground hover:text-primary transition-colors">Onboarding</Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Login</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-headline font-semibold text-foreground">Legal & Press</h4>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/accessibility-statement" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accessibility</Link>
            <Link href="/vacancies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Vacancies</Link>
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">Media Inquiries</a>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
