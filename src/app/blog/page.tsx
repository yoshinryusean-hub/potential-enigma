
'use client';

import { blogPosts } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUser } from '@/firebase';

export default function BlogPage() {
  const { user } = useUser();

  return (
    <div className="animate-fade-in">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
            <div className="absolute inset-0 bg-grid-glow opacity-20 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            <div className="container mx-auto px-4 md:px-6 text-center relative">
                 <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-neutral-50 via-neutral-200 to-neutral-500 animate-fade-in-up"
                    style={{animationDelay: '0.2s'}}
                >
                    Maharudh AI Blog
                </h1>
                <p 
                    className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-400 mt-4 animate-fade-in-up"
                    style={{animationDelay: '0.4s'}}
                >
                    Insights on AI, Data Labeling, and the Future of Machine Learning.
                </p>
            </div>
        </section>

        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.slug} className="group relative rounded-xl border border-white/10 bg-white/5 p-6 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_-5px] hover:shadow-glow-blue/20">
                            <div className="absolute inset-0 bg-grid-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                            <div className="relative flex flex-col h-full">
                                <Link href={`/blog/${post.slug}`} className="block mb-4">
                                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        data-ai-hint={post.imageHint}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    </div>
                                </Link>
                                <div className="flex-grow">
                                    <h2 className="font-headline text-2xl mb-2">
                                        <Link href={`/blog/${post.slug}`} className="text-neutral-100 hover:text-glow-blue transition-colors">{post.title}</Link>
                                    </h2>
                                    <p className="text-neutral-400 mb-4 text-sm">
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })} - by {post.author}
                                    </p>
                                    <p className="text-neutral-400">{post.excerpt}</p>
                                </div>
                                <div className="mt-6">
                                    <Button asChild variant="link" className="p-0 h-auto text-glow-blue hover:text-glow-blue/80">
                                        <Link href={`/blog/${post.slug}`}>
                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
}
