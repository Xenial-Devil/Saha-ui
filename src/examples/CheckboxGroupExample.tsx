// CheckboxGroupExample.tsx
import { useState } from "react";
import { CheckboxGroup, Checkbox } from "../components/Checkbox";
import {
  Star,
  Heart,
  Crown,
  Zap,
  Shield,
  Award,
  Rocket,
  Globe,
  Cloud,
  Database,
  Lock,
  Bell,
  Mail,
  Eye,
  Cpu,
  Code,
  Flame,
  Leaf,
  Diamond,
  Target,
  Sparkles,
  Package,
  MapPin,
  Calendar,
  Clock,
  User,
  Users,
  Building2,
  Home,
  Car,
  Plane,
  Train,
  Bike,
  ShoppingCart,
  Gift,
  Tag,
  Percent,
  DollarSign,
  TrendingUp,
  CreditCard,
  Wallet,
  Camera,
  Image,
  Video,
  Mic,
  Music,
  Headphones,
  Gamepad2,
  Dumbbell,
  Coffee,
  Utensils,
  Wine,
  Pizza,
  Apple,
  Salad,
  Fish,
  Beef,
  Egg,
  Milk,
  Wheat,
  Nut,
  Cookie,
  IceCream,
  Cake,
  GraduationCap,
  Briefcase,
  Baby,
  PawPrint,
  Shirt,
  Glasses,
  Watch,
  Palette,
  Brush,
  PenTool,
  Wrench,
  Settings,
  HelpCircle,
  MessageSquare,
  Phone,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Tv,
  Wifi,
  Bluetooth,
  Battery,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Thermometer,
  Wind,
  Umbrella,
  TreeDeciduous,
  Flower2,
  Mountain,
  Waves,
  Tent,
  Compass,
  Map,
  Flag,
  Trophy,
  Medal,
  Gem,
  Key,
  FileText,
  Folder,
  Archive,
  Download,
  Upload,
  Share2,
  Link,
  Bookmark,
  Tag as TagIcon,
  Search,
  Filter,
  SortAsc,
  LayoutGrid,
  List,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle as Help,
  X,
  Check,
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  Clipboard,
  Save,
  RefreshCw,
  RotateCcw,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Heart as HeartIcon,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  Inbox,
  AtSign,
  Hash,
  Smile,
} from "lucide-react";

export const CheckboxGroupExample = () => {
  // Basic states
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "notifications",
  ]);
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  // Real-life example states
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedExportFormats, setSelectedExportFormats] = useState<string[]>(
    []
  );
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedSocialAccounts, setSelectedSocialAccounts] = useState<
    string[]
  >([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          CheckboxGroup Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Advanced checkbox group with multiple layouts, variants, shapes,
          animations, and features.
        </p>
      </div>

      {/* ==================== REAL-LIFE EXAMPLES ==================== */}

      <div className="border-b border-border pb-4 mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          🌍 Real-Life Use Cases
        </h2>
        <p className="text-muted-foreground">
          Practical implementations for everyday applications
        </p>
      </div>

      {/* E-commerce Product Filters */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Filter className="w-5 h-5" /> E-commerce Product Filters
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Size Filter */}
            <CheckboxGroup
              label="Size"
              value={selectedSizes}
              onChange={setSelectedSizes}
              direction="horizontal"
              gap="xs"
              size="sm"
              colorScheme="blue"
              shape="circle"
              options={[
                { value: "xs", label: "XS" },
                { value: "s", label: "S" },
                { value: "m", label: "M" },
                { value: "l", label: "L" },
                { value: "xl", label: "XL" },
                { value: "xxl", label: "XXL" },
              ]}
            />

            {/* Color Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Color</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "black", color: "bg-black" },
                  { value: "white", color: "bg-white border" },
                  { value: "red", color: "bg-red-500" },
                  { value: "blue", color: "bg-blue-500" },
                  { value: "green", color: "bg-green-500" },
                  { value: "yellow", color: "bg-yellow-500" },
                  { value: "purple", color: "bg-purple-500" },
                  { value: "pink", color: "bg-pink-500" },
                ].map((item) => (
                  <label key={item.value} className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedColors.includes(item.value)}
                      onChange={(e) => {
                        setSelectedColors(
                          e.target.checked
                            ? [...selectedColors, item.value]
                            : selectedColors.filter((c) => c !== item.value)
                        );
                      }}
                    />
                    <div
                      className={`w-8 h-8 rounded-full ${item.color} ${
                        selectedColors.includes(item.value)
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      }`}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <CheckboxGroup
              label="Brand"
              value={selectedBrands}
              onChange={setSelectedBrands}
              size="sm"
              colorScheme="primary"
              showCount
              options={[
                { value: "nike", label: "Nike", badge: "124" },
                { value: "adidas", label: "Adidas", badge: "98" },
                { value: "puma", label: "Puma", badge: "67" },
                { value: "reebok", label: "Reebok", badge: "45" },
                { value: "newbalance", label: "New Balance", badge: "32" },
              ]}
            />
          </div>

          {/* Price Range */}
          <div className="mt-6 pt-6 border-t">
            <CheckboxGroup
              label="Price Range"
              value={selectedFilters}
              onChange={setSelectedFilters}
              direction="horizontal"
              size="sm"
              colorScheme="green"
              options={[
                { value: "under25", label: "Under $25" },
                { value: "25to50", label: "$25 - $50" },
                { value: "50to100", label: "$50 - $100" },
                { value: "100to200", label: "$100 - $200" },
                { value: "over200", label: "Over $200" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Restaurant/Food Ordering - Dietary Preferences */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Utensils className="w-5 h-5" /> Food Ordering - Dietary Preferences
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dietary Restrictions */}
            <CheckboxGroup
              label="Dietary Preferences"
              description="Select all that apply to your diet"
              value={selectedDietary}
              onChange={setSelectedDietary}
              colorScheme="green"
              checkStyle="leaf"
              animation="scale"
              options={[
                {
                  value: "vegetarian",
                  label: "Vegetarian",
                  icon: <Leaf className="w-4 h-4" />,
                },
                {
                  value: "vegan",
                  label: "Vegan",
                  icon: <Salad className="w-4 h-4" />,
                },
                {
                  value: "pescatarian",
                  label: "Pescatarian",
                  icon: <Fish className="w-4 h-4" />,
                },
                {
                  value: "keto",
                  label: "Keto",
                  icon: <Beef className="w-4 h-4" />,
                },
                {
                  value: "halal",
                  label: "Halal",
                  icon: <Check className="w-4 h-4" />,
                },
                {
                  value: "kosher",
                  label: "Kosher",
                  icon: <Check className="w-4 h-4" />,
                },
                {
                  value: "glutenFree",
                  label: "Gluten-Free",
                  icon: <Wheat className="w-4 h-4" />,
                },
                {
                  value: "dairyFree",
                  label: "Dairy-Free",
                  icon: <Milk className="w-4 h-4" />,
                },
              ]}
            />

            {/* Allergen Warnings */}
            <CheckboxGroup
              label="Allergen Alerts"
              description="Select allergens you need to avoid"
              value={selectedAllergens}
              onChange={setSelectedAllergens}
              colorScheme="error"
              checkStyle="shield"
              animation="shake"
              options={[
                {
                  value: "peanuts",
                  label: "Peanuts",
                  icon: <Nut className="w-4 h-4" />,
                },
                {
                  value: "treeNuts",
                  label: "Tree Nuts",
                  icon: <Nut className="w-4 h-4" />,
                },
                {
                  value: "dairy",
                  label: "Dairy",
                  icon: <Milk className="w-4 h-4" />,
                },
                {
                  value: "eggs",
                  label: "Eggs",
                  icon: <Egg className="w-4 h-4" />,
                },
                {
                  value: "wheat",
                  label: "Wheat/Gluten",
                  icon: <Wheat className="w-4 h-4" />,
                },
                { value: "soy", label: "Soy" },
                {
                  value: "shellfish",
                  label: "Shellfish",
                  icon: <Fish className="w-4 h-4" />,
                },
                { value: "sesame", label: "Sesame" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Hotel/Airbnb - Amenities Selection */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Building2 className="w-5 h-5" /> Hotel Booking - Amenities Filter
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Filter by Amenities"
            description="Select the amenities you need"
            value={selectedAmenities}
            onChange={setSelectedAmenities}
            direction="horizontal"
            columns={4}
            gap="md"
            colorScheme="blue"
            checkStyle="checkCircle"
            options={[
              {
                value: "wifi",
                label: "Free WiFi",
                icon: <Wifi className="w-4 h-4" />,
              },
              {
                value: "parking",
                label: "Free Parking",
                icon: <Car className="w-4 h-4" />,
              },
              {
                value: "pool",
                label: "Swimming Pool",
                icon: <Waves className="w-4 h-4" />,
              },
              {
                value: "gym",
                label: "Fitness Center",
                icon: <Dumbbell className="w-4 h-4" />,
              },
              {
                value: "spa",
                label: "Spa & Wellness",
                icon: <Sparkles className="w-4 h-4" />,
              },
              {
                value: "restaurant",
                label: "Restaurant",
                icon: <Utensils className="w-4 h-4" />,
              },
              {
                value: "bar",
                label: "Bar/Lounge",
                icon: <Wine className="w-4 h-4" />,
              },
              {
                value: "roomService",
                label: "Room Service",
                icon: <Coffee className="w-4 h-4" />,
              },
              {
                value: "ac",
                label: "Air Conditioning",
                icon: <Thermometer className="w-4 h-4" />,
              },
              {
                value: "petFriendly",
                label: "Pet Friendly",
                icon: <PawPrint className="w-4 h-4" />,
              },
              {
                value: "breakfast",
                label: "Breakfast Included",
                icon: <Utensils className="w-4 h-4" />,
              },
              {
                value: "laundry",
                label: "Laundry Service",
                icon: <Shirt className="w-4 h-4" />,
              },
            ]}
          />
        </div>
      </section>

      {/* Payment Methods Selection */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> Checkout - Payment Methods
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 max-w-2xl">
          <CheckboxGroup
            label="Accepted Payment Methods"
            description="Select which payment methods you accept"
            value={selectedPayment}
            onChange={setSelectedPayment}
            card
            colorScheme="primary"
            checkStyle="checkCircle"
            options={[
              {
                value: "visa",
                label: "Visa",
                description: "Credit & Debit Cards",
                icon: <CreditCard className="w-5 h-5" />,
              },
              {
                value: "mastercard",
                label: "Mastercard",
                description: "Credit & Debit Cards",
                icon: <CreditCard className="w-5 h-5" />,
              },
              {
                value: "paypal",
                label: "PayPal",
                description: "Pay with your PayPal account",
                icon: <Wallet className="w-5 h-5" />,
              },
              {
                value: "applepay",
                label: "Apple Pay",
                description: "Quick payment with Face ID",
                icon: <Smartphone className="w-5 h-5" />,
                badge: "Fast",
              },
              {
                value: "crypto",
                label: "Cryptocurrency",
                description: "Bitcoin, Ethereum, and more",
                icon: <DollarSign className="w-5 h-5" />,
                badge: "New",
              },
            ]}
          />
        </div>
      </section>

      {/* Shipping Options */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Package className="w-5 h-5" /> Checkout - Shipping Options
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 max-w-2xl">
          <CheckboxGroup
            label="Additional Shipping Services"
            description="Select any additional services"
            value={selectedShipping}
            onChange={setSelectedShipping}
            colorScheme="blue"
            options={[
              {
                value: "express",
                label: "Express Shipping",
                description: "2-3 business days delivery",
                badge: "+$9.99",
                icon: <Zap className="w-4 h-4" />,
              },
              {
                value: "signature",
                label: "Signature Required",
                description: "Package requires signature on delivery",
                badge: "+$2.99",
                icon: <Edit className="w-4 h-4" />,
              },
              {
                value: "insurance",
                label: "Shipping Insurance",
                description: "Protect your package up to $500",
                badge: "+$4.99",
                icon: <Shield className="w-4 h-4" />,
                recommended: true,
              },
              {
                value: "giftWrap",
                label: "Gift Wrapping",
                description: "Beautiful gift wrapping with card",
                badge: "+$5.99",
                icon: <Gift className="w-4 h-4" />,
              },
            ]}
          />
        </div>
      </section>

      {/* User Role Permissions */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Lock className="w-5 h-5" /> Admin Panel - User Permissions
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Role Permissions"
            description="Configure what this role can access"
            value={selectedPermissions}
            onChange={setSelectedPermissions}
            showSelectAll
            selectAllLabel="Grant All Permissions"
            showCount
            colorScheme="purple"
            checkStyle="shield"
            columns={3}
            gap="md"
            options={[
              {
                value: "users.view",
                label: "View Users",
                icon: <Eye className="w-4 h-4" />,
              },
              {
                value: "users.create",
                label: "Create Users",
                icon: <Plus className="w-4 h-4" />,
              },
              {
                value: "users.edit",
                label: "Edit Users",
                icon: <Edit className="w-4 h-4" />,
              },
              {
                value: "users.delete",
                label: "Delete Users",
                icon: <Trash2 className="w-4 h-4" />,
              },
              {
                value: "content.view",
                label: "View Content",
                icon: <Eye className="w-4 h-4" />,
              },
              {
                value: "content.create",
                label: "Create Content",
                icon: <Plus className="w-4 h-4" />,
              },
              {
                value: "content.edit",
                label: "Edit Content",
                icon: <Edit className="w-4 h-4" />,
              },
              {
                value: "content.delete",
                label: "Delete Content",
                icon: <Trash2 className="w-4 h-4" />,
              },
              {
                value: "settings.view",
                label: "View Settings",
                icon: <Settings className="w-4 h-4" />,
              },
              {
                value: "settings.edit",
                label: "Edit Settings",
                icon: <Settings className="w-4 h-4" />,
              },
              {
                value: "analytics.view",
                label: "View Analytics",
                icon: <TrendingUp className="w-4 h-4" />,
              },
              {
                value: "billing.manage",
                label: "Manage Billing",
                icon: <CreditCard className="w-4 h-4" />,
                badge: "Admin",
              },
            ]}
          />
        </div>
      </section>

      {/* Export Options */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Download className="w-5 h-5" /> Data Export - File Formats
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 max-w-lg">
          <CheckboxGroup
            label="Export Formats"
            description="Select file formats for export"
            value={selectedExportFormats}
            onChange={setSelectedExportFormats}
            direction="horizontal"
            colorScheme="blue"
            checkStyle="check"
            maxSelection={3}
            showCount
            options={[
              {
                value: "csv",
                label: "CSV",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                value: "xlsx",
                label: "Excel",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                value: "pdf",
                label: "PDF",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                value: "json",
                label: "JSON",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "xml",
                label: "XML",
                icon: <Code className="w-4 h-4" />,
              },
            ]}
          />
        </div>
      </section>

      {/* Meeting Scheduler - Day Selection */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Meeting Scheduler - Availability
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Days Selection */}
            <CheckboxGroup
              label="Available Days"
              description="Select days you're available for meetings"
              value={selectedDays}
              onChange={setSelectedDays}
              direction="horizontal"
              colorScheme="primary"
              shape="circle"
              size="sm"
              gap="xs"
              options={[
                { value: "mon", label: "Mon" },
                { value: "tue", label: "Tue" },
                { value: "wed", label: "Wed" },
                { value: "thu", label: "Thu" },
                { value: "fri", label: "Fri" },
                { value: "sat", label: "Sat" },
                { value: "sun", label: "Sun" },
              ]}
            />

            {/* Time Slots */}
            <CheckboxGroup
              label="Preferred Time Slots"
              description="Select your preferred meeting times"
              value={selectedTimeSlots}
              onChange={setSelectedTimeSlots}
              colorScheme="green"
              options={[
                {
                  value: "morning",
                  label: "Morning (8AM - 12PM)",
                  icon: <Sun className="w-4 h-4" />,
                },
                {
                  value: "afternoon",
                  label: "Afternoon (12PM - 5PM)",
                  icon: <Sun className="w-4 h-4" />,
                },
                {
                  value: "evening",
                  label: "Evening (5PM - 9PM)",
                  icon: <Moon className="w-4 h-4" />,
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Social Account Linking */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Link className="w-5 h-5" /> Profile - Connect Social Accounts
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Connected Accounts"
            description="Link your social media accounts for easier sharing"
            value={selectedSocialAccounts}
            onChange={setSelectedSocialAccounts}
            card
            colorScheme="primary"
            checkStyle="checkCircle"
            options={[
              {
                value: "google",
                label: "Google",
                description: "Sign in with Google account",
                icon: <Globe className="w-5 h-5 text-red-500" />,
              },
              {
                value: "facebook",
                label: "Facebook",
                description: "Connect your Facebook profile",
                icon: <Globe className="w-5 h-5 text-blue-600" />,
              },
              {
                value: "twitter",
                label: "Twitter / X",
                description: "Share updates to Twitter",
                icon: <AtSign className="w-5 h-5 text-sky-500" />,
              },
              {
                value: "linkedin",
                label: "LinkedIn",
                description: "Professional network integration",
                icon: <Briefcase className="w-5 h-5 text-blue-700" />,
              },
              {
                value: "github",
                label: "GitHub",
                description: "Connect your GitHub account",
                icon: <Code className="w-5 h-5" />,
                badge: "Developer",
              },
            ]}
          />
        </div>
      </section>

      {/* Language Preferences */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Globe className="w-5 h-5" /> Settings - Language Preferences
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 max-w-lg">
          <CheckboxGroup
            label="Content Languages"
            description="Select languages for content you want to see"
            value={selectedLanguages}
            onChange={setSelectedLanguages}
            colorScheme="blue"
            checkStyle="check"
            showCount
            options={[
              { value: "en", label: "🇺🇸 English" },
              { value: "es", label: "🇪🇸 Spanish" },
              { value: "fr", label: "🇫🇷 French" },
              { value: "de", label: "🇩🇪 German" },
              { value: "it", label: "🇮🇹 Italian" },
              { value: "pt", label: "🇵🇹 Portuguese" },
              { value: "zh", label: "🇨🇳 Chinese" },
              { value: "ja", label: "🇯🇵 Japanese" },
              { value: "ko", label: "🇰🇷 Korean" },
              { value: "ar", label: "🇸🇦 Arabic" },
            ]}
          />
        </div>
      </section>

      {/* Content Categories - Blog/News */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <LayoutGrid className="w-5 h-5" /> News Feed - Category Preferences
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Topics of Interest"
            description="Customize your feed by selecting topics"
            value={selectedCategories}
            onChange={setSelectedCategories}
            columns={4}
            gap="sm"
            colorScheme="purple"
            animation="bounce"
            options={[
              {
                value: "technology",
                label: "Technology",
                icon: <Laptop className="w-4 h-4" />,
              },
              {
                value: "business",
                label: "Business",
                icon: <Briefcase className="w-4 h-4" />,
              },
              {
                value: "science",
                label: "Science",
                icon: <Sparkles className="w-4 h-4" />,
              },
              {
                value: "health",
                label: "Health",
                icon: <HeartIcon className="w-4 h-4" />,
              },
              {
                value: "sports",
                label: "Sports",
                icon: <Dumbbell className="w-4 h-4" />,
              },
              {
                value: "entertainment",
                label: "Entertainment",
                icon: <Music className="w-4 h-4" />,
              },
              {
                value: "travel",
                label: "Travel",
                icon: <Plane className="w-4 h-4" />,
              },
              {
                value: "food",
                label: "Food & Drink",
                icon: <Utensils className="w-4 h-4" />,
              },
              {
                value: "fashion",
                label: "Fashion",
                icon: <Shirt className="w-4 h-4" />,
              },
              {
                value: "gaming",
                label: "Gaming",
                icon: <Gamepad2 className="w-4 h-4" />,
              },
              {
                value: "art",
                label: "Art & Design",
                icon: <Palette className="w-4 h-4" />,
              },
              {
                value: "education",
                label: "Education",
                icon: <GraduationCap className="w-4 h-4" />,
              },
            ]}
          />
        </div>
      </section>

      {/* Job Application - Skills Selection */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> Job Application - Skills
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Technical Skills"
            description="Select all skills that apply (minimum 3, maximum 10)"
            value={selectedSkills}
            onChange={setSelectedSkills}
            showSelectAll={false}
            showCount
            minSelection={3}
            maxSelection={10}
            columns={4}
            colorScheme="gradientOcean"
            fillStyle="gradient"
            animation="scale"
            options={[
              {
                value: "javascript",
                label: "JavaScript",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "typescript",
                label: "TypeScript",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "react",
                label: "React",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "vue",
                label: "Vue.js",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "angular",
                label: "Angular",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "nodejs",
                label: "Node.js",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "python",
                label: "Python",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "java",
                label: "Java",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "csharp",
                label: "C#",
                icon: <Code className="w-4 h-4" />,
              },
              { value: "go", label: "Go", icon: <Code className="w-4 h-4" /> },
              {
                value: "rust",
                label: "Rust",
                icon: <Code className="w-4 h-4" />,
              },
              {
                value: "sql",
                label: "SQL",
                icon: <Database className="w-4 h-4" />,
              },
              {
                value: "mongodb",
                label: "MongoDB",
                icon: <Database className="w-4 h-4" />,
              },
              {
                value: "docker",
                label: "Docker",
                icon: <Package className="w-4 h-4" />,
              },
              {
                value: "kubernetes",
                label: "Kubernetes",
                icon: <Cloud className="w-4 h-4" />,
              },
              {
                value: "aws",
                label: "AWS",
                icon: <Cloud className="w-4 h-4" />,
              },
            ]}
          />
        </div>
      </section>

      {/* ==================== COMPONENT SHOWCASE ==================== */}

      <div className="border-b border-border pb-4 mb-8 mt-16">
        <h2 className="text-2xl font-bold text-foreground">
          🎨 Component Features Showcase
        </h2>
        <p className="text-muted-foreground">
          Explore all the customization options
        </p>
      </div>

      {/* Basic Vertical Group */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Basic Vertical Group
        </h3>
        <CheckboxGroup
          label="Select your interests"
          description="Choose one or more topics you're interested in"
          value={selectedInterests}
          onChange={setSelectedInterests}
          options={[
            { value: "coding", label: "Coding" },
            { value: "design", label: "Design" },
            { value: "marketing", label: "Marketing" },
            { value: "writing", label: "Writing" },
          ]}
        />
      </section>

      {/* Different Shapes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Different Shapes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CheckboxGroup
            label="Square Shape"
            shape="square"
            colorScheme="red"
            options={[
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Circle Shape"
            shape="circle"
            colorScheme="blue"
            options={[
              { value: "opt3", label: "Option 1" },
              { value: "opt4", label: "Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Diamond Shape"
            shape="diamond"
            colorScheme="purple"
            options={[
              { value: "opt5", label: "Option 1" },
              { value: "opt6", label: "Option 2" },
            ]}
          />
        </div>
      </section>

      {/* Different Check Styles */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Different Check Styles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CheckboxGroup
            label="Star Check"
            checkStyle="star"
            colorScheme="yellow"
            options={[
              { value: "s1", label: "Favorite" },
              { value: "s2", label: "Bookmark" },
            ]}
          />
          <CheckboxGroup
            label="Heart Check"
            checkStyle="heart"
            colorScheme="red"
            options={[
              { value: "h1", label: "Like" },
              { value: "h2", label: "Love" },
            ]}
          />
          <CheckboxGroup
            label="Lightning Check"
            checkStyle="lightning"
            colorScheme="amber"
            options={[
              { value: "l1", label: "Fast" },
              { value: "l2", label: "Quick" },
            ]}
          />
          <CheckboxGroup
            label="Crown Check"
            checkStyle="crown"
            colorScheme="purple"
            options={[
              { value: "c1", label: "Premium" },
              { value: "c2", label: "VIP" },
            ]}
          />
        </div>
      </section>

      {/* Fill Styles */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Fill Styles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CheckboxGroup
            label="Filled Style"
            fillStyle="filled"
            colorScheme="blue"
            options={[
              { value: "f1", label: "Option 1" },
              { value: "f2", label: "Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Outline Style"
            fillStyle="outline"
            colorScheme="purple"
            options={[
              { value: "o1", label: "Option 1" },
              { value: "o2", label: "Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Gradient Style"
            fillStyle="gradient"
            colorScheme="gradientSunset"
            options={[
              { value: "g1", label: "Option 1" },
              { value: "g2", label: "Option 2" },
            ]}
          />
        </div>
      </section>

      {/* Card Layout with Icons */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Card Layout with Icons
        </h3>
        <CheckboxGroup
          label="Choose Your Plan Features"
          description="Select the features you want to include"
          card
          value={selectedPlan}
          onChange={setSelectedPlan}
          colorScheme="primary"
          checkStyle="checkCircle"
          options={[
            {
              value: "basic",
              label: "Basic Support",
              description: "Email support within 48 hours",
              icon: <Star className="w-5 h-5" />,
              badge: "Free",
            },
            {
              value: "priority",
              label: "Priority Support",
              description: "24/7 chat and email support",
              icon: <Zap className="w-5 h-5" />,
              badge: "$9/mo",
              recommended: true,
            },
            {
              value: "premium",
              label: "Premium Features",
              description: "Advanced analytics and reporting",
              icon: <Crown className="w-5 h-5" />,
              badge: "$29/mo",
            },
          ]}
        />
      </section>

      {/* Gradient Color Schemes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Gradient Color Schemes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxGroup
            label="Sunset Gradient"
            colorScheme="gradientSunset"
            fillStyle="gradient"
            options={[
              { value: "gs1", label: "Warm Option 1" },
              { value: "gs2", label: "Warm Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Ocean Gradient"
            colorScheme="gradientOcean"
            fillStyle="gradient"
            options={[
              { value: "go1", label: "Cool Option 1" },
              { value: "go2", label: "Cool Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Aurora Gradient"
            colorScheme="gradientAurora"
            fillStyle="gradient"
            options={[
              { value: "ga1", label: "Magic Option 1" },
              { value: "ga2", label: "Magic Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Neon Gradient"
            colorScheme="gradientNeon"
            fillStyle="gradient"
            options={[
              { value: "gn1", label: "Neon Option 1" },
              { value: "gn2", label: "Neon Option 2" },
            ]}
          />
        </div>
      </section>

      {/* Select All with Constraints */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Select All with Constraints
        </h3>
        <CheckboxGroup
          label="Select Notification Channels"
          description="Choose 1-3 notification channels"
          value={selectedNotifications}
          onChange={setSelectedNotifications}
          showSelectAll
          selectAllLabel="Select All Channels"
          showCount
          minSelection={1}
          maxSelection={3}
          colorScheme="blue"
          options={[
            {
              value: "email",
              label: "Email",
              icon: <Mail className="w-4 h-4" />,
            },
            {
              value: "push",
              label: "Push Notifications",
              icon: <Bell className="w-4 h-4" />,
            },
            {
              value: "sms",
              label: "SMS",
              icon: <MessageSquare className="w-4 h-4" />,
            },
            {
              value: "slack",
              label: "Slack",
              icon: <MessageSquare className="w-4 h-4" />,
            },
            {
              value: "webhook",
              label: "Webhook",
              icon: <Globe className="w-4 h-4" />,
            },
          ]}
        />
      </section>

      {/* Cloud Services Card Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          Cloud Services Selection
        </h3>
        <CheckboxGroup
          label="Select Cloud Services"
          description="Build your infrastructure"
          card
          colorScheme="gradientOcean"
          fillStyle="gradient"
          checkStyle="shield"
          showCount
          options={[
            {
              value: "compute",
              label: "Compute Engine",
              description: "Scalable virtual machines",
              icon: <Cpu className="w-6 h-6" />,
              badge: "$0.05/hr",
            },
            {
              value: "storage",
              label: "Cloud Storage",
              description: "Object storage service",
              icon: <Database className="w-6 h-6" />,
              badge: "$0.02/GB",
              recommended: true,
            },
            {
              value: "cdn",
              label: "CDN Network",
              description: "Global content delivery",
              icon: <Globe className="w-6 h-6" />,
              badge: "$0.01/GB",
            },
            {
              value: "security",
              label: "Security Suite",
              description: "DDoS & WAF protection",
              icon: <Shield className="w-6 h-6" />,
              badge: "$50/mo",
            },
          ]}
        />
      </section>
    </div>
  );
};

export default CheckboxGroupExample;
