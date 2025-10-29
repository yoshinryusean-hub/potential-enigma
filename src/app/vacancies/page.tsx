import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacancies",
  description: "Join the Maharudh AI team. Explore our open positions.",
};

export default function VacanciesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Join Our Team
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          We are always looking for talented individuals to join us in our mission to build the future of AI.
          While we may not have specific openings at this moment, we welcome you to check back soon.
        </p>
      </div>
    </div>
  );
}
