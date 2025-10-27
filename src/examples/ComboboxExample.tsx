import { useState } from "react";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxSearch,
  ComboboxItem,
  ComboboxGroup,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxCreate,
} from "../components/Combobox";
import type { ComboboxOption } from "../components/Combobox/Combobox.types";
import {
  User,
  Settings,
  HelpCircle,
  Globe,
  Mail,
  Phone,
  Code,
  Palette,
  Zap,
} from "lucide-react";

export default function ComboboxExample() {
  // Component API examples
  const [basicValue, setBasicValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [searchableValue, setSearchableValue] = useState("");
  const [groupedValue, setGroupedValue] = useState("");
  const [richValue, setRichValue] = useState("");
  const [multiRichValue, setMultiRichValue] = useState<string[]>([]);

  // Props-based examples (minimal)
  const [quickValue, setQuickValue] = useState("");
  const [quickMultiValue, setQuickMultiValue] = useState<string[]>([]);

  // Creatable
  const [creatableOptions, setCreatableOptions] = useState<ComboboxOption[]>([
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ]);
  const [creatableValue, setCreatableValue] = useState("");

  const quickOptions: ComboboxOption[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Combobox Component
          </h1>
          <p className="text-xl text-foreground/70">
            Advanced autocomplete with search, multi-select, creation, and
            beautiful animations
          </p>
        </div>

        {/* COMPONENT API EXAMPLES (Primary Focus) */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold border-b pb-2">
            Component API Examples
          </h2>

          {/* Basic Component API */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">1. Basic Component API</h3>
            <p className="text-foreground/70">
              The flexible component-based approach for maximum customization.
              Try searching "op2" to match "Option 2" or "sv" to match "Svelte"!
            </p>
            <div className="max-w-md">
              <Combobox value={basicValue} onChange={setBasicValue}>
                <ComboboxTrigger>
                  <ComboboxValue placeholder="Select a framework..." />
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxSearch placeholder="Search frameworks..." />
                  <ComboboxEmpty>No framework found</ComboboxEmpty>
                  <ComboboxItem value="option1" label="Option 1">
                    Option 1
                  </ComboboxItem>
                  <ComboboxItem value="option2" label="Option 2">
                    Option 2
                  </ComboboxItem>
                  <ComboboxItem value="react" label="React">
                    React
                  </ComboboxItem>
                  <ComboboxItem value="vue" label="Vue.js">
                    Vue.js
                  </ComboboxItem>
                  <ComboboxItem value="angular" label="Angular">
                    Angular
                  </ComboboxItem>
                  <ComboboxItem value="svelte" label="Svelte">
                    Svelte
                  </ComboboxItem>
                  <ComboboxItem value="solid" label="SolidJS">
                    SolidJS
                  </ComboboxItem>
                </ComboboxContent>
              </Combobox>
              {basicValue && (
                <div className="mt-2 p-3 rounded-lg bg-primary/10 text-primary text-sm">
                  Selected: <strong>{basicValue}</strong>
                </div>
              )}
              <p className="mt-2 text-xs text-foreground/50">
                💡 Advanced search: Type "op2" to find "Option 2", or "rea" for
                "React"
              </p>
            </div>
          </div>

          {/* Multiple Selection Component API */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              2. Multiple Selection (Component API)
            </h3>
            <p className="text-foreground/70">
              Select multiple items with automatic type inference
            </p>
            <div className="max-w-md">
              <Combobox
                value={multiValue}
                onChange={setMultiValue}
                multiple
                variant="primary"
              >
                <ComboboxTrigger>
                  {multiValue.length > 0
                    ? `${multiValue.length} skills selected`
                    : "Select your skills..."}
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxSearch placeholder="Search skills..." />
                  <ComboboxEmpty>No skills found</ComboboxEmpty>
                  <ComboboxItem value="javascript">JavaScript</ComboboxItem>
                  <ComboboxItem value="typescript">TypeScript</ComboboxItem>
                  <ComboboxItem value="react">React</ComboboxItem>
                  <ComboboxItem value="vue">Vue</ComboboxItem>
                  <ComboboxItem value="angular">Angular</ComboboxItem>
                  <ComboboxItem value="node">Node.js</ComboboxItem>
                  <ComboboxItem value="python">Python</ComboboxItem>
                  <ComboboxItem value="go">Go</ComboboxItem>
                  <ComboboxItem value="rust">Rust</ComboboxItem>
                </ComboboxContent>
              </Combobox>
              {multiValue.length > 0 && (
                <div className="mt-2 p-3 rounded-lg bg-primary/10 text-primary text-sm">
                  Selected: <strong>{multiValue.join(", ")}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Grouped Options */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">3. Grouped Options</h3>
            <p className="text-foreground/70">
              Organize items into logical groups with separators
            </p>
            <div className="max-w-md">
              <Combobox
                value={groupedValue}
                onChange={setGroupedValue}
                variant="accent"
              >
                <ComboboxTrigger>
                  <ComboboxValue placeholder="Select contact method..." />
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxSearch placeholder="Search..." />

                  <ComboboxGroup label="Digital">
                    <ComboboxItem value="email" label="Email">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </ComboboxItem>
                    <ComboboxItem value="slack" label="Slack">
                      <Globe className="w-4 h-4 mr-2" />
                      Slack
                    </ComboboxItem>
                  </ComboboxGroup>

                  <ComboboxSeparator />

                  <ComboboxGroup label="Traditional">
                    <ComboboxItem value="phone" label="Phone Call">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Call
                    </ComboboxItem>
                    <ComboboxItem value="meeting" label="In-Person Meeting">
                      <User className="w-4 h-4 mr-2" />
                      In-Person Meeting
                    </ComboboxItem>
                  </ComboboxGroup>

                  <ComboboxEmpty>No methods found</ComboboxEmpty>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>

          {/* Rich Options with Icons and Descriptions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              4. Rich Options (Icons & Descriptions)
            </h3>
            <p className="text-foreground/70">
              Beautiful options with icons and detailed descriptions
            </p>
            <div className="max-w-md">
              <Combobox
                value={richValue}
                onChange={setRichValue}
                variant="secondary"
              >
                <ComboboxTrigger>
                  <ComboboxValue placeholder="Choose a setting..." />
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxSearch placeholder="Search settings..." />
                  <ComboboxEmpty>No settings found</ComboboxEmpty>

                  <ComboboxItem value="profile" label="Profile Settings">
                    <div className="flex items-center gap-3 w-full">
                      <User className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">Profile Settings</div>
                        <div className="text-xs text-foreground/60">
                          Manage your personal information
                        </div>
                      </div>
                    </div>
                  </ComboboxItem>

                  <ComboboxItem value="appearance" label="Appearance">
                    <div className="flex items-center gap-3 w-full">
                      <Palette className="w-5 h-5 text-accent" />
                      <div className="flex-1">
                        <div className="font-medium">Appearance</div>
                        <div className="text-xs text-foreground/60">
                          Customize theme and colors
                        </div>
                      </div>
                    </div>
                  </ComboboxItem>

                  <ComboboxItem value="advanced" label="Advanced Settings">
                    <div className="flex items-center gap-3 w-full">
                      <Settings className="w-5 h-5 text-warning" />
                      <div className="flex-1">
                        <div className="font-medium">Advanced Settings</div>
                        <div className="text-xs text-foreground/60">
                          Developer and power user options
                        </div>
                      </div>
                    </div>
                  </ComboboxItem>

                  <ComboboxItem value="help" label="Help & Support">
                    <div className="flex items-center gap-3 w-full">
                      <HelpCircle className="w-5 h-5 text-info" />
                      <div className="flex-1">
                        <div className="font-medium">Help & Support</div>
                        <div className="text-xs text-foreground/60">
                          Documentation and assistance
                        </div>
                      </div>
                    </div>
                  </ComboboxItem>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>

          {/* Multiple Selection with Rich Options */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              5. Multiple + Rich Options
            </h3>
            <p className="text-foreground/70">
              Combine multi-select with beautiful rich content
            </p>
            <div className="max-w-md">
              <Combobox
                value={multiRichValue}
                onChange={setMultiRichValue}
                multiple
                variant="success"
              >
                <ComboboxTrigger>
                  {multiRichValue.length > 0
                    ? `${multiRichValue.length} tools selected`
                    : "Select dev tools..."}
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxSearch placeholder="Search tools..." />
                  <ComboboxEmpty>No tools found</ComboboxEmpty>

                  <ComboboxGroup label="Frontend">
                    <ComboboxItem value="react" label="React">
                      <Code className="w-4 h-4 mr-2 text-primary" />
                      <div>
                        <div className="font-medium">React</div>
                        <div className="text-xs text-foreground/60">
                          UI library
                        </div>
                      </div>
                    </ComboboxItem>
                    <ComboboxItem value="vue" label="Vue">
                      <Code className="w-4 h-4 mr-2 text-success" />
                      <div>
                        <div className="font-medium">Vue</div>
                        <div className="text-xs text-foreground/60">
                          Progressive framework
                        </div>
                      </div>
                    </ComboboxItem>
                  </ComboboxGroup>

                  <ComboboxSeparator />

                  <ComboboxGroup label="Build Tools">
                    <ComboboxItem value="vite" label="Vite">
                      <Zap className="w-4 h-4 mr-2 text-warning" />
                      <div>
                        <div className="font-medium">Vite</div>
                        <div className="text-xs text-foreground/60">
                          Next gen tooling
                        </div>
                      </div>
                    </ComboboxItem>
                    <ComboboxItem value="webpack" label="Webpack">
                      <Settings className="w-4 h-4 mr-2 text-info" />
                      <div>
                        <div className="font-medium">Webpack</div>
                        <div className="text-xs text-foreground/60">
                          Module bundler
                        </div>
                      </div>
                    </ComboboxItem>
                  </ComboboxGroup>
                </ComboboxContent>
              </Combobox>
              {multiRichValue.length > 0 && (
                <div className="mt-2 p-3 rounded-lg bg-success/10 text-success text-sm">
                  Selected tools: <strong>{multiRichValue.join(", ")}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Creatable Options */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">6. Creatable Options</h3>
            <p className="text-foreground/70">
              Allow users to create new options on the fly
            </p>
            <div className="max-w-md">
              <Combobox
                value={creatableValue}
                onChange={setCreatableValue}
                creatable
                onCreateOption={(newOption) => {
                  setCreatableOptions([
                    ...creatableOptions,
                    { value: newOption.toLowerCase(), label: newOption },
                  ]);
                  setCreatableValue(newOption.toLowerCase());
                }}
                variant="info"
              >
                <ComboboxTrigger>
                  {creatableValue || "Select or create framework..."}
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxSearch placeholder="Search or create..." />
                  <ComboboxEmpty>No framework found</ComboboxEmpty>
                  <ComboboxCreate />
                  <ComboboxSeparator />
                  {creatableOptions.map((option) => (
                    <ComboboxItem key={option.value} value={option.value}>
                      {option.label}
                    </ComboboxItem>
                  ))}
                </ComboboxContent>
              </Combobox>
              <p className="mt-2 text-sm text-foreground/60">
                Try typing a new framework name and creating it!
              </p>
            </div>
          </div>

          {/* Loading State */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">7. Loading State</h3>
            <p className="text-foreground/70">
              Show loading indicators while fetching data
            </p>
            <div className="max-w-md">
              <Combobox
                value={searchableValue}
                onChange={setSearchableValue}
                loading
                variant="warning"
              >
                <ComboboxTrigger>
                  {searchableValue || "Loading data..."}
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxSearch placeholder="Search..." />
                  <div className="p-8 text-center text-foreground/60">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-2">Loading options...</p>
                  </div>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>
        </section>

        {/* PROPS-BASED EXAMPLES (Minimal) */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold border-b pb-2">
            Props-Based API (Quick Use)
          </h2>
          <p className="text-foreground/70">
            Simple props-based API for quick implementations when you don't need
            customization
          </p>

          {/* Quick Single Select */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Quick Single Select</h3>
            <div className="max-w-md">
              <Combobox
                options={quickOptions}
                value={quickValue}
                onChange={setQuickValue}
                placeholder="Quick select..."
                label="Simple Props-Based"
                helperText="One-liner component with all options as props"
                variant="primary"
              />
            </div>
          </div>

          {/* Quick Multiple Select */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Quick Multiple Select</h3>
            <div className="max-w-md">
              <Combobox
                options={quickOptions}
                value={quickMultiValue}
                onChange={setQuickMultiValue}
                multiple
                placeholder="Quick multi-select..."
                label="Quick Multi-Select"
                helperText="Props-based with multiple selection"
                variant="accent"
              />
            </div>
          </div>
        </section>

        {/* Variants Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b pb-2">Variant Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(
              [
                "default",
                "primary",
                "secondary",
                "accent",
                "success",
                "warning",
                "error",
                "info",
                "ghost",
              ] as const
            ).map((variant) => (
              <Combobox
                key={variant}
                variant={variant}
                value=""
                onChange={() => {}}
              >
                <ComboboxTrigger>{variant}</ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxItem value="1">Option 1</ComboboxItem>
                  <ComboboxItem value="2">Option 2</ComboboxItem>
                </ComboboxContent>
              </Combobox>
            ))}
          </div>
        </section>

        {/* Sizes Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b pb-2">Size Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            {(["sm", "md", "lg"] as const).map((size) => (
              <Combobox key={size} size={size} value="" onChange={() => {}}>
                <ComboboxTrigger>Size: {size}</ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxItem value="1">Option 1</ComboboxItem>
                  <ComboboxItem value="2">Option 2</ComboboxItem>
                </ComboboxContent>
              </Combobox>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
