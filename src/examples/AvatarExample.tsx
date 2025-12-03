import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "../index";

export const AvatarExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6">Avatars</h3>
      <div className="space-y-6">
        {/* Legacy Pattern - Simple Props */}
        <div>
          <h4 className="text-lg font-semibold mb-3">
            Legacy Pattern (Simple Props)
          </h4>
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
            {/* With fallback for broken image */}
            <Avatar
              src="https://broken-link.jpg"
              alt="Fallback User"
              fallback="FB"
              size="lg"
            />
            {/* With status */}
            <Avatar
              src="https://i.pravatar.cc/150?img=5"
              alt="Online User"
              size="lg"
              status="online"
            />
          </div>
        </div>

        {/* Compound Component Pattern */}
        <div>
          <h4 className="text-lg font-semibold mb-3">
            Compound Component Pattern
          </h4>
          <div className="flex gap-4 items-center flex-wrap">
            {/* Basic usage with image */}
            <Avatar className="w-12 h-12 border border-white/10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Judith Black"
              />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>

            {/* Fallback only (broken image) */}
            <Avatar className="w-12 h-12 border border-white/10">
              <AvatarImage src="https://broken-link.jpg" alt="Broken Image" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>

            {/* Different sizes */}
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User 1" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>

            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User 2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>

            <Avatar size="xl" shape="rounded">
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User 3" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>

            {/* With status indicator */}
            <Avatar size="lg" status="online">
              <AvatarImage
                src="https://i.pravatar.cc/150?img=4"
                alt="Online User"
              />
              <AvatarFallback>OU</AvatarFallback>
            </Avatar>

            {/* With ring */}
            <Avatar size="lg" ring>
              <AvatarImage
                src="https://i.pravatar.cc/150?img=5"
                alt="Ring User"
              />
              <AvatarFallback>RU</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Avatar Group */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Avatar Group</h4>
          <AvatarGroup max={3} size="2xl" gap={false}>
            <Avatar src="https://i.pravatar.cc/150?img=5" alt="User 5" />
            <Avatar src="https://i.pravatar.cc/150?img=6" alt="User 6" />
            <Avatar src="https://i.pravatar.cc/150?img=7" alt="User 7" />
            <Avatar src="https://i.pravatar.cc/150?img=8" alt="User 8" />
            <Avatar src="https://i.pravatar.cc/150?img=9" alt="User 9" />
          </AvatarGroup>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Avatar Group Compound</h4>
          <AvatarGroup max={3} size="2xl" gap={false}>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User 5" />
              <AvatarFallback>U5</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=6" alt="User 6" />
              <AvatarFallback>U6</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=7" alt="User 7" />
              <AvatarFallback>U7</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=8" alt="User 8" />
              <AvatarFallback>U8</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=9" alt="User 9" />
              <AvatarFallback>U9</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </div>
      </div>
    </div>
  );
};
