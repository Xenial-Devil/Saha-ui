"use client";

import { forwardRef, useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogOverlay } from "../Dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../Command";
import type { SpotlightSearchProps } from "./SpotlightSearch.types";

/**
 * SpotlightSearch component
 *
 * A system-wide modal search experience visually mimicking macOS Spotlight or
 * standard application command palettes. Composes the Dialog and Command structures.
 *
 * @component
 * @example
 * // Uncontrolled with custom data mapping
 * <SpotlightSearch
 *   data={[{ heading: "Links", items: [{ id: "1", title: "Home" }] }]}
 * />
 *
 * @example
 * // Controlled state
 * <SpotlightSearch open={isOpen} onOpenChange={setIsOpen}>
 *   <CommandGroup heading="Actions">...</CommandGroup>
 * </SpotlightSearch>
 */
export const SpotlightSearch = forwardRef<HTMLDivElement, SpotlightSearchProps>(
  (
    {
      children,
      open,
      onOpenChange,
      data = [],
      placeholder = "Type a command or search...",
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const isControlled = open !== undefined;
    const currentOpen = isControlled ? open : isOpen;

    /**
     * Handles the dialog's open state changes, synchronizing controlled and uncontrolled states
     * @param {boolean} newOpen - The new visibility state
     */
    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) setIsOpen(newOpen);
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange],
    );

    // Toggle on Cmd+K or Ctrl+K
    useEffect(() => {
      /**
       * Listens for the Cmd+K or Ctrl+K keyboard shortcut to toggle SpotlightSearch globally
       * @param {KeyboardEvent} e - The raw keyboard event
       */
      const down = (e: KeyboardEvent) => {
        if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          handleOpenChange(!currentOpen);
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, [currentOpen, handleOpenChange]);

    return (
      <>
        {children && (
          <div
            onClick={() => handleOpenChange(true)}
            className="inline-block cursor-pointer"
          >
            {children}
          </div>
        )}
        <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
          <DialogOverlay
            state={currentOpen ? "open" : "closed"}
            className="bg-background/80 backdrop-blur-sm"
          />
          <DialogContent
            state={currentOpen ? "open" : "closed"}
            className="overflow-hidden p-0 max-w-2xl bg-card border border-border shadow-2xl rounded-xl"
          >
            <Command
              ref={ref}
              className="rounded-lg border-none bg-transparent h-[400px]"
            >
              <CommandInput
                placeholder={placeholder}
                className="border-none focus:ring-0 text-lg h-16"
              />
              <CommandList className="max-h-[336px] overflow-y-auto p-2">
                <CommandEmpty>No results found.</CommandEmpty>
                {data.map((group) => (
                  <CommandGroup
                    key={group.heading}
                    heading={group.heading}
                    className="text-muted-foreground font-medium px-2 py-1.5 text-xs"
                  >
                    {group.items.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.title}
                        onSelect={() => {
                          item.onSelect?.();
                          handleOpenChange(false);
                        }}
                        className="flex items-center gap-3 px-3 py-3 text-sm rounded-md data-[selected=true]:bg-muted/50 cursor-pointer"
                      >
                        {item.icon && (
                          <div className="text-muted-foreground w-4 flex justify-center">
                            {item.icon}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="text-xs text-muted-foreground mt-0.5">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </>
    );
  },
);
SpotlightSearch.displayName = "SpotlightSearch";
