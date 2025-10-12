import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/Accordion";
import Card from "../components/Card";

export const AccordionExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Accordion Component</h3>

      {/* Single Mode - Only one item open at a time */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Single Mode (Default)
        </h4>
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is React?</AccordionTrigger>
            <AccordionContent>
              React is a JavaScript library for building user interfaces. It's
              maintained by Facebook and a community of individual developers
              and companies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is TypeScript?</AccordionTrigger>
            <AccordionContent>
              TypeScript is a strongly typed programming language that builds on
              JavaScript, giving you better tooling at any scale.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
            <AccordionContent>
              Tailwind CSS is a utility-first CSS framework that provides
              low-level utility classes to build custom designs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Single Mode with Collapsible */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Single Mode (Collapsible - Can close all)
        </h4>
        <Accordion type="single" collapsible variant="controlled">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Vite?</AccordionTrigger>
            <AccordionContent>
              Vite is a modern build tool that provides fast development and
              optimized production builds for modern web projects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is CVA?</AccordionTrigger>
            <AccordionContent>
              Class Variance Authority (CVA) is a utility for creating type-safe
              variant-based component styling with Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
            <AccordionContent>
              shadcn/ui is a collection of beautifully designed components built
              with Radix UI and Tailwind CSS that you can copy and paste into
              your apps.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Multiple Mode - Multiple items can be open */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Multiple Mode (Multiple items can be open)
        </h4>
        <Accordion
          type="multiple"
          defaultValue={["faq-1", "faq-2"]}
          variant="allopen"
        >
          <AccordionItem value="faq-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern with proper
              keyboard navigation and ARIA attributes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that are beautiful and can be
              easily customized with Tailwind CSS classes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default with smooth transitions using CSS
              transitions and transforms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4" disabled>
            <AccordionTrigger>Is this item disabled?</AccordionTrigger>
            <AccordionContent>
              This item is disabled and cannot be opened.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Different Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Toggle Variant</h4>
        <Accordion type="single" defaultValue="toggle-1" variant="toggle">
          <AccordionItem value="toggle-1">
            <AccordionTrigger>Frontend Technologies</AccordionTrigger>
            <AccordionContent>
              HTML, CSS, JavaScript, React, Vue, Angular, Svelte, and many more
              frameworks and libraries for building modern web applications.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="toggle-2">
            <AccordionTrigger>Backend Technologies</AccordionTrigger>
            <AccordionContent>
              Node.js, Python (Django/Flask), Ruby on Rails, PHP, Java (Spring
              Boot), and other server-side technologies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="toggle-3">
            <AccordionTrigger>Database Technologies</AccordionTrigger>
            <AccordionContent>
              MySQL, PostgreSQL, MongoDB, Redis, and other database management
              systems for data storage and retrieval.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* In Card Context */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          In Card Context (First Open Variant)
        </h4>
        <Card variant="glass" padding="none">
          <Accordion type="single" defaultValue="card-1" variant="firstopen">
            <AccordionItem value="card-1">
              <AccordionTrigger>Design Systems</AccordionTrigger>
              <AccordionContent>
                A design system is a collection of reusable components, guided
                by clear standards, that can be assembled to build applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="card-2">
              <AccordionTrigger>Component Libraries</AccordionTrigger>
              <AccordionContent>
                Component libraries like Material-UI, Ant Design, Chakra UI, and
                shadcn/ui provide pre-built components to speed up development.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="card-3">
              <AccordionTrigger>Custom Components</AccordionTrigger>
              <AccordionContent>
                Building custom components allows for complete control over
                design, functionality, and user experience tailored to specific
                needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
};
