import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BarChart, Flag, Scale, Users } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Company",
    description: "Learn about Maharudh AI's mission, vision, and commitment to ethical AI and high-quality data services.",
};

const companyValues = [
    {
        icon: <Scale className="h-8 w-8 text-primary"/>,
        title: "Ethical AI Practices",
        description: "We are committed to fair labor, data privacy, and bias mitigation in every project we undertake."
    },
    {
        icon: <Flag className="h-8 w-8 text-primary"/>,
        title: "Proudly Canadian",
        description: "Proudly Canadian with a global reach, we bring world-class standards of quality and security to clients worldwide."
    },
    {
        icon: <BarChart className="h-8 w-8 text-primary"/>,
        title: "Data-Driven Excellence",
        description: "Our methodologies are rooted in technical accuracy and a deep understanding of data science principles."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Client-Centric Partnership",
        description: "We work as an extension of your team, providing tailored solutions and transparent communication."
    }
]

const heroImage = PlaceHolderImages.find(p => p.id === 'company-hero');

export default function CompanyPage() {
  return (
    <div className="bg-background text-foreground">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="object-cover opacity-10"
                />
            )}
            <div className="container mx-auto px-4 md:px-6 text-center relative">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter text-foreground mb-4">
                    Building the Future of AI, Responsibly
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Maharudh AI is a Canadian startup dedicated to providing world-class AI data services with a foundation of trust and technical excellence.
                </p>
            </div>
        </section>

        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Mission</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            To empower organizations to build groundbreaking AI by providing them with the most accurate, reliable, and ethically sourced training data. We aim to be the trusted backbone of the AI development lifecycle.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Vision</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            To be a global leader in AI data services, renowned for our unwavering commitment to quality, security, and ethical responsibility, fostering a future where AI technology benefits all of humanity.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Core Values</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                        These are the principles that guide every decision we make, every line of code we write, and every piece of data we handle.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {companyValues.map((value) => (
                        <Card key={value.title} className="p-6 text-center bg-background border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                            <CardHeader className="flex flex-col items-center">
                                {value.icon}
                                <CardTitle className="mt-4 font-headline">{value.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet the Team</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto mb-8">
                    Our team of experts is growing. We are passionate about AI and dedicated to our clients' success.
                    <br/>(Full team section coming soon)
                </p>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/contact">
                        Get in Touch
                    </Link>
                </Button>
            </div>
        </section>

    </div>
  )
}
