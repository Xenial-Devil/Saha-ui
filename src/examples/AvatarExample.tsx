import { Avatar, AvatarGroup } from "../index";

export const AvatarExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6">Avatars</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">Single Avatars</h4>
          <div className="flex gap-4 items-center flex-wrap">
            <Avatar
              src="https://i.pravatar.cc/150?img=1"
              alt="User 1"
              size="md"
              shape="circle"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=2"
              alt="User 2"
              size="lg"
              shape="circle"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=3"
              alt="User 3"
              size="xl"
              shape="rounded"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=4"
              alt="User 4"
              size="2xl"
              shape="square"
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Avatar Group</h4>
          <AvatarGroup
            avatars={[
              { src: "https://i.pravatar.cc/150?img=5", alt: "User 5" },
              { src: "https://i.pravatar.cc/150?img=6", alt: "User 6" },
              { src: "https://i.pravatar.cc/150?img=7", alt: "User 7" },
              { src: "https://i.pravatar.cc/150?img=8", alt: "User 8" },
              { src: "https://i.pravatar.cc/150?img=9", alt: "User 9" },
            ]}
            max={3}
            size="2xl"
            gap={false}
          />
        </div>
      </div>
    </div>
  );
};
