# Pagination

A comprehensive pagination component for navigating through paginated content with multiple variants, sizes, and accessibility features.

## Features

- 🎨 **Multiple Variants** - 8 visual styles (default, primary, secondary, accent, ghost, glass, outlined, minimal)
- 📏 **Three Sizes** - Small, medium, and large sizing options
- 🔢 **Smart Ellipsis** - Automatically collapses page numbers for large page counts
- ♿ **Accessible** - Full ARIA support with descriptive labels
- ⌨️ **Keyboard Navigation** - Full keyboard support
- 🎯 **Customizable** - Control visibility of first/last/prev/next buttons
- 🎨 **Custom Labels** - Replace default icons with custom content
- 🌗 **Dark Mode** - Full dark mode support
- 🎭 **Animated Effects** - Smooth hover transitions and scale effects

## Installation

```bash
import { Pagination } from '@saha-ui/components';
```

## Basic Usage

```tsx
import { Pagination } from '@saha-ui/components';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination
      totalPages={10}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}
```

## Variants

### Default

```tsx
<Pagination
  variant="default"
  totalPages={10}
  currentPage={1}
  onPageChange={setPage}
/>
```

### Primary

```tsx
<Pagination
  variant="primary"
  totalPages={10}
  currentPage={1}
  onPageChange={setPage}
/>
```

### Glass

```tsx
<Pagination
  variant="glass"
  totalPages={10}
  currentPage={1}
  onPageChange={setPage}
/>
```

### Minimal

```tsx
<Pagination
  variant="minimal"
  totalPages={10}
  currentPage={1}
  onPageChange={setPage}
/>
```

## Sizes

```tsx
{/* Small */}
<Pagination size="sm" totalPages={10} currentPage={1} />

{/* Medium (default) */}
<Pagination size="md" totalPages={10} currentPage={1} />

{/* Large */}
<Pagination size="lg" totalPages={10} currentPage={1} />
```

## Shapes

```tsx
{/* Rounded (default) */}
<Pagination shape="rounded" totalPages={10} currentPage={1} />

{/* Pill */}
<Pagination shape="pill" totalPages={10} currentPage={1} />

{/* Square */}
<Pagination shape="square" totalPages={10} currentPage={1} />

{/* Circle */}
<Pagination shape="circle" totalPages={10} currentPage={1} />
```

## Custom Labels

```tsx
<Pagination
  totalPages={20}
  currentPage={10}
  previousLabel="← Prev"
  nextLabel="Next →"
  firstLabel="First"
  lastLabel="Last"
  onPageChange={setPage}
/>
```

## Sibling Count

Control how many page numbers appear around the current page:

```tsx
{/* Shows: 1 ... 5 [6] 7 ... 20 (siblingCount = 1) */}
<Pagination
  totalPages={20}
  currentPage={6}
  siblingCount={1}
  onPageChange={setPage}
/>

{/* Shows: 1 ... 4 5 [6] 7 8 ... 20 (siblingCount = 2) */}
<Pagination
  totalPages={20}
  currentPage={6}
  siblingCount={2}
  onPageChange={setPage}
/>
```

## Visibility Controls

```tsx
{/* Hide first/last buttons */}
<Pagination
  totalPages={20}
  currentPage={10}
  showFirstLast={false}
  onPageChange={setPage}
/>

{/* Hide prev/next buttons */}
<Pagination
  totalPages={20}
  currentPage={10}
  showPrevNext={false}
  onPageChange={setPage}
/>

{/* Hide page numbers (navigation only) */}
<Pagination
  totalPages={100}
  currentPage={50}
  showPageNumbers={false}
  onPageChange={setPage}
/>
```

## Common Patterns

### Table Pagination

```tsx
function DataTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <Table data={data.slice((page - 1) * itemsPerPage, page * itemsPerPage)} />
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        className="mt-4 justify-center"
      />
    </>
  );
}
```

### Search Results

```tsx
function SearchResults() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSearch(query, page);

  return (
    <>
      <div>
        {data.results.map(result => (
          <SearchResultCard key={result.id} {...result} />
        ))}
      </div>
      
      <Pagination
        variant="primary"
        totalPages={data.totalPages}
        currentPage={page}
        onPageChange={setPage}
        disabled={isLoading}
        aria-label="Search results pagination"
        className="mt-8"
      />
    </>
  );
}
```

### Blog Posts

```tsx
function BlogList() {
  const [page, setPage] = useState(1);
  const postsPerPage = 12;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {posts.map(post => <BlogCard key={post.id} {...post} />)}
      </div>
      
      <Pagination
        variant="ghost"
        size="lg"
        shape="pill"
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(newPage) => {
          setPage(newPage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="Blog posts navigation"
        className="mt-12 justify-center"
      />
    </div>
  );
}
```

### API Integration

```tsx
function Products() {
  const [page, setPage] = useState(1);
  
  const handlePageChange = async (newPage) => {
    setPage(newPage);
    await fetchProducts({ page: newPage, limit: 20 });
  };

  return (
    <>
      <ProductGrid products={products} />
      <Pagination
        totalPages={Math.ceil(totalProducts / 20)}
        currentPage={page}
        onPageChange={handlePageChange}
        aria-label="Product catalog pagination"
      />
    </>
  );
}
```

## Accessibility

### ARIA Labels

```tsx
<Pagination
  totalPages={10}
  currentPage={5}
  onPageChange={setPage}
  aria-label="Search results pagination"
/>
```

### Current Page Indication

The component automatically sets `aria-current="page"` on the active page button.

### Descriptive Button Labels

All navigation buttons include descriptive ARIA labels:
- "Go to first page, page 1"
- "Go to previous page, page X"
- "Go to page X"
- "Go to next page, page X"
- "Go to last page, page X"

### Keyboard Navigation

- **Tab** - Navigate between buttons
- **Shift+Tab** - Navigate backwards
- **Enter** - Activate button (change page)
- **Space** - Activate button (change page)

### Screen Reader Support

Screen readers will announce:
- The pagination navigation landmark
- Current page status
- Total number of pages
- Button states (disabled/enabled)

## Advanced Usage

### URL Sync

```tsx
import { useSearchParams } from 'react-router-dom';

function PaginatedList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <Pagination
      totalPages={50}
      currentPage={page}
      onPageChange={handlePageChange}
    />
  );
}
```

### With Loading State

```tsx
function PaginatedContent() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (newPage) => {
    setIsLoading(true);
    try {
      await fetchData(newPage);
      setPage(newPage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Pagination
        totalPages={20}
        currentPage={page}
        onPageChange={handlePageChange}
        disabled={isLoading}
      />
    </>
  );
}
```

### Responsive Pagination

```tsx
function ResponsivePagination() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <Pagination
      totalPages={50}
      currentPage={page}
      onPageChange={setPage}
      siblingCount={isMobile ? 0 : 1}
      size={isMobile ? 'sm' : 'md'}
      showFirstLast={!isMobile}
    />
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'glass' \| 'outlined' \| 'minimal'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of buttons |
| `shape` | `'rounded' \| 'square' \| 'pill' \| 'circle'` | `'rounded'` | Shape of buttons |
| `totalPages` | `number` | - | Total number of pages (required) |
| `currentPage` | `number` | `1` | Current active page (1-indexed) |
| `onPageChange` | `(page: number) => void` | - | Callback when page changes |
| `siblingCount` | `number` | `1` | Page buttons to show on each side |
| `showFirstLast` | `boolean` | `true` | Show first/last buttons |
| `showPrevNext` | `boolean` | `true` | Show prev/next buttons |
| `showPageNumbers` | `boolean` | `true` | Show page number buttons |
| `previousLabel` | `ReactNode` | - | Custom previous button content |
| `nextLabel` | `ReactNode` | - | Custom next button content |
| `firstLabel` | `ReactNode` | - | Custom first button content |
| `lastLabel` | `ReactNode` | - | Custom last button content |
| `disabled` | `boolean` | `false` | Disable all buttons |
| `aria-label` | `string` | `'Pagination'` | Accessible label |
| `className` | `string` | - | Additional CSS classes |

## Best Practices

### ✅ Do

- Provide meaningful aria-label for context
- Handle page changes asynchronously with loading states
- Scroll to top when page changes
- Sync with URL parameters for shareable links
- Show loading indicator during page transitions
- Use appropriate siblingCount for screen size
- Disable pagination during data loading

### ❌ Don't

- Don't forget to handle page change events
- Don't allow currentPage outside valid range (1 to totalPages)
- Don't show pagination for single page (totalPages <= 1)
- Don't use tiny siblingCount on desktop (hard to navigate)
- Don't forget to update currentPage prop
- Don't nest interactive elements inside buttons

## Performance

- **Renders**: Navigation element with buttons
- **Re-renders**: Only on prop changes
- **Bundle size**: ~3KB minified + gzipped
- **Memoized**: Page number generation is memoized
- **Smart ellipsis**: Efficiently handles large page counts

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## Related Components

- **Table** - For displaying paginated data
- **DataTable** - Advanced table with built-in pagination
- **InfiniteScroll** - Alternative to pagination

## Changelog

### v1.16.0
- Enhanced TypeScript types with comprehensive JSDoc
- Improved ARIA support with descriptive labels
- Added aria-hidden to decorative SVG icons
- Better keyboard navigation support
- Enhanced documentation with usage patterns
- Added role="navigation" for better semantics

---

**Need help?** Check the [component documentation](../README.md) or open an issue.