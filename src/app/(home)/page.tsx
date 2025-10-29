
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Bot, CheckCircle, Code, ScanLine, Video, Users } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Maharudh AI | High-Quality AI Data Annotation",
};

const services = [
    {
        icon: <ScanLine className="h-8 w-8 text-glow-blue" />,
        title: "Image Annotation",
        description: "Pixel-perfect labeling for computer vision models."
    },
    {
        icon: <Video className="h-8 w-8 text-glow-blue" />,
        title: "Video Annotation",
        description: "Transforming video into structured data for motion analysis."
    },
    {
        icon: <Bot className="h-8 w-8 text-glow-blue" />,
        title: "Text & NLP Labeling",
        description: "High-quality text data for sophisticated language models."
    },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');

export default function HomePage() {
    return (
        <div className="bg-background text-foreground animate-fade-in">
            <section className="relative w-full py-24 md:py-40 lg:py-56 overflow-hidden">
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
                        className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-neutral-50 via-neutral-200 to-neutral-500 animate-fade-in-up"
                        style={{animationDelay: '0.2s'}}
                    >
                        Powering AI with Precision Data
                    </h1>
                    <p 
                        className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-400 mt-6 animate-fade-in-up"
                        style={{animationDelay: '0.4s'}}
                    >
                        Maharudh AI delivers world-class data annotation and labeling services to fuel the next generation of artificial intelligence.
                    </p>
                    <div 
                        className="flex justify-center gap-4 mt-8 animate-fade-in-up"
                        style={{animationDelay: '0.6s'}}
                    >
                         <Button asChild size="lg" className="font-bold bg-glow-blue text-background hover:bg-glow-blue/90 shadow-lg shadow-glow-blue/20 transition-all duration-300 hover:shadow-glow-blue/40">
                            <Link href="/contact">
                                Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="font-bold border-glow-blue/50 text-glow-blue hover:bg-glow-blue/10 hover:text-glow-blue transition-all duration-300">
                           <Link href="/services">Our Services</Link>
                        </Button>
                    </div>
                </div>
            </section>
            
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-headline font-bold text-neutral-100">
                            Secure, Scalable, and Ethically Sourced Data
                        </h2>
                        <p className="text-lg text-neutral-400 mt-2 max-w-3xl mx-auto">
                           We provide the critical data foundation for your most demanding AI projects.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {services.map((service) => (
                             <div key={service.title} className="group relative rounded-xl border border-white/10 bg-white/5 p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px] hover:shadow-glow-blue/20">
                                <div className="absolute inset-0 bg-grid-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                <div className="relative flex flex-col items-center">
                                    <div className="bg-glow-blue/10 p-4 rounded-full mb-4">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-headline font-bold text-neutral-100">{service.title}</h3>
                                    <p className="text-neutral-400 mt-2">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section id="cta" className="py-20 md:py-28 bg-card">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-neutral-100">Ready to Build Better AI?</h2>
                    <p className="text-lg text-neutral-400 mt-2 max-w-2xl mx-auto mb-8">
                       Let's discuss how our high-quality data labeling services can accelerate your machine learning pipeline and improve model performance.
                    </p>
                    <Button asChild size="lg" className="font-bold bg-glow-blue text-background hover:bg-glow-blue/90 shadow-lg shadow-glow-blue/20 transition-all duration-300 hover:shadow-glow-blue/40">
                        <Link href="/contact">
                        Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
