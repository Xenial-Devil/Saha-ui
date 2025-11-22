"use client";
import AvatarGroup from "../components/AvatarGroup";
import Avatar from "../components/Avatar";

export default function AvatarGroupExample() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Avatar Group</h2>
        <p className="text-muted-foreground">
          Display a compact list of user avatars with overflow indicator.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg">
          <AvatarGroup>
            <Avatar src="/images/avatar-1.jpg" alt="User 1" />
            <Avatar src="/images/avatar-2.jpg" alt="User 2" />
            <Avatar src="/images/avatar-3.jpg" alt="User 3" />
            <Avatar src="/images/avatar-4.jpg" alt="User 4" />
          </AvatarGroup>
        </div>
      </section>

      {/* Sizes & Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Sizes & Variants</h3>
        <div className="bg-muted/30 p-6 rounded-lg flex gap-6 items-center">
          <AvatarGroup>
            <Avatar size="sm" src="/images/avatar-1.jpg" alt="Small" />
            <Avatar size="sm" src="/images/avatar-2.jpg" alt="Small" />
          </AvatarGroup>
          <AvatarGroup>
            <Avatar size="lg" src="/images/avatar-3.jpg" alt="Large" />
            <Avatar size="lg" src="/images/avatar-4.jpg" alt="Large" />
          </AvatarGroup>
        </div>
      </section>

      {/* Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          Use AvatarGroup in lists, headers, or conversation previews.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <AvatarGroup>
              <Avatar src="/images/avatar-1.jpg" alt="User 1" />
              <Avatar src="/images/avatar-2.jpg" alt="User 2" />
              <Avatar src="/images/avatar-3.jpg" alt="User 3" />
            </AvatarGroup>
            <div>
              <div className="font-medium">Project Team</div>
              <div className="text-sm text-muted-foreground">3 members</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
