
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
};

export default function AccessibilityStatementPage() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="prose lg:prose-lg max-w-4xl mx-auto">
          <h1 className="font-headline">Accessibility Statement for Maharudh AI</h1>

          <p>
            Maharudh AI is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>

          <h2>Measures to support accessibility</h2>
          <p>
            Maharudh AI takes the following measures to ensure accessibility of our website:
          </p>
          <ul>
            <li>Include accessibility as part of our mission statement.</li>
            <li>Integrate accessibility into our procurement practices.</li>
            <li>Appoint an accessibility officer and/or ombudsperson.</li>
            <li>Provide continual accessibility training for our staff.</li>
            <li>Assign clear accessibility targets and responsibilities.</li>
          </ul>

          <h2>Conformance status</h2>
          <p>
            The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/">Web Content Accessibility Guidelines (WCAG)</a> defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Maharudh AI is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
          </p>

          <h2>Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Maharudh AI. Please let us know if you encounter accessibility barriers on our website:
          </p>
          <ul>
            <li>E-mail: <a href="mailto:Maharudi.AI@proton.me">Maharudi.AI@proton.me</a></li>
          </ul>
          <p>
            We try to respond to feedback within 5 business days.
          </p>

          <h2>Technical specifications</h2>
          <p>
            Accessibility of Maharudh AI relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
          </p>
          <ul>
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
          <p>
            These technologies are relied upon for conformance with the accessibility standards used.
          </p>
          <p>This statement was created on 1 August 2024.</p>
        </div>
      </div>
    </div>
  );
}
