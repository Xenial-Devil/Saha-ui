# CVA Variants Export Audit

## Summary

This document tracks which CVA variants are properly exported from components and the main index file.

## Current Status

### ✅ Components Exporting Variants (10/73)

- **Badge**: badgeVariants
- **Button**: buttonVariants ✓ (also in main index)
- **ButtonGroup**: buttonGroupVariants
- **Link**: linkVariants
- **Progress**: progressVariants, progressBarVariants, progressLabelVariants
- **Rating**: ratingVariants
- **Spinner**: spinnerVariants
- **Toggle**: toggleVariants, toggleGroupVariants ✓ (also in main index)
- **ToggleGroup**: toggleGroupVariants, toggleGroupItemVariants ✓ (also in main index)
- **Typography**: typographyVariants ✓ (also in main index)

### ⚠️ Components with Exported Variants in Styles BUT NOT from Component Index (40+)

#### A

- **Accordion**: accordionVariants, accordionItemVariants, accordionHeaderVariants, accordionContentVariants
- **Alert**: alertVariants

#### C

- **Card**: cardVariants
- **Chart**: chartContainerVariants, chartCanvasVariants
- **Chip**: chipVariants
- **Collapsible**: collapsibleVariants, collapsibleTriggerVariants, collapsibleContentVariants, collapsibleIconVariants
- **ContextMenu**: contextMenuContentVariants, contextMenuItemVariants, contextMenuCheckItemVariants, contextMenuLabelVariants, contextMenuSeparatorVariants, contextMenuShortcutVariants, contextMenuSubTriggerVariants, contextMenuIndicatorVariants

#### D

- **DataTable**: dataTableVariants, tableWrapperVariants, tableHeaderVariants, tableRowVariants, tableCellVariants, paginationContainerVariants, filterInputVariants, loadingOverlayVariants
- **DatePicker**: datePickerVariants, calendarVariants

#### F

- **FloatingActionButton**: fabVariants, labelVariants
- **Form**: formVariants, formItemVariants, formLabelVariants, formControlVariants, formDescriptionVariants, formMessageVariants, formSectionVariants, formSectionTitleVariants, formActionsVariants

#### H

- **HoverCard**: hoverCardContentVariants, hoverCardArrowVariants, hoverCardTriggerVariants

#### I

- **InputOTP**: otpContainerVariants, otpLabelVariants, otpGroupVariants, otpSlotVariants, otpSeparatorVariants, otpHelperTextVariants
- **Item**: itemVariants, itemMediaVariants, itemContentVariants, itemTitleVariants, itemDescriptionVariants, itemActionsVariants, itemHeaderVariants, itemFooterVariants, itemGroupVariants, itemSeparatorVariants, itemBadgeVariants

#### K

- **Kbd**: kbdVariants, kbdGroupVariants, kbdSeparatorVariants, kbdKeyVariants, kbdDescriptionVariants

#### L

- **Label**: labelVariants, labelGroupVariants, labelDescriptionVariants, labelErrorVariants, labelRequiredVariants, labelOptionalVariants, labelHelpVariants

#### M

- **Menubar**: menubarVariants, menubarMenuVariants, menubarTriggerVariants, menubarContentVariants, menubarItemVariants, menubarSeparatorVariants, menubarShortcutVariants, menubarLabelVariants, menubarCheckboxIndicatorVariants, menubarRadioIndicatorVariants, menubarSubTriggerIconVariants

#### N

- **NativeSelect**: nativeSelectVariants, nativeSelectOptionVariants, nativeSelectGroupVariants, nativeSelectWrapperVariants, nativeSelectLabelVariants, nativeSelectDescriptionVariants, nativeSelectErrorVariants, nativeSelectIconVariants

#### P

- **Pagination**: paginationVariants
- **PlayButton**: playButtonVariants

#### R

- **Resizable**: resizablePanelGroupVariants, resizablePanelVariants, resizableHandleVariants, resizableHandleIndicatorVariants, resizableHandleDotsVariants

#### S

- **ScrollArea**: scrollAreaRootVariants, scrollBarVariants, scrollThumbVariants
- **Skeleton**: skeletonVariants
- **Sonner**: sonnerContainerVariants, sonnerToastVariants, sonnerIconVariants

#### T

- **TextEditor**: textEditorVariants, toolbarVariants, editorContentVariants, toolbarButtonVariants, toolbarSeparatorVariants, toolbarGroupVariants ✓ (first 4 in main index)
- **ThemeToggle**: themeToggleButtonVariants, themeToggleIconVariants, themeDropdownVariants, themeOptionVariants, themeLabelVariants
- **Tooltip**: tooltipVariants, arrowVariants ✓ (in main index but needs re-export from component)

### ❌ Components with Non-Exported Variants (Need to Export from Styles First, Then Component) (33)

#### A

- **AspectRatio**: aspectRatioVariants, overlayVariants
- **Autocomplete**: containerVariants, inputWrapperVariants, inputVariants, dropdownVariants, optionVariants, labelVariants
- **Avatar**: avatarVariants, statusVariants
- **AvatarGroup**: avatarGroupVariants, avatarWrapperVariants, moreIndicatorVariants

#### B

- **Breadcrumb**: breadcrumbVariants, breadcrumbItemVariants, breadcrumbSeparatorVariants

#### C

- **Calendar**: calendarVariants, dayVariants
- **Carousel**: carouselVariants, navigationVariants, indicatorVariants
- **Checkbox**: checkboxVariants, checkboxLabelVariants, checkboxTextVariants, checkboxDescriptionVariants
- **Combobox**: triggerVariants, contentVariants, optionVariants, searchVariants
- **Command**: containerVariants, inputVariants, itemVariants

#### D

- **Dialog**: overlayVariants, contentVariants
- **Drawer**: overlayVariants, contentVariants
- **Dropdown**: dropdownTriggerVariants, dropdownContentVariants, dropdownItemVariants

#### E

- **Empty**: emptyVariants, iconContainerVariants, titleVariants, descriptionVariants

#### F

- **Field**: fieldSetVariants, legendVariants, fieldGroupVariants, fieldContainerVariants, fieldLabelVariants, fieldDescriptionVariants, fieldErrorVariants, fieldHintVariants

#### I

- **Image**: imageContainerVariants, imageVariants, skeletonVariants
- **Input**: inputContainerVariants, inputLabelVariants, inputWrapperVariants, inputVariants, inputIconVariants, helperTextVariants

#### L

- **List**: listVariants, mainListItemVariants, listItemVariants

#### P

- **Popover**: popoverVariants, arrowVariants

#### R

- **Radio**: radioVariants, radioLabelVariants, radioTextVariants, radioDescriptionVariants, radioGroupVariants

#### S

- **Select**: selectTriggerVariants, selectMenuVariants, selectOptionVariants
- **Separator**: SeparatorVariants, SeparatorLineVariants, SeparatorLabelVariants
- **Slider**: containerVariants, trackVariants, filledTrackVariants, thumbVariants, tooltipVariants, markVariants, markLabelVariants, labelVariants
- **Steps**: stepVariants, stepIconVariants, connectorVariants
- **Switch**: switchVariants, switchThumbVariants, switchLabelVariants, switchTextVariants, switchDescriptionVariants

#### T

- **Tab**: tabsListVariants, tabsTriggerVariants
- **Table**: tableContainerVariants, tableVariants, tableHeaderVariants, tableCellVariants, tableRowVariants
- **Tag**: tagVariants, badgeVariants
- **TagInput**: tagInputContainerVariants, tagVariants, inputVariants
- **TextArea**: textAreaVariants, countVariants
- **Timeline**: timelineVariants, timelineItemVariants, timelineDotVariants, timelineLineVariants
- **Toast**: toastVariants
- **Tree**: treeVariants, treeNodeVariants

#### U

- **Upload**: uploadVariants, fileItemVariants

## Main Index (src/index.ts) Export Status

### Currently Exported (5 components):

1. **Button**: toggleVariants ✓
2. **TextEditor**: textEditorVariants, toolbarVariants, editorContentVariants, toolbarButtonVariants
3. **Toggle**: toggleVariants
4. **ToggleGroup**: toggleGroupVariants, toggleGroupItemVariants
5. **Tooltip**: tooltipVariants, arrowVariants
6. **Typography**: typographyVariants

### Missing from Main Index (Most components)

## Action Items

### Phase 1: Export from Styles Files (33 components)

Add `export` keyword to const declarations in `.styles.ts` files for all non-exported variants.

### Phase 2: Re-export from Component Index (73 components)

Add export statements to component `index.tsx` files:

```tsx
export { variantName } from "./ComponentName.styles";
```

### Phase 3: Export from Main Index

Add to `src/index.ts`:

```tsx
export { variantName } from "./components/ComponentName";
```

## Benefits of Exporting CVA Variants

1. **Customization**: Users can extend/compose variants
2. **Type Safety**: Access to VariantProps types
3. **Reusability**: Use variants in custom components
4. **Documentation**: Variants become part of public API
5. **Developer Experience**: Better autocomplete and IntelliSense

## Notes

- Some components use generic names like `containerVariants`, `labelVariants` which may conflict
- Consider prefixing all variants with component name for clarity
- Components with multiple variants should export all of them for consistency
