import { useState } from "react";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteDropdown,
  AutocompleteOption,
} from "../components/Autocomplete/index";
import type { AutocompleteOption as AutocompleteOptionType } from "../components/Autocomplete/Autocomplete.types";
import {
  Search,
  User,
  Mail,
  Building2,
  MapPin,
  Star,
  Package,
} from "lucide-react";

export const AutocompleteExample = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [composableValue, setComposableValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [asyncValue, setAsyncValue] = useState("");
  const [asyncOptions, setAsyncOptions] = useState<AutocompleteOptionType[]>(
    []
  );

  // Country options
  const countryOptions: AutocompleteOptionType[] = [
    {
      value: "us",
      label: "United States",
      description: "North America",
      group: "Americas",
    },
    {
      value: "ca",
      label: "Canada",
      description: "North America",
      group: "Americas",
    },
    {
      value: "mx",
      label: "Mexico",
      description: "North America",
      group: "Americas",
    },
    {
      value: "br",
      label: "Brazil",
      description: "South America",
      group: "Americas",
    },
    {
      value: "ar",
      label: "Argentina",
      description: "South America",
      group: "Americas",
    },
    {
      value: "uk",
      label: "United Kingdom",
      description: "Western Europe",
      group: "Europe",
    },
    {
      value: "fr",
      label: "France",
      description: "Western Europe",
      group: "Europe",
    },
    {
      value: "de",
      label: "Germany",
      description: "Western Europe",
      group: "Europe",
    },
    {
      value: "es",
      label: "Spain",
      description: "Western Europe",
      group: "Europe",
    },
    {
      value: "it",
      label: "Italy",
      description: "Western Europe",
      group: "Europe",
    },
    { value: "jp", label: "Japan", description: "East Asia", group: "Asia" },
    { value: "cn", label: "China", description: "East Asia", group: "Asia" },
    {
      value: "kr",
      label: "South Korea",
      description: "East Asia",
      group: "Asia",
    },
    { value: "in", label: "India", description: "South Asia", group: "Asia" },
    {
      value: "au",
      label: "Australia",
      description: "Oceania",
      group: "Oceania",
    },
  ];

  // User options with avatars
  const userOptions: AutocompleteOptionType[] = [
    {
      value: "john",
      label: "John Doe",
      description: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      icon: <User size={16} />,
    },
    {
      value: "jane",
      label: "Jane Smith",
      description: "jane.smith@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      icon: <User size={16} />,
    },
    {
      value: "bob",
      label: "Bob Johnson",
      description: "bob.johnson@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      icon: <User size={16} />,
    },
    {
      value: "alice",
      label: "Alice Williams",
      description: "alice.williams@example.com",
      avatar: "https://i.pravatar.cc/150?img=4",
      icon: <User size={16} />,
    },
  ];

  // Product options
  const productOptions: AutocompleteOptionType[] = [
    {
      value: "laptop",
      label: "MacBook Pro",
      description: "$2,499 - In Stock",
      icon: <Package size={16} className="text-blue-500" />,
    },
    {
      value: "phone",
      label: "iPhone 15 Pro",
      description: "$999 - In Stock",
      icon: <Package size={16} className="text-green-500" />,
    },
    {
      value: "tablet",
      label: "iPad Air",
      description: "$599 - Limited Stock",
      icon: <Package size={16} className="text-orange-500" />,
    },
    {
      value: "watch",
      label: "Apple Watch",
      description: "$399 - Out of Stock",
      icon: <Package size={16} className="text-gray-500" />,
      disabled: true,
    },
  ];

  // Simple options
  const fruitOptions: AutocompleteOptionType[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "orange", label: "Orange" },
    { value: "strawberry", label: "Strawberry" },
  ];

  // Simulate async data fetching
  const handleAsyncSearch = (value: string) => {
    setLoading(true);
    setAsyncValue(value);

    // Simulate API call
    setTimeout(() => {
      const mockResults: AutocompleteOptionType[] = [
        {
          value: "result1",
          label: `Result for "${value}" #1`,
          description: "First match",
        },
        {
          value: "result2",
          label: `Result for "${value}" #2`,
          description: "Second match",
        },
        {
          value: "result3",
          label: `Result for "${value}" #3`,
          description: "Third match",
        },
      ];
      setAsyncOptions(mockResults);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-12 p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Autocomplete Component</h1>
        <p className="text-muted-foreground">
          Advanced autocomplete with filtering, keyboard navigation, and
          composable API
        </p>
      </div>

      {/* Basic Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Basic Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Default</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Search fruits..."
              label="Favorite Fruit"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Helper Text</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Search fruits..."
              label="Favorite Fruit"
              helperText="Select your favorite fruit from the list"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Required</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Search fruits..."
              label="Favorite Fruit"
              required
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Error</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Search fruits..."
              label="Favorite Fruit"
              error="Please select a fruit"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Disabled</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Search fruits..."
              label="Favorite Fruit"
              disabled
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Loading</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Search fruits..."
              label="Favorite Fruit"
              loading
            />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Sizes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Small</h3>
            <Autocomplete
              size="sm"
              options={fruitOptions}
              placeholder="Small size..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Medium (Default)</h3>
            <Autocomplete
              size="md"
              options={fruitOptions}
              placeholder="Medium size..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Large</h3>
            <Autocomplete
              size="lg"
              options={fruitOptions}
              placeholder="Large size..."
            />
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Variants</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Default</h3>
            <Autocomplete
              variant="default"
              options={fruitOptions}
              placeholder="Default variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Filled</h3>
            <Autocomplete
              variant="filled"
              options={fruitOptions}
              placeholder="Filled variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Outlined</h3>
            <Autocomplete
              variant="outlined"
              options={fruitOptions}
              placeholder="Outlined variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Ghost</h3>
            <Autocomplete
              variant="ghost"
              options={fruitOptions}
              placeholder="Ghost variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Glass</h3>
            <Autocomplete
              variant="glass"
              options={fruitOptions}
              placeholder="Glass variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Primary</h3>
            <Autocomplete
              variant="primary"
              options={fruitOptions}
              placeholder="Primary variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Success</h3>
            <Autocomplete
              variant="success"
              options={fruitOptions}
              placeholder="Success variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Warning</h3>
            <Autocomplete
              variant="warning"
              options={fruitOptions}
              placeholder="Warning variant..."
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Error</h3>
            <Autocomplete
              variant="error"
              options={fruitOptions}
              placeholder="Error variant..."
            />
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Advanced Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">
              With Icons & Descriptions
            </h3>
            <Autocomplete
              options={productOptions}
              placeholder="Search products..."
              label="Select Product"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Avatars</h3>
            <Autocomplete
              options={userOptions}
              placeholder="Search users..."
              label="Select User"
              selectedValue={selectedUser}
              onSelect={(option) => setSelectedUser(option.value)}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Grouped Options</h3>
            <Autocomplete
              options={countryOptions}
              placeholder="Search countries..."
              label="Select Country"
              groupBy
              selectedValue={selectedCountry}
              onSelect={(option) => setSelectedCountry(option.value)}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Debounce (500ms)</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Type to search..."
              label="Debounced Search"
              debounce={500}
              helperText="Input is debounced by 500ms"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Minimum Characters (3)</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Type at least 3 characters..."
              label="Min Chars"
              minChars={3}
              helperText="Type at least 3 characters to search"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Max Options (3)</h3>
            <Autocomplete
              options={countryOptions}
              placeholder="Search countries..."
              label="Limited Results"
              maxOptions={3}
              helperText="Shows maximum 3 results"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">
              Free Solo (Custom Input)
            </h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Type anything..."
              label="Free Solo"
              freeSolo
              helperText="You can type custom values"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">No Clear Button</h3>
            <Autocomplete
              options={fruitOptions}
              placeholder="Search fruits..."
              label="No Clear"
              clearable={false}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Custom Start Icon</h3>
            <Autocomplete
              options={userOptions}
              placeholder="Search users..."
              label="Custom Icon"
              startIcon={<Mail size={16} />}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">End Icon Position</h3>
            <Autocomplete
              options={countryOptions}
              placeholder="Search countries..."
              label="Icon Position"
              iconPosition="end"
              endIcon={<MapPin size={16} />}
            />
          </div>
        </div>
      </section>

      {/* Async Loading */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Async Loading</h2>

        <div className="max-w-md">
          <Autocomplete
            value={asyncValue}
            onChange={handleAsyncSearch}
            options={asyncOptions}
            placeholder="Type to search..."
            label="Async Search"
            loading={loading}
            autoFilter={false}
            helperText="Simulates API call with 1 second delay"
          />
        </div>
      </section>

      {/* Composable API */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Composable API</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Basic Composable</h3>
            <Autocomplete
              value={composableValue}
              onChange={setComposableValue}
              options={fruitOptions}
              variant="outlined"
            >
              <label className="block mb-2 text-sm font-medium">
                Select Fruit
              </label>
              <AutocompleteInput
                startIcon={<Search size={16} />}
                placeholder="Search fruits..."
              />
              <AutocompleteDropdown>
                <div className="max-h-60 overflow-y-auto">
                  {fruitOptions
                    .filter((opt) =>
                      opt.label
                        .toLowerCase()
                        .includes(composableValue.toLowerCase())
                    )
                    .map((option, idx) => (
                      <AutocompleteOption
                        key={option.value}
                        option={option}
                        index={idx}
                      />
                    ))}
                </div>
              </AutocompleteDropdown>
            </Autocomplete>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Custom Composable</h3>
            <Autocomplete options={productOptions} variant="glass">
              <label className="block mb-2 text-sm font-medium">Products</label>
              <AutocompleteInput
                startIcon={<Package size={16} />}
                placeholder="Search products..."
              />
              <AutocompleteDropdown className="bg-gradient-to-b from-card to-muted/20">
                <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                  {productOptions.map((option, idx) => (
                    <AutocompleteOption
                      key={option.value}
                      option={option}
                      index={idx}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {option.icon}
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                        <Star size={14} className="text-yellow-500" />
                      </div>
                    </AutocompleteOption>
                  ))}
                </div>
              </AutocompleteDropdown>
            </Autocomplete>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Search Bar</h3>
            <Autocomplete
              options={[
                {
                  value: "1",
                  label: "React Documentation",
                  description: "docs.react.dev",
                },
                {
                  value: "2",
                  label: "TypeScript Handbook",
                  description: "typescriptlang.org",
                },
                {
                  value: "3",
                  label: "MDN Web Docs",
                  description: "developer.mozilla.org",
                },
              ]}
              placeholder="Search documentation..."
              variant="filled"
              size="lg"
              startIcon={<Search size={20} />}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">User Selector</h3>
            <Autocomplete
              options={userOptions}
              placeholder="Select team member..."
              label="Assign to"
              variant="outlined"
              required
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Location Search</h3>
            <Autocomplete
              options={countryOptions}
              placeholder="Search location..."
              label="Shipping Address"
              groupBy
              startIcon={<MapPin size={16} />}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Company Search</h3>
            <Autocomplete
              options={[
                {
                  value: "google",
                  label: "Google",
                  description: "Technology",
                  icon: <Building2 size={16} className="text-blue-500" />,
                },
                {
                  value: "microsoft",
                  label: "Microsoft",
                  description: "Technology",
                  icon: <Building2 size={16} className="text-green-500" />,
                },
                {
                  value: "apple",
                  label: "Apple",
                  description: "Technology",
                  icon: <Building2 size={16} className="text-gray-500" />,
                },
              ]}
              placeholder="Search company..."
              label="Company"
              variant="glass"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutocompleteExample;
