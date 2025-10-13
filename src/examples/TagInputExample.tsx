import { useState } from "react";
import TagInput from "../components/TagInput";

export const TagInputExample = () => {
  const [basicTags, setBasicTags] = useState<string[]>([]);
  const [emailTags, setEmailTags] = useState<string[]>([
    "john@example.com",
    "jane@example.com",
  ]);
  const [skillTags, setSkillTags] = useState<string[]>([
    "React",
    "TypeScript",
    "Node.js",
  ]);
  const [limitedTags, setLimitedTags] = useState<string[]>(["Tag 1", "Tag 2"]);
  const [validatedTags, setValidatedTags] = useState<string[]>([]);
  const [noDuplicates, setNoDuplicates] = useState<string[]>([
    "Unique1",
    "Unique2",
  ]);

  // Email validator
  const emailValidator = (tag: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(tag) || "Please enter a valid email address";
  };

  // Hashtag validator
  const hashtagValidator = (tag: string) => {
    return tag.startsWith("#") || "Hashtag must start with #";
  };

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          TagInput Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Input field where users can type and create tags by pressing Enter or
          Comma. Tags are removable and support validation, duplicates control,
          and more.
        </p>
      </div>

      {/* Basic TagInput */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Basic TagInput
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple tag input. Type and press Enter or Comma to create tags.
          </p>
        </div>
        <TagInput
          value={basicTags}
          onChange={setBasicTags}
          placeholder="Type and press Enter..."
        />
        <p className="text-sm text-muted-foreground">
          Tags: {basicTags.length > 0 ? basicTags.join(", ") : "None"}
        </p>
      </section>

      {/* Different Variants */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Variants
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            TagInput with different color variants
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TagInput
            variant="default"
            placeholder="Default variant"
            defaultValue={["Default", "Tag"]}
          />
          <TagInput
            variant="primary"
            placeholder="Primary variant"
            defaultValue={["Primary", "Tag"]}
          />
          <TagInput
            variant="secondary"
            placeholder="Secondary variant"
            defaultValue={["Secondary", "Tag"]}
          />
          <TagInput
            variant="accent"
            placeholder="Accent variant"
            defaultValue={["Accent", "Tag"]}
          />
          <TagInput
            variant="success"
            placeholder="Success variant"
            defaultValue={["Success", "Tag"]}
          />
          <TagInput
            variant="warning"
            placeholder="Warning variant"
            defaultValue={["Warning", "Tag"]}
          />
          <TagInput
            variant="error"
            placeholder="Error variant"
            defaultValue={["Error", "Tag"]}
          />
          <TagInput
            variant="info"
            placeholder="Info variant"
            defaultValue={["Info", "Tag"]}
          />
          <TagInput
            variant="outline"
            placeholder="Outline variant"
            defaultValue={["Outline", "Tag"]}
          />
          <TagInput
            variant="ghost"
            placeholder="Ghost variant"
            defaultValue={["Ghost", "Tag"]}
          />
          <TagInput
            variant="glass"
            placeholder="Glass variant"
            defaultValue={["Glass", "Tag"]}
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Sizes
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Small, medium, and large sizes
          </p>
        </div>
        <div className="space-y-4">
          <TagInput
            size="sm"
            placeholder="Small size"
            defaultValue={["Small", "Tag"]}
          />
          <TagInput
            size="md"
            placeholder="Medium size"
            defaultValue={["Medium", "Tag"]}
          />
          <TagInput
            size="lg"
            placeholder="Large size"
            defaultValue={["Large", "Tag"]}
          />
        </div>
      </section>

      {/* With Label and Helper Text */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Label and Helper Text
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            TagInput with label and helper text
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TagInput
            label="Skills"
            helperText="Add your technical skills"
            placeholder="e.g., React, TypeScript..."
            variant="primary"
            value={skillTags}
            onChange={setSkillTags}
          />
          <TagInput
            label="Email Recipients"
            helperText="Enter email addresses"
            placeholder="email@example.com"
            variant="accent"
            value={emailTags}
            onChange={setEmailTags}
          />
        </div>
      </section>

      {/* Max Tags Limit */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Max Tags Limit
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Limit the maximum number of tags
          </p>
        </div>
        <TagInput
          label="Tags (Max 5)"
          max={5}
          value={limitedTags}
          onChange={setLimitedTags}
          placeholder="Add up to 5 tags..."
          variant="warning"
        />
        <p className="text-sm text-muted-foreground">
          {limitedTags.length}/5 tags used
        </p>
      </section>

      {/* Email Validation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Email Validation
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Only accept valid email addresses
          </p>
        </div>
        <TagInput
          label="Email Addresses"
          placeholder="Enter email and press Enter..."
          validator={emailValidator}
          variant="primary"
          helperText="Only valid email addresses are accepted"
          defaultValue={["user@example.com"]}
        />
      </section>

      {/* Pattern Validation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Pattern Validation (Hashtags)
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Validate tags with regex pattern
          </p>
        </div>
        <TagInput
          label="Hashtags"
          placeholder="Enter hashtag (e.g., #react)..."
          pattern={/^#[a-zA-Z0-9_]+$/}
          variant="accent"
          helperText="Hashtags must start with # and contain only letters, numbers, and underscores"
          defaultValue={["#react", "#typescript"]}
        />
      </section>

      {/* Custom Validator */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Custom Validator
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use custom validation function
          </p>
        </div>
        <TagInput
          label="Hashtags"
          placeholder="Enter hashtag (e.g., #coding)..."
          validator={hashtagValidator}
          variant="info"
          helperText="Hashtags must start with #"
          defaultValue={["#coding", "#webdev"]}
        />
      </section>

      {/* No Duplicates */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            No Duplicates
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Prevent duplicate tags
          </p>
        </div>
        <TagInput
          label="Unique Tags"
          value={noDuplicates}
          onChange={setNoDuplicates}
          duplicates={false}
          placeholder="Try adding a duplicate..."
          variant="success"
          helperText="Duplicate tags are not allowed"
        />
      </section>

      {/* Min/Max Length */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Min/Max Length Validation
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enforce minimum and maximum tag length
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TagInput
            label="Min 3 Characters"
            minLength={3}
            placeholder="At least 3 chars..."
            helperText="Tags must be at least 3 characters"
            variant="warning"
          />
          <TagInput
            label="Max 10 Characters"
            maxLength={10}
            placeholder="Max 10 chars..."
            helperText="Tags must be at most 10 characters"
            variant="error"
          />
        </div>
      </section>

      {/* Custom Separators */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Custom Separators
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use custom separator keys
          </p>
        </div>
        <TagInput
          label="Space or Tab Separated"
          separators={[" ", "Tab"]}
          placeholder="Press Space or Tab to create tags..."
          helperText="Press Space or Tab to add tags"
          variant="secondary"
          defaultValue={["Tag1", "Tag2"]}
        />
      </section>

      {/* Paste Support */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Paste Multiple Tags
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Paste comma, newline, or tab-separated values
          </p>
        </div>
        <TagInput
          label="Paste Multiple"
          allowPaste
          placeholder="Try pasting: tag1, tag2, tag3"
          helperText="You can paste multiple tags separated by comma, newline, or tab"
          variant="primary"
        />
      </section>

      {/* Add on Blur */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Add on Blur
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Automatically add tag when input loses focus
          </p>
        </div>
        <TagInput
          label="Add on Blur"
          addOnBlur
          placeholder="Type and click outside..."
          helperText="Tag will be added when you click outside"
          variant="accent"
        />
      </section>

      {/* Clear on Blur */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Clear on Blur
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Clear input value when focus is lost
          </p>
        </div>
        <TagInput
          label="Clear on Blur"
          clearOnBlur
          placeholder="Type and click outside..."
          helperText="Input will be cleared when you click outside"
          variant="info"
        />
      </section>

      {/* Tag Styling Options */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Custom Tag Styling
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Customize tag appearance independently from container
          </p>
        </div>
        <div className="space-y-4">
          <TagInput
            label="Container: Default, Tags: Primary"
            variant="default"
            tagVariant="primary"
            placeholder="Type tags..."
            defaultValue={["Primary", "Tags"]}
          />
          <TagInput
            label="Container: Primary, Tags: Success"
            variant="primary"
            tagVariant="success"
            tagSize="lg"
            placeholder="Type tags..."
            defaultValue={["Large", "Success", "Tags"]}
          />
          <TagInput
            label="Container: Accent, Tags: Error (Small)"
            variant="accent"
            tagVariant="error"
            tagSize="sm"
            placeholder="Type tags..."
            defaultValue={["Small", "Error", "Tags"]}
          />
        </div>
      </section>

      {/* Rounded Variants */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Rounded Variants
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Different border radius options
          </p>
        </div>
        <div className="space-y-4">
          <TagInput
            rounded="default"
            placeholder="Default rounded"
            defaultValue={["Default", "Rounded"]}
          />
          <TagInput
            rounded="full"
            placeholder="Fully rounded (pill)"
            defaultValue={["Fully", "Rounded"]}
            variant="primary"
          />
          <TagInput
            rounded="none"
            placeholder="No rounded corners"
            defaultValue={["Sharp", "Corners"]}
            variant="secondary"
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Disabled State
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            TagInput in disabled state
          </p>
        </div>
        <TagInput
          label="Disabled"
          disabled
          value={["Cannot", "Edit", "These"]}
          placeholder="Disabled..."
        />
      </section>

      {/* Read Only */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Read Only
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            TagInput in read-only mode
          </p>
        </div>
        <TagInput
          label="Read Only"
          readOnly
          value={["View", "Only", "Tags"]}
          placeholder="Read only..."
          variant="ghost"
        />
      </section>

      {/* Error State */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Error State
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            TagInput with error message
          </p>
        </div>
        <TagInput
          label="With Error"
          error="At least 3 tags are required"
          placeholder="Add tags..."
          defaultValue={["Only", "Two"]}
        />
      </section>

      {/* Real-World Example - Blog Post Tags */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Real-World Example - Blog Post Tags
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tagging system for a blog post with validation
          </p>
        </div>
        <div className="max-w-2xl space-y-4">
          <TagInput
            label="Blog Tags"
            max={5}
            minLength={2}
            maxLength={20}
            duplicates={false}
            placeholder="Add up to 5 tags..."
            helperText="Tags must be 2-20 characters, max 5 tags"
            variant="primary"
            defaultValue={["JavaScript", "React", "Web Development"]}
            onAdd={(tag) => console.log("Added:", tag)}
            onRemove={(tag) => console.log("Removed:", tag)}
          />
        </div>
      </section>

      {/* Real-World Example - Invite by Email */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Real-World Example - Invite by Email
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Email invitation system with validation
          </p>
        </div>
        <div className="max-w-2xl space-y-4">
          <TagInput
            label="Invite Team Members"
            validator={emailValidator}
            duplicates={false}
            placeholder="Enter email addresses..."
            helperText="Press Enter or Comma after each email"
            variant="accent"
            value={validatedTags}
            onChange={setValidatedTags}
          />
          <div className="flex items-center justify-between p-4 rounded-lg border-2 border-border bg-muted/30">
            <span className="text-sm text-muted-foreground">
              {validatedTags.length} invitations ready
            </span>
            <button
              disabled={validatedTags.length === 0}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Send Invites
            </button>
          </div>
        </div>
      </section>

      {/* Callbacks Example */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Callbacks
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            React to tag events with callbacks
          </p>
        </div>
        <TagInput
          label="Callback Demo"
          placeholder="Add or remove tags..."
          variant="success"
          onAdd={(tag) => alert(`Added: ${tag}`)}
          onRemove={(tag, index) => alert(`Removed: ${tag} at index ${index}`)}
          onError={(error) => alert(`Error: ${error}`)}
          onFocus={() => console.log("Focused")}
          onBlur={() => console.log("Blurred")}
          defaultValue={["Tag 1"]}
        />
      </section>
    </div>
  );
};

export default TagInputExample;
