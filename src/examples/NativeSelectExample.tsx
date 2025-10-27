import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectGroup,
  NativeSelectWrapper,
  NativeSelectLabel,
  NativeSelectDescription,
  NativeSelectError,
} from "../components/NativeSelect";

export default function NativeSelectExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 shadow-lg shadow-blue-500/20">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Native Select Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Beautiful native HTML select with extensive customization, color
            variants, and full accessibility support
          </p>
        </div>

        {/* Compact API - Basic */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Compact API - Basic Usage
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Simple Select
              </h3>
              <NativeSelect placeholder="Choose an option">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                With Disabled Option
              </h3>
              <NativeSelect>
                <option value="1">Active Option 1</option>
                <option value="2" disabled>
                  Disabled Option
                </option>
                <option value="3">Active Option 2</option>
              </NativeSelect>
            </div>
          </div>
        </section>

        {/* Component API - Full Example */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Component API - Complete
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <NativeSelectWrapper>
                <NativeSelectLabel required htmlFor="country">
                  Country
                </NativeSelectLabel>
                <NativeSelect id="country" variant="primary">
                  <NativeSelectOption value="">
                    Select a country
                  </NativeSelectOption>
                  <NativeSelectOption value="us">
                    United States
                  </NativeSelectOption>
                  <NativeSelectOption value="uk">
                    United Kingdom
                  </NativeSelectOption>
                  <NativeSelectOption value="ca">Canada</NativeSelectOption>
                  <NativeSelectOption value="au">Australia</NativeSelectOption>
                </NativeSelect>
                <NativeSelectDescription>
                  Choose your country of residence
                </NativeSelectDescription>
              </NativeSelectWrapper>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <NativeSelectWrapper>
                <NativeSelectLabel required htmlFor="category">
                  Category
                </NativeSelectLabel>
                <NativeSelect id="category" variant="success" error>
                  <NativeSelectOption value="">
                    Select category
                  </NativeSelectOption>
                  <NativeSelectGroup label="Technology">
                    <NativeSelectOption value="web">
                      Web Development
                    </NativeSelectOption>
                    <NativeSelectOption value="mobile">
                      Mobile Apps
                    </NativeSelectOption>
                    <NativeSelectOption value="ai">
                      Artificial Intelligence
                    </NativeSelectOption>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Design">
                    <NativeSelectOption value="ui">
                      UI Design
                    </NativeSelectOption>
                    <NativeSelectOption value="ux">
                      UX Research
                    </NativeSelectOption>
                  </NativeSelectGroup>
                </NativeSelect>
                <NativeSelectError>Please select a category</NativeSelectError>
              </NativeSelectWrapper>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Style Variants
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Default
              </h3>
              <NativeSelect variant="default">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Bordered
              </h3>
              <NativeSelect variant="bordered">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Filled
              </h3>
              <NativeSelect variant="filled">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Ghost
              </h3>
              <NativeSelect variant="ghost">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>
          </div>
        </section>

        {/* Color Variants */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Color Variants
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Primary
              </h3>
              <NativeSelect variant="primary">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Secondary
              </h3>
              <NativeSelect variant="secondary">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Success
              </h3>
              <NativeSelect variant="success">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Warning
              </h3>
              <NativeSelect variant="warning">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Danger
              </h3>
              <NativeSelect variant="danger">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Info
              </h3>
              <NativeSelect variant="info">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Purple
              </h3>
              <NativeSelect variant="purple">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Pink
              </h3>
              <NativeSelect variant="pink">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Cyan
              </h3>
              <NativeSelect variant="cyan">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sizes
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
            <div className="space-y-2">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Small
              </div>
              <NativeSelect size="sm" variant="primary">
                <option value="">Select option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Medium
              </div>
              <NativeSelect size="md" variant="primary">
                <option value="">Select option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Large
              </div>
              <NativeSelect size="lg" variant="primary">
                <option value="">Select option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </NativeSelect>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              States
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Error State
              </h3>
              <NativeSelectWrapper>
                <NativeSelect error>
                  <option value="">Select</option>
                  <option value="1">Option 1</option>
                </NativeSelect>
                <NativeSelectError>This field is required</NativeSelectError>
              </NativeSelectWrapper>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Success State
              </h3>
              <NativeSelectWrapper>
                <NativeSelect success>
                  <option value="">Select</option>
                  <option value="1">Option 1</option>
                </NativeSelect>
                <NativeSelectDescription>Great choice!</NativeSelectDescription>
              </NativeSelectWrapper>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Disabled State
              </h3>
              <NativeSelect disabled>
                <option value="">Select</option>
                <option value="1">Option 1</option>
              </NativeSelect>
            </div>
          </div>
        </section>

        {/* Multiple Select */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Multiple Select
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <NativeSelectWrapper>
                <NativeSelectLabel>Choose multiple options</NativeSelectLabel>
                <NativeSelect multiple visibleOptions={5} variant="indigo">
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
                  <option value="5">Option 5</option>
                  <option value="6">Option 6</option>
                  <option value="7">Option 7</option>
                </NativeSelect>
                <NativeSelectDescription>
                  Hold Ctrl/Cmd to select multiple items
                </NativeSelectDescription>
              </NativeSelectWrapper>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <NativeSelectWrapper>
                <NativeSelectLabel>Grouped Multiple</NativeSelectLabel>
                <NativeSelect multiple visibleOptions={6} variant="teal">
                  <NativeSelectGroup label="Fruits">
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Vegetables">
                    <option value="carrot">Carrot</option>
                    <option value="potato">Potato</option>
                    <option value="tomato">Tomato</option>
                  </NativeSelectGroup>
                </NativeSelect>
                <NativeSelectDescription>
                  Select your favorites
                </NativeSelectDescription>
              </NativeSelectWrapper>
            </div>
          </div>
        </section>

        {/* With Option Groups */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              With Option Groups
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <NativeSelectWrapper>
              <NativeSelectLabel required>
                Select a destination
              </NativeSelectLabel>
              <NativeSelect variant="success">
                <option value="">Choose destination</option>
                <NativeSelectGroup label="North America">
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="mx">Mexico</option>
                </NativeSelectGroup>
                <NativeSelectGroup label="Europe">
                  <option value="uk">United Kingdom</option>
                  <option value="fr">France</option>
                  <option value="de">Germany</option>
                  <option value="it">Italy</option>
                </NativeSelectGroup>
                <NativeSelectGroup label="Asia">
                  <option value="jp">Japan</option>
                  <option value="cn">China</option>
                  <option value="in">India</option>
                </NativeSelectGroup>
              </NativeSelect>
              <NativeSelectDescription>
                Select your travel destination
              </NativeSelectDescription>
            </NativeSelectWrapper>
          </div>
        </section>

        {/* Real-Life Examples */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Real-Life Examples
            </h2>
          </div>

          {/* E-commerce Product Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                E-Commerce Product Filter
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sort and filter products by various criteria
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NativeSelectWrapper>
                <NativeSelectLabel>Sort By</NativeSelectLabel>
                <NativeSelect variant="primary" size="md">
                  <option value="">Choose sorting</option>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel>Category</NativeSelectLabel>
                <NativeSelect variant="secondary">
                  <option value="">All Categories</option>
                  <NativeSelectGroup label="Electronics">
                    <option value="phones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="tablets">Tablets</option>
                    <option value="accessories">Accessories</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Fashion">
                    <option value="mens">Men's Clothing</option>
                    <option value="womens">Women's Clothing</option>
                    <option value="shoes">Shoes</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Home">
                    <option value="furniture">Furniture</option>
                    <option value="decor">Home Decor</option>
                    <option value="kitchen">Kitchen</option>
                  </NativeSelectGroup>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel>Price Range</NativeSelectLabel>
                <NativeSelect variant="success">
                  <option value="">Any Price</option>
                  <option value="0-25">Under $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200 & Above</option>
                </NativeSelect>
              </NativeSelectWrapper>
            </div>
          </div>

          {/* User Registration Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                User Registration Form
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete profile information with dropdown selections
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NativeSelectWrapper>
                <NativeSelectLabel required>Country</NativeSelectLabel>
                <NativeSelect variant="primary">
                  <option value="">Select your country</option>
                  <NativeSelectGroup label="North America">
                    <option value="us">🇺🇸 United States</option>
                    <option value="ca">🇨🇦 Canada</option>
                    <option value="mx">🇲🇽 Mexico</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Europe">
                    <option value="uk">🇬🇧 United Kingdom</option>
                    <option value="fr">🇫🇷 France</option>
                    <option value="de">🇩🇪 Germany</option>
                    <option value="es">🇪🇸 Spain</option>
                    <option value="it">🇮🇹 Italy</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Asia">
                    <option value="jp">🇯🇵 Japan</option>
                    <option value="cn">🇨🇳 China</option>
                    <option value="in">🇮🇳 India</option>
                    <option value="kr">🇰🇷 South Korea</option>
                  </NativeSelectGroup>
                </NativeSelect>
                <NativeSelectDescription>
                  Select your country of residence
                </NativeSelectDescription>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel required>Age Group</NativeSelectLabel>
                <NativeSelect variant="info">
                  <option value="">Select age range</option>
                  <option value="13-17">13-17 years</option>
                  <option value="18-24">18-24 years</option>
                  <option value="25-34">25-34 years</option>
                  <option value="35-44">35-44 years</option>
                  <option value="45-54">45-54 years</option>
                  <option value="55-64">55-64 years</option>
                  <option value="65+">65+ years</option>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel>Occupation</NativeSelectLabel>
                <NativeSelect variant="purple">
                  <option value="">Select occupation</option>
                  <NativeSelectGroup label="Technology">
                    <option value="developer">Software Developer</option>
                    <option value="designer">UI/UX Designer</option>
                    <option value="data">Data Scientist</option>
                    <option value="devops">DevOps Engineer</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Business">
                    <option value="manager">Manager</option>
                    <option value="consultant">Consultant</option>
                    <option value="analyst">Business Analyst</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Creative">
                    <option value="artist">Artist</option>
                    <option value="writer">Writer</option>
                    <option value="photographer">Photographer</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Other">
                    <option value="student">Student</option>
                    <option value="retired">Retired</option>
                    <option value="other">Other</option>
                  </NativeSelectGroup>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel>Preferred Language</NativeSelectLabel>
                <NativeSelect variant="cyan">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Português</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                  <option value="ko">한국어</option>
                  <option value="ar">العربية</option>
                </NativeSelect>
              </NativeSelectWrapper>
            </div>
          </div>

          {/* Event Booking System */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Event Booking System
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Book tickets for events with time and seating preferences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NativeSelectWrapper>
                <NativeSelectLabel required>Event Date</NativeSelectLabel>
                <NativeSelect variant="orange">
                  <option value="">Select date</option>
                  <option value="2025-10-27">Monday, Oct 27, 2025</option>
                  <option value="2025-10-28">Tuesday, Oct 28, 2025</option>
                  <option value="2025-10-29">Wednesday, Oct 29, 2025</option>
                  <option value="2025-10-30">Thursday, Oct 30, 2025</option>
                  <option value="2025-10-31">Friday, Oct 31, 2025</option>
                  <option value="2025-11-01">Saturday, Nov 1, 2025</option>
                  <option value="2025-11-02">Sunday, Nov 2, 2025</option>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel required>Time Slot</NativeSelectLabel>
                <NativeSelect variant="pink">
                  <option value="">Select time</option>
                  <NativeSelectGroup label="Morning">
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Afternoon">
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Evening">
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </NativeSelectGroup>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel required>Ticket Type</NativeSelectLabel>
                <NativeSelect variant="indigo">
                  <option value="">Select ticket</option>
                  <option value="vip">VIP - $150 (Front Row)</option>
                  <option value="premium">Premium - $100 (Rows 2-5)</option>
                  <option value="standard">Standard - $60 (Rows 6-15)</option>
                  <option value="balcony">Balcony - $40 (Upper Level)</option>
                  <option value="general">General - $25 (Standing)</option>
                </NativeSelect>
              </NativeSelectWrapper>
            </div>
          </div>

          {/* Project Management Dashboard */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Project Management Dashboard
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage tasks and assign team members
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NativeSelectWrapper>
                <NativeSelectLabel required>Task Priority</NativeSelectLabel>
                <NativeSelect variant="danger">
                  <option value="">Set priority</option>
                  <option value="critical">🔴 Critical - Urgent</option>
                  <option value="high">🟠 High Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="low">🟢 Low Priority</option>
                </NativeSelect>
                <NativeSelectDescription>
                  Higher priority tasks appear first
                </NativeSelectDescription>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel required>Assign To</NativeSelectLabel>
                <NativeSelect variant="teal">
                  <option value="">Select team member</option>
                  <NativeSelectGroup label="Development Team">
                    <option value="john-dev">John Smith (Frontend)</option>
                    <option value="sarah-dev">Sarah Johnson (Backend)</option>
                    <option value="mike-dev">Mike Chen (Full Stack)</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Design Team">
                    <option value="emma-des">Emma Williams (UI/UX)</option>
                    <option value="alex-des">Alex Martinez (Graphic)</option>
                  </NativeSelectGroup>
                  <NativeSelectGroup label="Management">
                    <option value="lisa-mgr">Lisa Anderson (PM)</option>
                    <option value="david-mgr">
                      David Brown (Scrum Master)
                    </option>
                  </NativeSelectGroup>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel>Sprint</NativeSelectLabel>
                <NativeSelect variant="warning">
                  <option value="">Select sprint</option>
                  <option value="current">Current Sprint (Week 43)</option>
                  <option value="next">Next Sprint (Week 44)</option>
                  <option value="future">Future Sprint (Week 45+)</option>
                  <option value="backlog">Backlog</option>
                </NativeSelect>
              </NativeSelectWrapper>

              <NativeSelectWrapper>
                <NativeSelectLabel>Status</NativeSelectLabel>
                <NativeSelect variant="success">
                  <option value="todo">📋 To Do</option>
                  <option value="in-progress">⏳ In Progress</option>
                  <option value="review">👀 In Review</option>
                  <option value="testing">🧪 Testing</option>
                  <option value="done">✅ Done</option>
                  <option value="blocked">🚫 Blocked</option>
                </NativeSelect>
              </NativeSelectWrapper>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
