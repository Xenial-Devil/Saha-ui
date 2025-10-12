// This file aggregates all component showcases
// Each component has its own example file for better organization

import ColorPalette from "./ColorPalette";
import { ButtonExample } from "./ButtonExample";
import { ButtonGroupExample } from "./ButtonGroupExample";
import { BreadcrumbExample } from "./BreadcrumbExample";
import { BadgeExample } from "./BadgeExample";
import { AvatarExample } from "./AvatarExample";
import { CardExample } from "./CardExample";
import { DividerExample } from "./DividerExample";
import { ChipExample } from "./ChipExample";
import { AlertExample } from "./AlertExample";
import { AccordionExample } from "./AccordionExample";
import { TooltipExample } from "./TooltipExample";
import { LinkExample } from "./LinkExample";
import { ListExample } from "./ListExample";
import { TimelineExample } from "./TimelineExample";
import { ImageExample } from "./ImageExample";
import { CarouselExample } from "./CarouselExample";
import { TreeExample } from "./TreeExample";
import { StepsExample } from "./StepsExample";
import { TableExample } from "./TableExample";
import { RatingExample } from "./RatingExample";

export const AllComponentExamples = () => {
  return (
    <>
      {/* Color Palette */}
      <ColorPalette />

      {/* Button Examples */}
      <ButtonExample />

      {/* ButtonGroup Examples */}
      <ButtonGroupExample />

      {/* Breadcrumb Examples */}
      <BreadcrumbExample />

      {/* Badge Examples */}
      <BadgeExample />

      {/* Avatar Examples */}
      <AvatarExample />

      {/* Card Examples */}
      <CardExample />

      {/* Divider Examples */}
      <DividerExample />

      {/* Chip Examples */}
      <ChipExample />

      {/* Alert Examples */}
      <AlertExample />

      {/* Accordion Examples */}
      <AccordionExample />

      {/* Tooltip Examples */}
      <TooltipExample />

      {/* Link Examples */}
      <LinkExample />

      {/* List Examples */}
      <ListExample />

      {/* Timeline Examples */}
      <TimelineExample />

      {/* Image Examples */}
      <ImageExample />

      {/* Carousel Examples */}
      <CarouselExample />

      {/* Tree Examples */}
      <TreeExample />

      {/* Steps Examples */}
      <StepsExample />

      {/* Table Examples */}
      <TableExample />

      {/* Rating Examples */}
      <RatingExample />
    </>
  );
};

export default AllComponentExamples;
