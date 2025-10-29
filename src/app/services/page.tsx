
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Bot, CheckCircle, Code, BrainCog, ScanLine, Video } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Services",
    description: "Explore our AI Data Labeling and Annotation services, including image, video, and text annotation, plus custom AI software development.",
};

const services = [
    {
        icon: <ScanLine className="h-10 w-10 text-glow-blue" />,
        title: "Image Annotation",
        description: "Delivering pixel-perfect accuracy for your computer vision models. Our team is proficient in a wide range of image annotation techniques.",
        features: ["Bounding Boxes", "Polygonal Segmentation", "Semantic & Instance Segmentation", "Keypoint Annotation", "3D Cuboids"],
        imageHint: "abstract data"
    },
    {
        icon: <Video className="h-10 w-10 text-glow-blue" />,
        title: "Video Annotation",
        description: "Transforming raw video footage into structured, labeled data to train models that understand motion, activity, and temporal context.",
        features: ["Object Tracking", "Activity Recognition", "Temporal Annotation", "Video Classification"],
        imageHint: "data streams"
    },
    {
        icon: <Bot className="h-10 w-10 text-glow-blue" />,
        title: "Text & NLP Labeling",
        description: "Powering sophisticated language models with high-quality, human-annotated text data for a variety of NLP tasks.",
        features: ["Named Entity Recognition (NER)", "Sentiment Analysis", "Text Classification", "Relation & Coreference Resolution", "Linguistic Annotation"],
        imageHint: "AI brain"
    },
    {
        icon: <BrainCog className="h-10 w-10 text-glow-blue" />,
        title: "LLM Training (SFT & RLHF)",
        description: "Specialized services in Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF) to align your LLMs.",
        features: ["Supervised Fine-Tuning (SFT)", "Reinforcement Learning (RLHF)", "Reward Model Training", "Direct Preference Optimization (DPO)", "Instruction Tuning"],
        imageHint: "AI alignment"
    },
    {
        icon: <Code className="h-10 w-10 text-glow-blue" />,
        title: "Custom AI Software",
        description: "End-to-end development of bespoke AI solutions tailored to your unique business needs, from concept to deployment.",
        features: ["Model Development & Training", "MLOps & Pipeline Automation", "API Integration", "Feasibility Consulting"],
        imageHint: "computer code"
    },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'services-hero');

export default function ServicesPage() {
    return (
        <div className="bg-background text-foreground animate-fade-in">
            <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
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
                        Our AI Data Services
                    </h1>
                    <p 
                        className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-400 mt-4 animate-fade-in-up"
                        style={{animationDelay: '0.4s'}}
                    >
                        Comprehensive data labeling solutions to fuel your most ambitious AI initiatives.
                    </p>
                </div>
            </section>

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className="group relative rounded-xl border border-white/10 bg-white/5 p-8 overflow-hidden
                                before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]
                                before:border-t before:border-glow-blue/50 before:bg-gradient-to-r before:from-transparent
                                before:via-glow-blue/50 before:to-transparent
                                transition-all duration-500 hover:shadow-[0_0_30px_-5px] hover:shadow-glow-blue/20"
                                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                            >
                                <div className="absolute inset-0 bg-grid-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                <div className="relative">
                                    <div className="mb-6 flex items-center gap-4">
                                        {service.icon}
                                        <h3 className="text-3xl font-headline font-bold text-neutral-100">{service.title}</h3>
                                    </div>
                                    <p className="text-lg text-neutral-400 mb-8">{service.description}</p>
                                    <ul className="space-y-3">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-glow-blue flex-shrink-0" />
                                                <span className="text-neutral-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section id="cta" className="py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-neutral-100">Have a Custom Project?</h2>
                    <p className="text-lg text-neutral-400 mt-2 max-w-2xl mx-auto mb-8">
                        Our team is equipped to handle unique and complex data labeling requirements. Contact us today to discuss your project specifics and receive a tailored quote.
                    </p>
                    <Button asChild size="lg" className="font-bold bg-glow-blue text-background hover:bg-glow-blue/90 shadow-lg shadow-glow-blue/20 transition-all duration-300 hover:shadow-glow-blue/40">
                        <Link href="/contact">
                        Get Your Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

        </div>
    );
}
