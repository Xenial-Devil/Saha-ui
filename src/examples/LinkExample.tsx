import Link from "../components/Link";
import { ExternalLink, Download, ArrowRight } from "lucide-react";

export const LinkExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Link Component</h3>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-3">
          <div>
            <Link href="#" variant="default">
              Default Link
            </Link>
          </div>
          <div>
            <Link href="#" variant="primary">
              Primary Link
            </Link>
          </div>
          <div>
            <Link href="#" variant="muted">
              Muted Link
            </Link>
          </div>
          <div>
            <Link href="#" variant="underline">
              Underlined Link
            </Link>
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Icons</h4>
        <div className="space-y-3">
          <div>
            <Link href="#" variant="primary">
              Learn More <ArrowRight size={16} className="inline ml-1" />
            </Link>
          </div>
          <div>
            <Link href="#" variant="primary">
              <ExternalLink size={16} className="inline mr-1" /> External Link
            </Link>
          </div>
          <div>
            <Link href="#" variant="primary">
              <Download size={16} className="inline mr-1" /> Download
            </Link>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">External Links</h4>
        <div className="space-y-3">
          <div>
            <Link href="https://reactjs.org" external variant="primary">
              React Documentation{" "}
              <ExternalLink size={14} className="inline ml-1" />
            </Link>
          </div>
          <div>
            <Link
              href="https://www.typescriptlang.org"
              external
              variant="primary"
            >
              TypeScript Docs <ExternalLink size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Disabled State */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Disabled</h4>
        <div className="space-y-3">
          <div>
            <Link href="#" variant="primary" disabled>
              Disabled Link
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
