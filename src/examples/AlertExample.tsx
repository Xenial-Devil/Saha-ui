import Alert from "../components/Alert";

export const AlertExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Alert Component</h3>

      {/* Status Types */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Status Types</h4>
        <div className="space-y-4">
          <Alert
            status="success"
            message="Your changes have been saved successfully!"
          />

          <Alert
            status="danger"
            message="Something went wrong. Please try again."
          />

          <Alert status="warning" message="Please review before proceeding." />

          <Alert status="info" message="This is some helpful information." />
        </div>
      </div>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-4">
          <Alert variant="solid" status="success" message="Solid variant" />

          <Alert variant="subtle" status="info" message="Subtle variant" />

          <Alert
            variant="left-accent"
            status="warning"
            message="Left accent variant"
          />

          <Alert
            variant="top-accent"
            status="danger"
            message="Top accent variant"
          />

          <Alert variant="outline" status="info" message="Outline variant" />
        </div>
      </div>

      {/* With Titles */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Titles</h4>
        <div className="space-y-4">
          <Alert
            status="success"
            title="Payment Successful"
            message="Your payment has been processed successfully. You will receive a confirmation email shortly."
          />

          <Alert
            status="danger"
            title="Connection Failed"
            message="Unable to connect to the server. Please check your internet connection and try again."
          />
        </div>
      </div>

      {/* Closeable */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Closeable Alerts
        </h4>
        <div className="space-y-4">
          <Alert
            status="info"
            message="This alert can be dismissed."
            closeable
          />

          <Alert
            status="warning"
            title="Important Notice"
            message="Please read the terms and conditions before continuing."
            closeable
          />
        </div>
      </div>
    </div>
  );
};
