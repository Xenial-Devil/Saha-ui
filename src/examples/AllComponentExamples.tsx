// This file aggregates all component showcases
// Each component has its own example file for better organization

// Color System
import ColorPalette from "./ColorPalette";

// Basic Components
import { ButtonExample } from "./ButtonExample";
import { ButtonGroupExample } from "./ButtonGroupExample";
import { BadgeExample } from "./BadgeExample";
import { ChipExample } from "./ChipExample";
import { LinkExample } from "./LinkExample";
import { SeparatorExample } from "./SeparatorExample";
import KbdExample from "./KbdExample";

// Layout Components
import { ContainerExample } from "./ContainerExample";
import { StackExample } from "./StackExample";
import { GridExample } from "./GridExample";
import { SectionExample } from "./SectionExample";
import { AspectRatioExample } from "./AspectRatioExample";

// Card & Content
import { CardExample } from "./CardExample";
import { AvatarExample } from "./AvatarExample";
import { ImageExample } from "./ImageExample";
import { EmptyExample } from "./EmptyExample";

// Navigation
import { BreadcrumbExample } from "./BreadcrumbExample";
import NavigationMenuExample from "./NavigationMenuExample";
import MenubarExample from "./MenubarExample";
import { PaginationExample } from "./PaginationExample";
import { TabExample } from "./TabExample";
import { StepsExample } from "./StepsExample";

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

// Feedback Components
import { AlertExample } from "./AlertExample";
import { ToastExample } from "./ToastExample";
import { SonnerExample } from "./SonnerExample";
import ProgressExample from "./ProgressExample";
import SpinnerExample from "./SpinnerExample";
import { SkeletonExample } from "./SkeletonExample";

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
import { CarouselExample } from "./CarouselExample";
import { PlayButtonExample } from "./PlayButtonExample";

// Utility Components
import ScrollAreaExample from "./ScrollAreaExample";
import ResizableExample from "./ResizableExample";
import { ItemExample } from "./ItemExample";
import { FloatingActionButtonExample } from "./FloatingActionButtonExample";

// Typography
import { TypographyExample } from "./TypographyExample";

// Advanced Components
import TextEditorExample from "./TextEditorExample";
import CodeEditorFrameworkExamples from "./CodeEditorFrameworkExamples";
import ChartExamples from "./ChartExamples";

// AsChild Examples
import AsChildExamples from "./AsChildExamples";

export const AllComponentExamples = () => {
  return (
    <div className="space-y-8">
      {/* Color System */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Color System</h2>
        <ColorPalette />
      </div>

      {/* Basic Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Basic Components</h2>
        <ButtonExample />
        <ButtonGroupExample />
        <BadgeExample />
        <ChipExample />
        <LinkExample />
        <SeparatorExample />
        <KbdExample />
      </div>

      {/* Layout Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Layout Components</h2>
        <ContainerExample />
        <StackExample />
        <GridExample />
        <SectionExample />
        <AspectRatioExample />
      </div>

      {/* Cards & Content */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Cards & Content</h2>
        <CardExample />
        <AvatarExample />
        <ImageExample />
        <EmptyExample />
      </div>

      {/* Navigation Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Navigation</h2>
        <BreadcrumbExample />
        <NavigationMenuExample />
        <MenubarExample />
        <PaginationExample />
        <TabExample />
        <StepsExample />
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
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Media</h2>
        <CarouselExample />
        <PlayButtonExample />
      </div>

      {/* Utility Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Utilities</h2>
        <ScrollAreaExample />
        <ResizableExample />
        <ItemExample />
        <FloatingActionButtonExample />
      </div>

      {/* Typography */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Typography</h2>
        <TypographyExample />
      </div>

      {/* Advanced Components */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          Advanced Components
        </h2>
        <TextEditorExample />
        <CodeEditorFrameworkExamples />
        <ChartExamples />
      </div>

      {/* Composition Pattern */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          Composition (asChild)
        </h2>
        <AsChildExamples />
      </div>
    </div>
  );
};

export default AllComponentExamples;
