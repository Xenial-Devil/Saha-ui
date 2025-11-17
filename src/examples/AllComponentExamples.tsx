// This file aggregates all component showcases
// Each component has its own example file for better organization

// Color System
import ColorPalette from "./ColorPalette";

// Basic Components
// (Basic component examples are intentionally not imported here to avoid unused-import
// errors; these examples are available in `src/examples` and can be imported on-demand.)

// Layout Components
// Layout examples are intentionally not eagerly imported to avoid unused-import
// diagnostics; import them when rendering individual pages/examples.

// Card & Content
// Card & content examples are not imported here for the same reason as above.

// Navigation
import { BreadcrumbExample } from "./BreadcrumbExample";
import NavigationMenuExample from "./NavigationMenuExample";
import MenubarExample from "./MenubarExample";
import { PaginationExample } from "./PaginationExample";
import { TabExample } from "./TabExample";
import { StepsExample } from "./StepsExample";
import AppBarExample from "./AppBarExample";
import BottomNavigationExample from "./BottomNavigationExample";

// Data Display
import { TableExample } from "./TableExample";
import { DataTableExample } from "./DataTableExample";
import { ListExample } from "./ListExample";
import { TreeExample } from "./TreeExample";
import { TimelineExample } from "./TimelineExample";
import { AccordionExample } from "./AccordionExample";
import CollapsibleExample from "./CollapsibleExample";

// Form Components
import FormExample from "./FormExample";
import { InputExample } from "./InputExample";
import TextAreaExample from "./TextAreaExample";
import { SelectExample } from "./SelectExample";
import { AutocompleteExample } from "./AutocompleteExample";
import ComboboxExample from "./ComboboxExample";
import NativeSelectExample from "./NativeSelectExample";
import { CheckboxExample } from "./CheckboxExample";
import { CheckboxGroupExample } from "./CheckboxGroupExample";
import { RadioExample } from "./RadioExample";
import { RadioAdvancedExample } from "./RadioAdvancedExample";
import { SwitchExample } from "./SwitchExample";
import { ToggleExample } from "./ToggleExample";
import ToggleGroupExample from "./ToggleGroupExample";
import { SliderExample } from "./SliderExample";
import { RatingExample } from "./RatingExample";
import { DatePickerExample } from "./DatePickerExample";
import { CalendarExample } from "./CalendarExample";
import InputOTPExample from "./InputOTPExample";
import { FieldExample } from "./FieldExample";
import LabelExample from "./LabelExample";
import UploadExample from "./UploadExample";
import { TagExample } from "./TagExample";
import { TagInputExample } from "./TagInputExample";
import ColorPickerExample from "./ColorPickerExample";
import SegmentedExample from "./SegmentedExample";

// Feedback Components
import { AlertExample } from "./AlertExample";
import { ToastExample } from "./ToastExample";
import { SonnerExample } from "./SonnerExample";
import ProgressExample from "./ProgressExample";
import SpinnerExample from "./SpinnerExample";
import { SkeletonExample } from "./SkeletonExample";
import ResultExample from "./ResultExample";

// Overlay Components
import DialogExample from "./DialogExample";
import { DrawerExample } from "./DrawerExample";
import PopoverExample from "./PopoverExample";
import { TooltipExample } from "./TooltipExample";
import HoverCardExample from "./HoverCardExample";
import { DropdownExample } from "./DropdownExample";
import ContextMenuExample from "./ContextMenuExample";
import CommandExample from "./CommandExample";

// Media Components
// Media & utility examples are intentionally not eagerly imported here to avoid
// unused-import TypeScript diagnostics. Import examples on demand in a demo
// page or story file instead.

// Theme Components
import ThemeProviderExample from "./ThemeProviderExample";
import ThemeToggleExample from "./ThemeToggleExample";

// Utility Components (continued)
import SpeedDialExample from "./SpeedDialExample";
import StepperExample from "./StepperExample";

// AsChild Examples

export const AllComponentExamples = () => {
  return (
    <div className="space-y-8">
      {/* Color System */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Color System</h2>
        <ColorPalette />
      </div>

      {/* Basic Components */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Basic Components</h2>
        <ButtonExample />
        <ButtonGroupExample />
        <BadgeExample />
        <ChipExample />
        <LinkExample />
        <SeparatorExample />
        <KbdExample />
      </div> */}

      {/* Layout Components */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Layout Components</h2>
        <ContainerExample />
        <StackExample />
        <GridExample />
        <SectionExample />
        <AspectRatioExample />
      </div> */}

      {/* Cards & Content */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Cards & Content</h2>
        <CardExample />
        <AvatarExample />
        <ImageExample />
        <EmptyExample />
      </div> */}

      {/* Navigation Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Navigation</h2>
        <BreadcrumbExample />
        <NavigationMenuExample />
        <MenubarExample />
        <PaginationExample />
        <TabExample />
        <StepsExample />
        <AppBarExample />
        <BottomNavigationExample />
      </div>

      {/* Data Display */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Data Display</h2>
        <TableExample />
        <DataTableExample />
        <ListExample />
        <TreeExample />
        <TimelineExample />
        <AccordionExample />
        <CollapsibleExample />
      </div>

      {/* Form Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Form Components</h2>
        <FormExample />
        <InputExample />
        <TextAreaExample />
        <SelectExample />
        <AutocompleteExample />
        <ComboboxExample />
        <NativeSelectExample />
        <CheckboxExample />
        <CheckboxGroupExample />
        <RadioExample />
        <RadioAdvancedExample />
        <SwitchExample />
        <ToggleExample />
        <ToggleGroupExample />
        <SliderExample />
        <RatingExample />
        <DatePickerExample />
        <CalendarExample />
        <InputOTPExample />
        <FieldExample />
        <LabelExample />
        <UploadExample />
        <TagExample />
        <TagInputExample />
        <ColorPickerExample />
        <SegmentedExample />
      </div>

      {/* Feedback Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Feedback</h2>
        <AlertExample />
        <ToastExample />
        <SonnerExample />
        <ProgressExample />
        <SpinnerExample />
        <SkeletonExample />
        <ResultExample />
      </div>

      {/* Overlay Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Overlays</h2>
        <DialogExample />
        <DrawerExample />
        <PopoverExample />
        <TooltipExample />
        <HoverCardExample />
        <DropdownExample />
        <ContextMenuExample />
        <CommandExample />
      </div>

      {/* Media Components */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Media</h2>
        <CarouselExample />
        <PlayButtonExample />
      </div> */}

      {/* Utility Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Utilities</h2>
        {/* <ScrollAreaExample />
        <ResizableExample />
        <ItemExample />
        <FloatingActionButtonExample /> */}
        <SpeedDialExample />
        <StepperExample />
      </div>

      {/* Theme Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Theme</h2>
        <ThemeProviderExample />
        <ThemeToggleExample />
      </div>

      {/* Typography */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Typography</h2>
        <TypographyExample />
      </div> */}

      {/* Advanced Components */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          Advanced Components
        </h2>
        <TextEditorExample />
        <CodeEditorFrameworkExamples />
        <ChartExamples />
      </div> */}

      {/* Composition Pattern */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          Composition (asChild)
        </h2>
        <AsChildExamples />
      </div> */}
    </div>
  );
};

export default AllComponentExamples;
