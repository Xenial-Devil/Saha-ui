/**
 * Command Component
 *
 * A command palette / command menu component with keyboard navigation,
 * search filtering, and grouping support.
 *
 * @example
 * // Component API
 * <Command>
 *   <CommandInput placeholder="Type a command..." />
 *   <CommandList>
 *     <CommandEmpty>No results found</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem icon={<FileIcon />} shortcut="⌘N">
 *         New File
 *       </CommandItem>
 *       <CommandItem icon={<FolderIcon />} shortcut="⌘⇧N">
 *         New Folder
 *       </CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 *
 * // Props API
 * <Command
 *   items={[
 *     { value: 'new-file', label: 'New File', icon: <FileIcon />, shortcut: '⌘N' }
 *   ]}
 *   onSelect={(value) => console.log(value)}
 * />
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  forwardRef,
} from "react";
import { cva } from "class-variance-authority";
import { Search, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { createValidator } from "../../lib/validation";
import type {
  CommandProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandLoadingProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
  CommandItem as CommandItemType,
  CommandGroup as CommandGroupType,
  CommandSize,
  CommandVariant,
} from "./Command.types";

// Context for composable components
interface CommandContextValue {
  value: string;
  setValue: (value: string) => void;
  filteredItems: CommandItemType[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  onSelect?: (value: string) => void;
  loop: boolean;
  size: CommandSize;
  variant: CommandVariant;
  loading: boolean;
  disabled: boolean;
}

const CommandContext = createContext<CommandContextValue | undefined>(
  undefined
);

const useCommand = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error("Command subcomponents must be used within <Command>");
  }
  return context;
};

/**
 * Container variants
 */
const containerVariants = cva(
  [
    "flex flex-col w-full overflow-hidden",
    "rounded-xl shadow-2xl border-2",
    "bg-card text-card-foreground",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/30 shadow-primary/20",
        secondary: "border-secondary/30 shadow-secondary/20",
        accent: "border-accent/30 shadow-accent/20",
        success: "border-success/30 shadow-success/20",
        warning: "border-warning/30 shadow-warning/20",
        error: "border-error/30 shadow-error/20",
        info: "border-info/30 shadow-info/20",
        ghost: "border-transparent shadow-none bg-transparent",
        glass: "border-border/20 backdrop-blur-xl bg-background/80 shadow-xl",
        outline: "border-border bg-transparent shadow-lg",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Input variants
 */
const inputVariants = cva(
  [
    "w-full px-4 border-b-2 border-border/50",
    "bg-transparent text-foreground placeholder:text-muted-foreground",
    "focus:outline-none focus:border-primary/50",
    "transition-colors duration-200",
  ],
  {
    variants: {
      size: {
        sm: "py-2 text-sm",
        md: "py-3 text-base",
        lg: "py-4 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Item variants
 */
const itemVariants = cva(
  [
    "w-full flex items-center gap-3 px-4 cursor-pointer",
    "transition-all duration-200 select-none",
    "hover:bg-accent/10 hover:scale-[1.01]",
    "active:scale-[0.99]",
  ],
  {
    variants: {
      selected: {
        true: "bg-primary/10 font-semibold shadow-sm",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent hover:scale-100",
        false: "",
      },
      size: {
        sm: "py-1.5 text-sm min-h-[32px]",
        md: "py-2.5 text-base min-h-[40px]",
        lg: "py-3 text-lg min-h-[48px]",
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
      size: "md",
    },
  }
);

/**
 * Default filter function
 */
const defaultFilter = (
  items: CommandItemType[],
  search: string
): CommandItemType[] => {
  if (!search) return items;

  const searchLower = search.toLowerCase();

  return items.filter((item) => {
    // Search in label
    if (item.label.toLowerCase().includes(searchLower)) return true;

    // Search in description
    if (item.description?.toLowerCase().includes(searchLower)) return true;

    // Search in keywords
    if (item.keywords?.some((k) => k.toLowerCase().includes(searchLower)))
      return true;

    // Fuzzy search - check if characters appear in order
    const labelLower = item.label.toLowerCase();
    let searchIndex = 0;
    for (const char of labelLower) {
      if (char === searchLower[searchIndex]) {
        searchIndex++;
        if (searchIndex === searchLower.length) return true;
      }
    }

    return false;
  });
};

/**
 * Main Command Component
 */
export const Command = forwardRef<HTMLDivElement, CommandProps>(
  (props, ref) => {
    const {
      items,
      children,
      value: controlledValue,
      onValueChange,
      placeholder = "Type a command or search...",
      emptyMessage = "No results found",
      loading = false,
      loadingMessage = "Loading...",
      size = "md",
      variant = "default",
      className,
      filter = defaultFilter,
      shouldFilter = true,
      loop = true,
      disabled = false,
      maxItems,
      renderEmpty,
      renderLoading,
      onSelect,
      ariaLabel = "Command menu",
      ...rest
    } = props;

    // Validation
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("Command");

        validator.validateEnum("size", size, ["sm", "md", "lg"]);
        validator.validateEnum("variant", variant, [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "warning",
          "error",
          "info",
          "ghost",
          "glass",
          "outline",
        ]);

        if (items && !Array.isArray(items)) {
          validator.error("items must be an array");
        }

        if (filter && typeof filter !== "function") {
          validator.error("filter must be a function");
        }

        if (onValueChange && typeof onValueChange !== "function") {
          validator.error("onValueChange must be a function");
        }

        if (onSelect && typeof onSelect !== "function") {
          validator.error("onSelect must be a function");
        }
      }
    }, [size, variant, items, filter, onValueChange, onSelect]);

    // Determine if using component API
    const isComponentBased = Boolean(children && !items);

    // Internal state
    const [internalValue, setInternalValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const setValue = onValueChange || setInternalValue;

    // Extract items from children (component API)
    const extractedItems = useMemo(() => {
      if (!isComponentBased || !children) return [];

      const itms: CommandItemType[] = [];
      const extractFromChildren = (children: React.ReactNode): void => {
        React.Children.forEach(children, (child) => {
          if (!React.isValidElement(child)) return;

          const displayName =
            (child.type as any)?.displayName || (child.type as any)?.name;

          if (displayName === "CommandItem") {
            const props = child.props as CommandItemProps;
            itms.push({
              value: props.value,
              label:
                props.label ||
                (typeof props.children === "string"
                  ? props.children
                  : props.value),
              description: props.description,
              icon: props.icon,
              keywords: props.keywords,
              shortcut: props.shortcut,
              disabled: props.disabled,
              onSelect: props.onSelect,
            });
          } else if (
            displayName === "CommandGroup" ||
            displayName === "CommandList"
          ) {
            if (
              child.props &&
              typeof child.props === "object" &&
              "children" in child.props
            ) {
              extractFromChildren(child.props.children as React.ReactNode);
            }
          } else if (
            child.props &&
            typeof child.props === "object" &&
            "children" in child.props
          ) {
            extractFromChildren(child.props.children as React.ReactNode);
          }
        });
      };

      extractFromChildren(children);
      return itms;
    }, [isComponentBased, children]);

    // Flatten items from props
    const flatItems = useMemo(() => {
      if (isComponentBased) return extractedItems;
      if (!items) return [];

      const flat: CommandItemType[] = [];
      items.forEach((item: CommandItemType | CommandGroupType) => {
        if ("items" in item) {
          // It's a group
          flat.push(...item.items);
        } else {
          // It's a single item
          flat.push(item);
        }
      });
      return flat;
    }, [items, isComponentBased, extractedItems]);

    // Filter items
    const filteredItems = useMemo(() => {
      if (!shouldFilter) return flatItems;
      const filtered = filter(flatItems, value);
      return maxItems ? filtered.slice(0, maxItems) : filtered;
    }, [flatItems, value, filter, shouldFilter, maxItems]);

    // Reset selected index when filtered items change
    useEffect(() => {
      setSelectedIndex(0);
    }, [filteredItems]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedIndex((prev) => {
              const max = filteredItems.length - 1;
              if (prev >= max) return loop ? 0 : max;
              return prev + 1;
            });
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedIndex((prev) => {
              if (prev <= 0) return loop ? filteredItems.length - 1 : 0;
              return prev - 1;
            });
            break;
          case "Enter":
            e.preventDefault();
            const selectedItem = filteredItems[selectedIndex];
            if (selectedItem && !selectedItem.disabled) {
              selectedItem.onSelect?.();
              onSelect?.(selectedItem.value);
            }
            break;
          case "Escape":
            e.preventDefault();
            setValue("");
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, filteredItems, onSelect, setValue, loop, disabled]);

    const contextValue: CommandContextValue = {
      value,
      setValue,
      filteredItems,
      selectedIndex,
      setSelectedIndex,
      onSelect,
      loop,
      size,
      variant,
      loading,
      disabled,
    };

    return (
      <CommandContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(containerVariants({ variant, size }), className)}
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded="true"
          {...rest}
        >
          {isComponentBased ? (
            children
          ) : (
            <>
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={cn(inputVariants({ size }), "pl-10")}
                  autoFocus
                />
              </div>

              {/* Items List */}
              <div className="overflow-y-auto max-h-[400px] py-2">
                {loading ? (
                  renderLoading ? (
                    renderLoading()
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">
                        {loadingMessage}
                      </span>
                    </div>
                  )
                ) : filteredItems.length === 0 ? (
                  renderEmpty ? (
                    renderEmpty(value)
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      {emptyMessage}
                    </div>
                  )
                ) : (
                  <>
                    {Array.isArray(items) &&
                      items.map((item, groupIndex) => {
                        if ("items" in item) {
                          // Grouped items
                          const group = item as CommandGroupType;
                          const groupFiltered = shouldFilter
                            ? filter(group.items, value)
                            : group.items;
                          if (groupFiltered.length === 0) return null;

                          return (
                            <div key={groupIndex} className="mb-2">
                              {group.label && (
                                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {group.label}
                                </div>
                              )}
                              {groupFiltered.map((itm: CommandItemType) => {
                                const globalIndex = filteredItems.findIndex(
                                  (fi: CommandItemType) =>
                                    fi.value === itm.value
                                );
                                return (
                                  <CommandItemInternal
                                    key={itm.value}
                                    item={itm}
                                    index={globalIndex}
                                  />
                                );
                              })}
                            </div>
                          );
                        } else {
                          // Flat item
                          const itm = item as CommandItemType;
                          const globalIndex = filteredItems.findIndex(
                            (fi: CommandItemType) => fi.value === itm.value
                          );
                          if (globalIndex === -1) return null;

                          return (
                            <CommandItemInternal
                              key={itm.value}
                              item={itm}
                              index={globalIndex}
                            />
                          );
                        }
                      })}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </CommandContext.Provider>
    );
  }
);

Command.displayName = "Command";

/**
 * Internal item component (for props API)
 */
const CommandItemInternal: React.FC<{
  item: CommandItemType;
  index: number;
}> = ({ item, index }) => {
  const { selectedIndex, setSelectedIndex, onSelect, size } = useCommand();

  const isSelected = index === selectedIndex;

  return (
    <div
      onClick={() => {
        if (!item.disabled) {
          item.onSelect?.();
          onSelect?.(item.value);
        }
      }}
      onMouseEnter={() => setSelectedIndex(index)}
      className={cn(
        itemVariants({
          selected: isSelected,
          disabled: item.disabled,
          size,
        })
      )}
    >
      {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{item.label}</div>
        {item.description && (
          <div className="text-xs text-muted-foreground truncate">
            {item.description}
          </div>
        )}
      </div>
      {item.shortcut && <CommandShortcut keys={item.shortcut} />}
    </div>
  );
};

/**
 * Component API - Input
 */
export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  (
    {
      placeholder = "Type a command or search...",
      className,
      autoFocus = true,
    },
    ref
  ) => {
    const { value, setValue, size, disabled } = useCommand();

    return (
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={cn(inputVariants({ size }), "pl-10", className)}
        />
      </div>
    );
  }
);

CommandInput.displayName = "CommandInput";

/**
 * Component API - List
 */
export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, className, maxHeight = "400px" }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("overflow-y-auto py-2", className)}
        style={{ maxHeight }}
      >
        {children}
      </div>
    );
  }
);

CommandList.displayName = "CommandList";

/**
 * Component API - Empty
 */
export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, className }, ref) => {
    const { filteredItems } = useCommand();

    if (filteredItems.length > 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-8 text-muted-foreground",
          className
        )}
      >
        {children || "No results found"}
      </div>
    );
  }
);

CommandEmpty.displayName = "CommandEmpty";

/**
 * Component API - Loading
 */
export const CommandLoading = forwardRef<HTMLDivElement, CommandLoadingProps>(
  ({ children, className }, ref) => {
    const { loading } = useCommand();

    if (!loading) return null;

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center py-8", className)}
      >
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        {children && (
          <span className="ml-2 text-muted-foreground">{children}</span>
        )}
      </div>
    );
  }
);

CommandLoading.displayName = "CommandLoading";

/**
 * Component API - Group
 */
export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ heading, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("mb-2", className)}>
        {heading && (
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CommandGroup.displayName = "CommandGroup";

/**
 * Component API - Item
 */
export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  (
    {
      value: itemValue,
      label,
      description,
      icon,
      shortcut,
      keywords,
      disabled = false,
      onSelect: itemOnSelect,
      className,
      children,
      forceMount,
    },
    ref
  ) => {
    const {
      value,
      filteredItems,
      selectedIndex,
      setSelectedIndex,
      onSelect,
      size,
    } = useCommand();

    // For component API, check if this item matches the search
    const itemLabel =
      label || (typeof children === "string" ? children : itemValue);

    const shouldShow = useMemo(() => {
      if (forceMount) return true;
      if (!value) return true;

      const searchLower = value.toLowerCase();

      // Check label
      if (itemLabel.toLowerCase().includes(searchLower)) return true;

      // Check description
      if (description?.toLowerCase().includes(searchLower)) return true;

      // Check keywords
      if (keywords?.some((k) => k.toLowerCase().includes(searchLower)))
        return true;

      // Fuzzy search
      const labelLower = itemLabel.toLowerCase();
      let searchIndex = 0;
      for (const char of labelLower) {
        if (char === searchLower[searchIndex]) {
          searchIndex++;
          if (searchIndex === searchLower.length) return true;
        }
      }

      return false;
    }, [value, itemLabel, description, keywords, forceMount]);

    if (!shouldShow) return null;

    const index = filteredItems.findIndex((item) => item.value === itemValue);
    const isSelected = index >= 0 && index === selectedIndex;

    return (
      <div
        ref={ref}
        onClick={() => {
          if (!disabled) {
            itemOnSelect?.();
            onSelect?.(itemValue);
          }
        }}
        onMouseEnter={() => {
          if (index >= 0) setSelectedIndex(index);
        }}
        className={cn(
          itemVariants({
            selected: isSelected,
            disabled,
            size,
          }),
          className
        )}
      >
        {icon && <div className="flex-shrink-0">{icon}</div>}
        {children ? (
          <div className="flex-1 min-w-0">{children}</div>
        ) : (
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{itemLabel}</div>
            {description && (
              <div className="text-xs text-muted-foreground truncate">
                {description}
              </div>
            )}
          </div>
        )}
        {shortcut && <CommandShortcut keys={shortcut} />}
      </div>
    );
  }
);

CommandItem.displayName = "CommandItem";

/**
 * Component API - Separator
 */
export const CommandSeparator = forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(({ className }, ref) => {
  return (
    <div ref={ref} className={cn("h-px bg-border my-2 mx-4", className)} />
  );
});

CommandSeparator.displayName = "CommandSeparator";

/**
 * Component API - Shortcut
 */
export const CommandShortcut = forwardRef<
  HTMLSpanElement,
  CommandShortcutProps
>(({ keys, className }, ref) => {
  const keysArray = Array.isArray(keys) ? keys : [keys];

  return (
    <span
      ref={ref}
      className={cn(
        "flex items-center gap-1 text-xs text-muted-foreground",
        className
      )}
    >
      {keysArray.map((key, i) => (
        <kbd
          key={i}
          className="px-1.5 py-0.5 rounded bg-muted font-mono font-semibold"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
});

CommandShortcut.displayName = "CommandShortcut";

export default Command;
