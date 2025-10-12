import Accordion from "../components/Accordion";
import Card from "../components/Card";

export const AccordionExample = () => {
  const items = [
    {
      title: "What is React?",
      content:
        "React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.",
    },
    {
      title: "What is TypeScript?",
      content:
        "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    },
    {
      title: "What is Tailwind CSS?",
      content:
        "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.",
    },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Accordion Component</h3>

      {/* Single Accordion */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Default Mode</h4>
        <Accordion variant="default" items={items} />
      </div>

      {/* Controlled Accordion */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Controlled Mode
        </h4>
        <Accordion variant="controlled" items={items} />
      </div>

      {/* First Open */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          First Item Open
        </h4>
        <Accordion variant="firstopen" items={items} />
      </div>

      {/* In Card */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          In Card Context
        </h4>
        <Card variant="glass" padding="none">
          <Accordion variant="default" items={items} />
        </Card>
      </div>
    </div>
  );
};
