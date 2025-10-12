import Timeline from "../components/Timeline";
import { Package, Truck, CheckCircle } from "lucide-react";

export const TimelineExample = () => {
  const items = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been placed successfully",
      time: "2 hours ago",
      icon: <Package size={20} />,
      status: "success" as const,
    },
    {
      id: 2,
      title: "Processing",
      description: "Your order is being prepared",
      time: "1 hour ago",
      icon: <Truck size={20} />,
      status: "primary" as const,
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your order is on the way",
      time: "30 minutes ago",
      icon: <CheckCircle size={20} />,
      status: "info" as const,
    },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Timeline Component</h3>

      {/* Basic Timeline */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Timeline</h4>
        <Timeline items={items} />
      </div>

      {/* Different Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Outlined</p>
            <Timeline items={items} variant="outlined" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Gradient</p>
            <Timeline items={items} variant="gradient" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Minimal</p>
            <Timeline items={items} variant="minimal" />
          </div>
        </div>
      </div>

      {/* Different Positions */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Positions</h4>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Left</p>
            <Timeline items={items} position="left" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Right</p>
            <Timeline items={items} position="right" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Alternate</p>
            <Timeline items={items} position="alternate" />
          </div>
        </div>
      </div>

      {/* With Different Status */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Different Status Colors
        </h4>
        <Timeline
          items={[
            {
              id: 1,
              title: "Success Status",
              description: "This item has success status",
              time: "Just now",
              status: "success",
            },
            {
              id: 2,
              title: "Warning Status",
              description: "This item has warning status",
              time: "5 minutes ago",
              status: "warning",
            },
            {
              id: 3,
              title: "Error Status",
              description: "This item has error status",
              time: "10 minutes ago",
              status: "error",
            },
            {
              id: 4,
              title: "Info Status",
              description: "This item has info status",
              time: "15 minutes ago",
              status: "info",
            },
          ]}
        />
      </div>
    </div>
  );
};
