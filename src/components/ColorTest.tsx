"use client";

// Simple color test component to debug CSS variables
export const ColorTest = () => {
  return (
    <div style={{ padding: "20px", background: "white", color: "black" }}>
      <h3>CSS Variable Test</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {/* Test with direct hex values */}
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#6366f1",
          }}
        >
          <div style={{ fontSize: "10px", padding: "5px" }}>Direct #6366f1</div>
        </div>

        {/* Test with CSS variable */}
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "var(--color-primary)",
          }}
        >
          <div style={{ fontSize: "10px", padding: "5px" }}>
            var(--color-primary)
          </div>
        </div>

        {/* Test getting computed value */}
        <div>
          <div style={{ fontSize: "12px" }}>
            Computed primary:
            <span id="computed-primary"></span>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        setTimeout(() => {
          const computed = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
          const el = document.getElementById('computed-primary');
          if (el) el.textContent = computed || 'NOT FOUND';
        }, 100);
      `,
        }}
      />
    </div>
  );
};
