import { Timeline, TimelineItem } from "../components/Timeline";
import { Package, Truck, CheckCircle, Mail, Calendar } from "lucide-react";

export const TimelineExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Timeline Component</h3>

      {/* Basic Timeline */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Timeline</h4>
        <Timeline>
          <TimelineItem
            title="Order Placed"
            description="Your order has been placed successfully"
            time="2 hours ago"
            icon={<Package size={20} />}
            status="success"
          />
          <TimelineItem
            title="Processing"
            description="Your order is being prepared"
            time="1 hour ago"
            icon={<Truck size={20} />}
            status="pending"
          />
          <TimelineItem
            title="Shipped"
            description="Your order is on the way"
            time="30 minutes ago"
            icon={<CheckCircle size={20} />}
            status="info"
          />
        </Timeline>
      </div>

      {/* Different Variants */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Outlined</p>
            <Timeline variant="outlined">
              <TimelineItem
                title="Email Sent"
                description="Welcome email sent to user"
                time="5 minutes ago"
                icon={<Mail size={20} />}
              />
              <TimelineItem
                title="Account Created"
                description="User account successfully created"
                time="10 minutes ago"
                icon={<CheckCircle size={20} />}
              />
            </Timeline>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Gradient</p>
            <Timeline variant="gradient">
              <TimelineItem
                title="Project Started"
                description="Initial project setup complete"
                time="Yesterday"
                icon={<Calendar size={20} />}
              />
              <TimelineItem
                title="Milestone Reached"
                description="50% completion achieved"
                time="Today"
                icon={<CheckCircle size={20} />}
              />
            </Timeline>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Minimal</p>
            <Timeline variant="minimal">
              <TimelineItem
                title="Task Created"
                description="New task added to the board"
                time="1 day ago"
              />
              <TimelineItem
                title="Task Completed"
                description="Task marked as done"
                time="2 hours ago"
              />
            </Timeline>
          </div>
        </div>
      </div>

      {/* Different Positions */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Positions</h4>
        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Left</p>
            <Timeline position="left">
              <TimelineItem
                title="Event 1"
                description="Left aligned event"
                time="10:00 AM"
              />
              <TimelineItem
                title="Event 2"
                description="Another left aligned event"
                time="11:00 AM"
              />
            </Timeline>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Right</p>
            <Timeline position="right">
              <TimelineItem
                title="Event 1"
                description="Right aligned event"
                time="10:00 AM"
              />
              <TimelineItem
                title="Event 2"
                description="Another right aligned event"
                time="11:00 AM"
              />
            </Timeline>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Alternate</p>
            <Timeline position="alternate">
              <TimelineItem
                title="Design Phase"
                description="UI/UX design completed"
                time="Week 1"
                icon={<CheckCircle size={20} />}
                status="success"
              />
              <TimelineItem
                title="Development"
                description="Feature implementation in progress"
                time="Week 2-3"
                icon={<Package size={20} />}
                status="pending"
              />
              <TimelineItem
                title="Testing"
                description="QA and bug fixes"
                time="Week 4"
                icon={<Truck size={20} />}
                status="info"
              />
            </Timeline>
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Small</p>
            <Timeline size="sm">
              <TimelineItem title="Small Event" time="Now" />
              <TimelineItem title="Another Event" time="Later" />
            </Timeline>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Large</p>
            <Timeline size="lg">
              <TimelineItem
                title="Large Event"
                description="This is a larger timeline item"
                time="Today"
                icon={<CheckCircle size={24} />}
              />
              <TimelineItem
                title="Another Event"
                description="With more details"
                time="Tomorrow"
                icon={<Package size={24} />}
              />
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
};
