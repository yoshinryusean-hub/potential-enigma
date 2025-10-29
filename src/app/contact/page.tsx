
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/contact-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Calendar, Mail } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
    title: "Contact",
    description: "Get a free quote for your data labeling project or book a consultation with the Maharudh AI team.",
};

const heroImage = PlaceHolderImages.find(p => p.id === 'contact-hero');

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
            <div className="absolute inset-0 bg-grid-glow opacity-20 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    priority
                    className="object-cover opacity-10 animate-fade-in-slow"
                />
            )}
            <div className="container mx-auto px-4 md:px-6 text-center relative">
                <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-neutral-50 via-neutral-200 to-neutral-500 animate-fade-in-up"
                    style={{animationDelay: '0.2s'}}
                >
                    Let's Talk About Your Project
                </h1>
                <p 
                    className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-400 mt-4 animate-fade-in-up"
                    style={{animationDelay: '0.4s'}}
                >
                    We're here to help you get the high-quality training data you need. Reach out to us for a quote or to schedule a call.
                </p>
            </div>
        </section>

        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                        <div className="group relative rounded-xl border border-white/10 bg-white/5 p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px] hover:shadow-glow-blue/20">
                            <div className="absolute inset-0 bg-grid-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                            <div className="relative">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="font-headline text-3xl text-neutral-100">Get a Free Data Labeling Quote</CardTitle>
                                    <CardDescription className="text-neutral-400">
                                        Fill out the form below, and our team will get back to you within 24 hours.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <ContactForm />
                                </CardContent>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                           <div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px] hover:shadow-glow-blue/20">
                                <div className="absolute inset-0 bg-grid-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                <div className="relative">
                                    <CardHeader className="flex-row items-start gap-4 space-y-0 p-0">
                                        <div className="flex-shrink-0">
                                            <div className="bg-glow-blue/10 text-glow-blue p-3 rounded-full">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <CardTitle className="font-headline text-2xl text-neutral-100">Book a Consultation</CardTitle>
                                            <CardDescription className="mt-1 text-neutral-400">
                                                Schedule a 15-minute call to discuss your needs with an AI data specialist.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-6">
                                        <Button asChild className="w-full font-bold bg-glow-blue text-background hover:bg-glow-blue/90 shadow-lg shadow-glow-blue/20 transition-all duration-300 hover:shadow-glow-blue/40">
                                            <Link href={siteConfig.bookingLink} target="_blank">
                                                Book Online <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </div>
                            </div>
                             <div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px] hover:shadow-glow-blue/20">
                                <div className="absolute inset-0 bg-grid-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                <div className="relative">
                                    <CardHeader className="flex-row items-start gap-4 space-y-0 p-0">
                                        <div className="flex-shrink-0">
                                            <div className="bg-glow-blue/10 text-glow-blue p-3 rounded-full">
                                                <Mail className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <CardTitle className="font-headline text-2xl text-neutral-100">General Inquiries</CardTitle>
                                            <CardDescription className="mt-1 text-neutral-400">
                                                For all other questions, feel free to email us directly.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-6">
                                        <a
                                            href={`mailto:${siteConfig.contactEmail}`}
                                            className="text-lg font-semibold text-glow-blue hover:text-glow-blue/80 transition-colors"
                                        >
                                            {siteConfig.contactEmail}
                                        </a>
                                    </CardContent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
