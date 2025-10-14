import { useState } from "react";
import TextArea from "../components/TextArea";

export default function TextAreaExample() {
  const [basicValue, setBasicValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [autoResizeValue, setAutoResizeValue] = useState("");
  const [blogPostValue, setBlogPostValue] = useState("");
  const [feedbackValue, setFeedbackValue] = useState("");

  return (
    <div className="space-y-16 p-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold">TextArea Component</h1>
        <p className="text-muted-foreground">
          Advanced multi-line text input with auto-resize, character count,
          validation, and more.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Usage</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            placeholder="Enter your text here..."
            label="Basic TextArea"
          />
          <TextArea
            placeholder="With helper text..."
            label="With Helper Text"
            helperText="This is a helpful message"
          />
        </div>
      </section>

      {/* All Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">All Variants</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TextArea
            variant="default"
            placeholder="Default variant"
            label="Default"
          />
          <TextArea
            variant="primary"
            placeholder="Primary variant"
            label="Primary"
          />
          <TextArea
            variant="secondary"
            placeholder="Secondary variant"
            label="Secondary"
          />
          <TextArea
            variant="accent"
            placeholder="Accent variant"
            label="Accent"
          />
          <TextArea
            variant="success"
            placeholder="Success variant"
            label="Success"
          />
          <TextArea
            variant="warning"
            placeholder="Warning variant"
            label="Warning"
          />
          <TextArea variant="error" placeholder="Error variant" label="Error" />
          <TextArea variant="info" placeholder="Info variant" label="Info" />
          <TextArea
            variant="outline"
            placeholder="Outline variant"
            label="Outline"
          />
          <TextArea variant="ghost" placeholder="Ghost variant" label="Ghost" />
          <TextArea variant="glass" placeholder="Glass variant" label="Glass" />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <TextArea
            size="sm"
            placeholder="Small size"
            label="Small (sm)"
            variant="primary"
          />
          <TextArea
            size="md"
            placeholder="Medium size"
            label="Medium (md)"
            variant="primary"
          />
          <TextArea
            size="lg"
            placeholder="Large size"
            label="Large (lg)"
            variant="primary"
          />
        </div>
      </section>

      {/* Rounded Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Rounded Variants</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <TextArea
            rounded="default"
            placeholder="Default rounded"
            label="Default"
            variant="accent"
          />
          <TextArea
            rounded="full"
            placeholder="Fully rounded"
            label="Full"
            variant="accent"
          />
          <TextArea
            rounded="none"
            placeholder="No rounded corners"
            label="None"
            variant="accent"
          />
        </div>
      </section>

      {/* Character Count */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Character Count</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            placeholder="Type here..."
            label="With Max Length"
            maxLength={200}
            showCount
            variant="primary"
            helperText="Maximum 200 characters"
          />
          <TextArea
            placeholder="Count at top right..."
            label="Count Top-Right"
            maxLength={150}
            showCount
            countPosition="top-right"
            variant="secondary"
          />
          <TextArea
            placeholder="Count at bottom right..."
            label="Count Bottom-Right"
            maxLength={100}
            showCount
            countPosition="bottom-right"
            variant="success"
          />
          <TextArea
            placeholder="Count at bottom left..."
            label="Count Bottom-Left"
            maxLength={180}
            showCount
            countPosition="bottom-left"
            variant="info"
          />
        </div>
      </section>

      {/* Auto-Resize */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Auto-Resize</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            value={autoResizeValue}
            onChange={(e) => setAutoResizeValue(e.target.value)}
            placeholder="Type to see auto-resize..."
            label="Auto-Resize (3-8 rows)"
            autoResize
            minRows={3}
            maxRows={8}
            variant="primary"
            helperText="Grows automatically as you type"
          />
          <TextArea
            placeholder="Auto-resize with count..."
            label="Auto-Resize + Count"
            autoResize
            minRows={2}
            maxRows={10}
            showCount
            maxLength={500}
            variant="accent"
          />
        </div>
      </section>

      {/* Clearable */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Clearable</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            onClear={() => setBasicValue("")}
            placeholder="Type and clear..."
            label="Clearable"
            clearable
            variant="primary"
          />
          <TextArea
            placeholder="Clearable with all features..."
            label="Clearable + Features"
            clearable
            showCount
            maxLength={250}
            autoResize
            minRows={3}
            maxRows={6}
            variant="success"
          />
        </div>
      </section>

      {/* Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Validation</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            placeholder="This field is required..."
            label="Required Field"
            required
            variant="warning"
            helperText="Cannot be empty"
          />
          <TextArea
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="Enter valid email addresses..."
            label="Email Format Validation"
            pattern={/^[\w\s,@.-]+$/}
            validator={(value) => {
              if (!value) return true;
              const emails = value.split(",").map((e) => e.trim());
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const allValid = emails.every((email) => emailRegex.test(email));
              return (
                allValid ||
                "Please enter valid email addresses (comma-separated)"
              );
            }}
            variant="info"
            helperText="Separate multiple emails with commas"
          />
        </div>
      </section>

      {/* Custom Validator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Validator</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            placeholder="Enter text (min 10 chars)..."
            label="Minimum Length"
            validator={(value) =>
              value.length >= 10 || "Must be at least 10 characters"
            }
            variant="primary"
          />
          <TextArea
            placeholder="No profanity allowed..."
            label="Word Filter"
            validator={(value) => {
              const badWords = ["bad", "worse", "worst"];
              const hasBadWord = badWords.some((word) =>
                value.toLowerCase().includes(word)
              );
              return !hasBadWord || "Please avoid inappropriate language";
            }}
            variant="warning"
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">States</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            placeholder="Disabled state"
            label="Disabled"
            disabled
            defaultValue="This textarea is disabled"
            variant="default"
          />
          <TextArea
            placeholder="Read-only state"
            label="Read-Only"
            readOnly
            defaultValue="This textarea is read-only"
            variant="secondary"
          />
          <TextArea
            placeholder="Loading..."
            label="Loading"
            loading
            variant="primary"
          />
          <TextArea
            placeholder="Error state"
            label="With Error"
            error="Something went wrong"
            variant="error"
          />
        </div>
      </section>

      {/* Real-World Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Real-World Examples</h2>

        {/* Blog Post */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Blog Post Editor</h3>
          <TextArea
            value={blogPostValue}
            onChange={(e) => setBlogPostValue(e.target.value)}
            placeholder="Write your blog post..."
            label="Blog Post Content"
            autoResize
            minRows={5}
            maxRows={15}
            showCount
            maxLength={5000}
            countPosition="bottom-right"
            clearable
            onClear={() => setBlogPostValue("")}
            variant="primary"
            size="lg"
            helperText="Write your amazing content here"
          />
        </div>

        {/* Feedback Form */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Feedback Form</h3>
          <TextArea
            value={feedbackValue}
            onChange={(e) => setFeedbackValue(e.target.value)}
            placeholder="Tell us what you think..."
            label="Your Feedback"
            required
            minRows={4}
            maxRows={8}
            autoResize
            showCount
            maxLength={1000}
            countPosition="top-right"
            variant="success"
            helperText="Your feedback helps us improve"
            validator={(value) =>
              value.length >= 10 ||
              "Please provide at least 10 characters of feedback"
            }
          />
        </div>

        {/* Code Snippet */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Code Snippet</h3>
          <TextArea
            placeholder="Paste your code here..."
            label="Code"
            rows={8}
            showCount
            maxLength={2000}
            clearable
            variant="ghost"
            className="font-mono"
            helperText="Paste or type code snippets"
          />
        </div>

        {/* Comment Section */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Comment Section</h3>
          <TextArea
            placeholder="Add your comment..."
            label="Comment"
            autoResize
            minRows={2}
            maxRows={6}
            showCount
            maxLength={500}
            countPosition="bottom-left"
            clearable
            variant="outline"
            helperText="Be respectful and constructive"
          />
        </div>
      </section>

      {/* With Callbacks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Callbacks</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TextArea
            placeholder="Type to see changes..."
            label="onChange Callback"
            onValueChange={(value) => console.log("Value:", value)}
            variant="primary"
            helperText="Check console for changes"
          />
          <TextArea
            placeholder="Clear and see callback..."
            label="onClear Callback"
            clearable
            onClear={() => console.log("Cleared!")}
            variant="success"
            helperText="Check console when cleared"
          />
        </div>
      </section>

      {/* Combined Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Combined Features</h2>
        <div className="space-y-6">
          <TextArea
            placeholder="The ultimate textarea..."
            label="All Features Combined"
            autoResize
            minRows={3}
            maxRows={10}
            showCount
            maxLength={1000}
            countPosition="top-right"
            clearable
            required
            variant="accent"
            size="lg"
            rounded="full"
            helperText="Auto-resize, count, clearable, required, and beautiful!"
            validator={(value) =>
              value.length >= 5 || "Minimum 5 characters required"
            }
          />
        </div>
      </section>
    </div>
  );
}
