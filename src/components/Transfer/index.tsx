"use client";

import React, { useState, useMemo } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronRight, ChevronLeft, Search, Inbox } from "lucide-react";
import type {
  TransferProps,
  TransferItem,
  TransferListProps,
} from "./Transfer.types";
import {
  transferVariants,
  transferListVariants,
  transferListHeaderVariants,
  transferListBodyVariants,
  transferItemVariants,
  transferOperationsVariants,
  transferOperationButtonVariants,
  transferSearchVariants,
  transferCheckboxVariants,
  transferEmptyVariants,
  transferFooterVariants,
} from "./Transfer.styles";

export type TransferVariantsProps = VariantProps<typeof transferVariants>;

/**
 * TransferList Component (internal)
 * Represents a single list in the transfer component
 */
const TransferList: React.FC<TransferListProps> = ({
  direction: _direction,
  title,
  items,
  selectedKeys,
  onSelectChange,
  onItemClick,
  disabled = false,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Search...",
  showSelectAll = true,
  showItemCount = true,
  render,
  footer,
  emptyText,
  listClassName,
  itemClassName,
  height,
  filterOption,
  size = "md",
}) => {
  const [searchValue, setSearchValue] = useState("");

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchValue) return items;

    if (filterOption) {
      return items.filter((item) => filterOption(searchValue, item));
    }

    return items.filter((item) =>
      item.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [items, searchValue, filterOption]);

  // Check if all items are selected
  const allChecked = useMemo(() => {
    const selectableItems = filteredItems.filter((item) => !item.disabled);
    return (
      selectableItems.length > 0 &&
      selectableItems.every((item) => selectedKeys.includes(item.key))
    );
  }, [filteredItems, selectedKeys]);

  // Check if some items are selected (indeterminate state)
  const someChecked = useMemo(() => {
    return (
      !allChecked &&
      filteredItems.some((item) => selectedKeys.includes(item.key))
    );
  }, [filteredItems, selectedKeys, allChecked]);

  // Handle select all
  const handleSelectAll = () => {
    const selectableItems = filteredItems.filter((item) => !item.disabled);

    if (allChecked) {
      // Deselect all
      const newSelectedKeys = selectedKeys.filter(
        (key) => !selectableItems.find((item) => item.key === key),
      );
      onSelectChange(newSelectedKeys);
    } else {
      // Select all
      const newKeys = selectableItems.map((item) => item.key);
      const newSelectedKeys = [
        ...selectedKeys.filter(
          (key) => !selectableItems.find((item) => item.key === key),
        ),
        ...newKeys,
      ];
      onSelectChange(newSelectedKeys);
    }
  };

  // Handle item selection
  const handleItemClick = (item: TransferItem) => {
    if (item.disabled || disabled) return;

    const isSelected = selectedKeys.includes(item.key);

    if (isSelected) {
      onSelectChange(selectedKeys.filter((key) => key !== item.key));
    } else {
      onSelectChange([...selectedKeys, item.key]);
    }

    onItemClick?.(item);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div
      className={cn(transferListVariants({ size, disabled }), listClassName)}
      style={{ height }}
    >
      {/* Header */}
      <div className={cn(transferListHeaderVariants({ size }))}>
        <div className="flex items-center gap-2 flex-1">
          {showSelectAll && (
            <div
              className={cn(
                transferCheckboxVariants({
                  checked: allChecked,
                  indeterminate: someChecked,
                  disabled,
                }),
                "relative flex items-center justify-center",
              )}
              onClick={handleSelectAll}
              role="checkbox"
              aria-checked={
                allChecked ? "true" : someChecked ? "mixed" : "false"
              }
              tabIndex={disabled ? -1 : 0}
            >
              {allChecked && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {someChecked && !allChecked && (
                <div className="w-2 h-0.5 bg-white" />
              )}
            </div>
          )}
          <span className="font-medium">{title}</span>
        </div>
        {showItemCount && (
          <span className="text-xs text-muted-foreground">
            {selectedKeys.length}/{items.length}
          </span>
        )}
      </div>

      {/* Search */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className={cn(transferSearchVariants({ size }), "pl-10")}
            disabled={disabled}
          />
        </div>
      )}

      {/* Body */}
      <div className={cn(transferListBodyVariants({ size }))}>
        {filteredItems.length === 0 ? (
          <div className={cn(transferEmptyVariants({ size }))}>
            <Inbox className="h-8 w-8 mb-2 opacity-50" />
            {emptyText || "No items"}
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSelected = selectedKeys.includes(item.key);
            return (
              <div
                key={item.key}
                onClick={() => handleItemClick(item)}
                className={cn(
                  transferItemVariants({
                    selected: isSelected,
                    disabled: item.disabled || disabled,
                    size,
                  }),
                  itemClassName,
                )}
                role="option"
                aria-selected={isSelected}
                tabIndex={item.disabled || disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick(item);
                  }
                }}
              >
                <div
                  className={cn(
                    transferCheckboxVariants({
                      checked: isSelected,
                      disabled: item.disabled || disabled,
                    }),
                    "relative flex items-center justify-center flex-shrink-0",
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {render ? (
                  render(item)
                ) : (
                  <div className="flex-1 min-w-0">
                    {item.icon && (
                      <span className="mr-2 flex-shrink-0">{item.icon}</span>
                    )}
                    <span className="truncate">{item.label}</span>
                    {item.description && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className={cn(transferFooterVariants({ size }))}>{footer}</div>
      )}
    </div>
  );
};

TransferList.displayName = "TransferList";

/**
 * Transfer Component
 *
 * A shuttle/transfer component for moving items between two lists.
 * Perfect for selecting multiple items from a large dataset.
 * Supports search, selection, and custom rendering.
 *
 * @example
 * ```tsx
 * // Basic transfer
 * const [targetKeys, setTargetKeys] = useState<string[]>([]);
 * <Transfer
 *   dataSource={items}
 *   targetKeys={targetKeys}
 *   onChange={(keys) => setTargetKeys(keys)}
 * />
 *
 * // With search
 * <Transfer
 *   dataSource={items}
 *   targetKeys={targetKeys}
 *   onChange={(keys) => setTargetKeys(keys)}
 *   showSearch
 * />
 *
 * // With custom titles
 * <Transfer
 *   dataSource={items}
 *   targetKeys={targetKeys}
 *   onChange={(keys) => setTargetKeys(keys)}
 *   titles={['Available Users', 'Selected Users']}
 * />
 *
 * // Vertical orientation
 * <Transfer
 *   dataSource={items}
 *   targetKeys={targetKeys}
 *   onChange={(keys) => setTargetKeys(keys)}
 *   orientation="vertical"
 * />
 * ```
 */
const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(
  (
    {
      dataSource,
      targetKeys = [],
      selectedKeys: _controlledSelectedKeys,
      onChange,
      onSelectChange,
      titles = ["Source", "Target"],
      showSearch = false,
      onSearch,
      filterOption,
      searchPlaceholder = "Search...",
      render,
      showSelectAll = true,
      footer,
      operations = [<ChevronRight key="right" />, <ChevronLeft key="left" />],
      orientation = "horizontal",
      size = "md",
      disabled = false,
      showItemCount = true,
      emptyText,
      className,
      listClassName,
      operationsClassName,
      itemClassName,
      listHeight,
      pagination: _pagination = false,
      pageSize: _pageSize = 10,
      virtualized: _virtualized = false,
      ...props
    },
    ref,
  ) => {
    const [sourceSelectedKeys, setSourceSelectedKeys] = useState<string[]>([]);
    const [targetSelectedKeys, setTargetSelectedKeys] = useState<string[]>([]);

    // Split data into source and target
    const sourceItems = useMemo(
      () =>
        dataSource.filter(
          (item: TransferItem) => !targetKeys.includes(item.key),
        ),
      [dataSource, targetKeys],
    );

    const targetItems = useMemo(
      () =>
        targetKeys
          .map((key: string) =>
            dataSource.find((item: TransferItem) => item.key === key),
          )
          .filter(Boolean) as TransferItem[],
      [dataSource, targetKeys],
    );

    // Handle move to target
    const moveToTarget = () => {
      if (disabled) return;

      const newTargetKeys: string[] = [...targetKeys, ...sourceSelectedKeys];
      onChange?.(newTargetKeys, "right", sourceSelectedKeys);
      setSourceSelectedKeys([]);
    };

    // Handle move to source
    const moveToSource = () => {
      if (disabled) return;

      const newTargetKeys: string[] = targetKeys.filter(
        (key: string) => !targetSelectedKeys.includes(key),
      );
      onChange?.(newTargetKeys, "left", targetSelectedKeys);
      setTargetSelectedKeys([]);
    };

    // Handle source selection change
    const handleSourceSelectChange = (keys: string[]) => {
      setSourceSelectedKeys(keys);
      onSelectChange?.(keys, targetSelectedKeys);
    };

    // Handle target selection change
    const handleTargetSelectChange = (keys: string[]) => {
      setTargetSelectedKeys(keys);
      onSelectChange?.(sourceSelectedKeys, keys);
    };

    // Check if move buttons should be disabled
    const canMoveToTarget = sourceSelectedKeys.length > 0 && !disabled;
    const canMoveToSource = targetSelectedKeys.length > 0 && !disabled;

    return (
      <div
        ref={ref}
        className={cn(transferVariants({ orientation, size }), className)}
        {...props}
      >
        {/* Source List */}
        <TransferList
          direction="left"
          title={titles[0]}
          items={sourceItems}
          selectedKeys={sourceSelectedKeys}
          onSelectChange={handleSourceSelectChange}
          disabled={disabled}
          showSearch={showSearch}
          onSearch={(value) => onSearch?.("left", value)}
          searchPlaceholder={searchPlaceholder}
          showSelectAll={showSelectAll}
          showItemCount={showItemCount}
          render={render}
          footer={footer?.({ direction: "left" })}
          emptyText={emptyText}
          listClassName={listClassName}
          itemClassName={itemClassName}
          height={listHeight}
          filterOption={filterOption}
          size={size}
        />

        {/* Operations (Move buttons) */}
        <div
          className={cn(
            transferOperationsVariants({ orientation }),
            operationsClassName,
          )}
        >
          <button
            type="button"
            onClick={moveToTarget}
            disabled={!canMoveToTarget}
            className={cn(
              transferOperationButtonVariants({ size, orientation }),
            )}
            aria-label="Move selected items to target"
          >
            {operations[0]}
          </button>
          <button
            type="button"
            onClick={moveToSource}
            disabled={!canMoveToSource}
            className={cn(
              transferOperationButtonVariants({ size, orientation }),
            )}
            aria-label="Move selected items to source"
          >
            {operations[1]}
          </button>
        </div>

        {/* Target List */}
        <TransferList
          direction="right"
          title={titles[1]}
          items={targetItems}
          selectedKeys={targetSelectedKeys}
          onSelectChange={handleTargetSelectChange}
          disabled={disabled}
          showSearch={showSearch}
          onSearch={(value) => onSearch?.("right", value)}
          searchPlaceholder={searchPlaceholder}
          showSelectAll={showSelectAll}
          showItemCount={showItemCount}
          render={render}
          footer={footer?.({ direction: "right" })}
          emptyText={emptyText}
          listClassName={listClassName}
          itemClassName={itemClassName}
          height={listHeight}
          filterOption={filterOption}
          size={size}
        />
      </div>
    );
  },
);

Transfer.displayName = "Transfer";

export { Transfer, TransferList };
export default Transfer;
export type { TransferProps, TransferItem };
