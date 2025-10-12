// This file aggregates all component showcases
// Each component has its own example file for better organization

import ColorPalette from "./ColorPalette";
import { ButtonExample } from "./ButtonExample";
import { ButtonGroupExample } from "./ButtonGroupExample";
import { BreadcrumbExample } from "./BreadcrumbExample";
import { BadgeExample } from "./BadgeExample";
import { AvatarExample } from "./AvatarExample";
import { CardExample } from "./CardExample";

export const AllComponentExamples = () => {
  return (
    <>
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

      {/* Color Palette */}
      <ColorPalette />

      {/* TODO: Add more component examples:
       * - DividerExample
       * - ChipExample
       * - AlertExample
       * - AccordionExample
       * - TooltipExample
       * - LinkExample
       * - ListExample
       * - TimelineExample
       * - ImageExample
       * - CarouselExample
       * - TreeExample
       */}
    </>
  );
};

export default AllComponentExamples;
