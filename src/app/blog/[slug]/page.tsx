
import { notFound } from 'next/navigation';
import { getPostBySlug, blogPosts } from '@/lib/blog';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `${siteConfig.url}/blog/${post.slug}`,
        type: 'article',
        images: [
            {
                url: post.image,
                width: 1200,
                height: 630,
                alt: post.title,
            },
        ],
    },
     twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.image],
    },
  };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
      slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="animate-fade-in">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <Link href="/blog" className="text-glow-blue font-semibold hover:text-glow-blue/80 transition-colors">
                        &larr; Back to Blog
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-br from-neutral-50 via-neutral-200 to-neutral-500">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-neutral-400 mt-6">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden border border-white/10 shadow-[0_0_30px_-10px_hsl(var(--glow-blue)/0.3)]">
                    <Image
                    src={post.image}
                    alt={post.title}
                    data-ai-hint={post.imageHint}
                    fill
                    className="object-cover"
                    />
                </div>

                <div className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-br prose-headings:from-neutral-50 prose-headings:via-neutral-200 prose-headings:to-neutral-500 prose-strong:text-neutral-100 prose-blockquote:border-glow-blue prose-blockquote:text-neutral-400 prose-a:text-glow-blue prose-a:transition-colors hover:prose-a:text-glow-blue/80 prose-code:text-neutral-300 prose-code:bg-white/5 prose-code:p-1 prose-code:rounded-md font-body">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                <div className="mt-16 text-center">
                     <Button asChild size="lg" className="font-bold bg-glow-blue text-background hover:bg-glow-blue/90 shadow-lg shadow-glow-blue/20 transition-all duration-300 hover:shadow-glow-blue/40">
                        <Link href="/contact">
                            Discuss Your Project <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </article>
  );
}
