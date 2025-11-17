import ThemeProvider from "./components/ThemeProvider/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import { ToastProvider } from "./components/Toast";
import { Sparkles } from "lucide-react";
import { AllComponentExamples } from "./examples";

function App() {

  return (
    <ThemeProvider>
      <ToastProvider
        position="top-right"
        duration={5000}
        max={5}
        gap={12}
        offset={16}
        variant="solid"
        animation="slide"
      >
        <div className="min-h-screen transition-colors duration-300">
          {/* Header */}
          <header className="glass sticky top-0 z-50 border-b border-border/50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" size={28} />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Saha UI
                </h1>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Modern React Component Library
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Beautiful, accessible components with glassmorphism effects for
                both light and dark modes
              </p>
            </div>

            {/* All Component Examples */}
            <AllComponentExamples />
          </section>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
