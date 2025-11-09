"use client";

import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { Paper } from "../../components/Paper";
import { Separator } from "../../components/Separator";
import {
  Heart,
  Star,
  Settings,
  Search,
  Plus,
  Menu,
  Save,
  Delete,
  Trash,
  Edit,
  Download,
  Upload,
  Share2,
  MoreVertical,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Bell,
  Mail,
  Phone,
  Camera,
  Mic,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

export function IconButtonExample() {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          IconButton Component Examples
        </h2>
        <p className="text-muted-foreground mb-6">
          A compact button component designed specifically for icons. Perfect
          for toolbars and action menus.
        </p>
      </div>

      {/* Variants */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <div className="text-center">
            <IconButton icon={<Heart />} variant="filled" aria-label="Like" />
            <p className="text-xs mt-2">Filled</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Heart />} variant="outlined" aria-label="Like" />
            <p className="text-xs mt-2">Outlined</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Heart />} variant="soft" aria-label="Like" />
            <p className="text-xs mt-2">Soft</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Heart />} variant="ghost" aria-label="Like" />
            <p className="text-xs mt-2">Ghost</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Heart />} variant="gradient" aria-label="Like" />
            <p className="text-xs mt-2">Gradient</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Heart />} variant="glass" aria-label="Like" />
            <p className="text-xs mt-2">Glass</p>
          </div>
        </div>
      </Paper>

      {/* Colors */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Colors</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Filled Variant</p>
            <div className="flex flex-wrap gap-2">
              <IconButton
                icon={<Star />}
                variant="filled"
                color="default"
                aria-label="Default"
              />
              <IconButton
                icon={<Star />}
                variant="filled"
                color="primary"
                aria-label="Primary"
              />
              <IconButton
                icon={<Star />}
                variant="filled"
                color="secondary"
                aria-label="Secondary"
              />
              <IconButton
                icon={<Star />}
                variant="filled"
                color="success"
                aria-label="Success"
              />
              <IconButton
                icon={<Star />}
                variant="filled"
                color="warning"
                aria-label="Warning"
              />
              <IconButton
                icon={<Star />}
                variant="filled"
                color="error"
                aria-label="Error"
              />
              <IconButton
                icon={<Star />}
                variant="filled"
                color="info"
                aria-label="Info"
              />
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Outlined Variant
            </p>
            <div className="flex flex-wrap gap-2">
              <IconButton
                icon={<Star />}
                variant="outlined"
                color="default"
                aria-label="Default"
              />
              <IconButton
                icon={<Star />}
                variant="outlined"
                color="primary"
                aria-label="Primary"
              />
              <IconButton
                icon={<Star />}
                variant="outlined"
                color="secondary"
                aria-label="Secondary"
              />
              <IconButton
                icon={<Star />}
                variant="outlined"
                color="success"
                aria-label="Success"
              />
              <IconButton
                icon={<Star />}
                variant="outlined"
                color="warning"
                aria-label="Warning"
              />
              <IconButton
                icon={<Star />}
                variant="outlined"
                color="error"
                aria-label="Error"
              />
              <IconButton
                icon={<Star />}
                variant="outlined"
                color="info"
                aria-label="Info"
              />
            </div>
          </div>
        </div>
      </Paper>

      {/* Sizes */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-center">
            <IconButton icon={<Settings />} size="xs" aria-label="Settings" />
            <p className="text-xs mt-2">XS</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Settings />} size="sm" aria-label="Settings" />
            <p className="text-xs mt-2">Small</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Settings />} size="md" aria-label="Settings" />
            <p className="text-xs mt-2">Medium</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Settings />} size="lg" aria-label="Settings" />
            <p className="text-xs mt-2">Large</p>
          </div>
          <div className="text-center">
            <IconButton icon={<Settings />} size="xl" aria-label="Settings" />
            <p className="text-xs mt-2">XL</p>
          </div>
        </div>
      </Paper>

      {/* Shapes */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Shapes</h3>
        <div className="flex flex-wrap gap-4">
          <div className="text-center">
            <IconButton
              icon={<Plus />}
              shape="square"
              variant="filled"
              color="primary"
              aria-label="Add"
            />
            <p className="text-xs mt-2">Square</p>
          </div>
          <div className="text-center">
            <IconButton
              icon={<Plus />}
              shape="rounded"
              variant="filled"
              color="primary"
              aria-label="Add"
            />
            <p className="text-xs mt-2">Rounded</p>
          </div>
          <div className="text-center">
            <IconButton
              icon={<Plus />}
              shape="circle"
              variant="filled"
              color="primary"
              aria-label="Add"
            />
            <p className="text-xs mt-2">Circle</p>
          </div>
        </div>
      </Paper>

      {/* States */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">States</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Loading</p>
            <div className="flex gap-2">
              <IconButton
                icon={<Save />}
                loading={loading}
                onClick={handleSave}
                variant="filled"
                color="primary"
                aria-label="Save"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm border rounded"
              >
                Trigger Loading
              </button>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-2">Disabled</p>
            <div className="flex gap-2">
              <IconButton
                icon={<Delete />}
                disabled
                variant="filled"
                aria-label="Delete"
              />
              <IconButton
                icon={<Delete />}
                disabled
                variant="outlined"
                aria-label="Delete"
              />
              <IconButton
                icon={<Delete />}
                disabled
                variant="soft"
                aria-label="Delete"
              />
            </div>
          </div>
        </div>
      </Paper>

      {/* Interactive Examples */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Interactive Examples</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <IconButton
              icon={liked ? <Heart className="fill-current" /> : <Heart />}
              onClick={() => setLiked(!liked)}
              color={liked ? "error" : "default"}
              variant={liked ? "filled" : "ghost"}
              aria-label={liked ? "Unlike" : "Like"}
            />
            <span className="text-sm">
              {liked ? "Liked!" : "Click to like"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <IconButton
              icon={starred ? <Star className="fill-current" /> : <Star />}
              onClick={() => setStarred(!starred)}
              color={starred ? "warning" : "default"}
              variant={starred ? "filled" : "ghost"}
              aria-label={starred ? "Unstar" : "Star"}
            />
            <span className="text-sm">
              {starred ? "Starred!" : "Click to star"}
            </span>
          </div>
        </div>
      </Paper>

      {/* Toolbar Example */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Toolbar Example</h3>
        <Paper elevation={1} padding="sm" rounded="lg">
          <div className="flex items-center gap-2">
            <IconButton icon={<Menu />} variant="ghost" aria-label="Menu" />
            <Separator orientation="vertical" className="h-6" />
            <IconButton icon={<Edit />} variant="ghost" aria-label="Edit" />
            <IconButton icon={<Save />} variant="ghost" aria-label="Save" />
            <IconButton
              icon={<Download />}
              variant="ghost"
              aria-label="Download"
            />
            <IconButton icon={<Upload />} variant="ghost" aria-label="Upload" />
            <Separator orientation="vertical" className="h-6" />
            <IconButton icon={<Share2 />} variant="ghost" aria-label="Share" />
            <IconButton
              icon={<Trash />}
              variant="ghost"
              color="error"
              aria-label="Delete"
            />
            <div className="flex-1" />
            <IconButton
              icon={<MoreVertical />}
              variant="ghost"
              aria-label="More options"
            />
          </div>
        </Paper>
      </Paper>

      {/* Media Controls */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Media Controls</h3>
        <Paper
          elevation={1}
          padding="md"
          rounded="xl"
          className="bg-gradient-to-br from-purple-500 to-pink-500"
        >
          <div className="flex items-center justify-center gap-4">
            <IconButton
              icon={<ChevronLeft />}
              variant="glass"
              size="lg"
              shape="circle"
              aria-label="Previous"
            />
            <IconButton
              icon={playing ? <Pause /> : <Play />}
              onClick={() => setPlaying(!playing)}
              variant="filled"
              size="xl"
              shape="circle"
              className="bg-white text-purple-500 hover:bg-white/90"
              aria-label={playing ? "Pause" : "Play"}
            />
            <IconButton
              icon={<ChevronRight />}
              variant="glass"
              size="lg"
              shape="circle"
              aria-label="Next"
            />
            <Separator orientation="vertical" className="h-10" />
            <IconButton
              icon={muted ? <VolumeX /> : <Volume2 />}
              onClick={() => setMuted(!muted)}
              variant="glass"
              size="lg"
              shape="circle"
              aria-label={muted ? "Unmute" : "Mute"}
            />
          </div>
        </Paper>
      </Paper>

      {/* Social Actions */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Social Actions</h3>
        <div className="flex flex-wrap gap-2">
          <IconButton
            icon={<Heart />}
            variant="soft"
            color="error"
            aria-label="Like"
          />
          <IconButton
            icon={<Star />}
            variant="soft"
            color="warning"
            aria-label="Favorite"
          />
          <IconButton
            icon={<Share2 />}
            variant="soft"
            color="info"
            aria-label="Share"
          />
          <IconButton
            icon={<Download />}
            variant="soft"
            color="success"
            aria-label="Download"
          />
          <IconButton
            icon={<Bell />}
            variant="soft"
            color="primary"
            aria-label="Notifications"
          />
        </div>
      </Paper>

      {/* Navigation */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Navigation Bar</h3>
        <Paper elevation={1} padding="sm" rounded="full">
          <div className="flex items-center justify-around">
            <IconButton
              icon={<Home />}
              variant="ghost"
              color="primary"
              aria-label="Home"
            />
            <IconButton icon={<Search />} variant="ghost" aria-label="Search" />
            <IconButton
              icon={<Plus />}
              variant="filled"
              color="primary"
              shape="circle"
              aria-label="Add"
            />
            <IconButton
              icon={<Bell />}
              variant="ghost"
              aria-label="Notifications"
            />
            <IconButton icon={<User />} variant="ghost" aria-label="Profile" />
          </div>
        </Paper>
      </Paper>

      {/* Contact Actions */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Contact Actions</h3>
        <div className="flex gap-2">
          <IconButton
            icon={<Phone />}
            variant="filled"
            color="success"
            size="lg"
            shape="circle"
            aria-label="Call"
          />
          <IconButton
            icon={<Mail />}
            variant="filled"
            color="info"
            size="lg"
            shape="circle"
            aria-label="Email"
          />
          <IconButton
            icon={<Camera />}
            variant="filled"
            color="primary"
            size="lg"
            shape="circle"
            aria-label="Video call"
          />
          <IconButton
            icon={<Mic />}
            variant="filled"
            color="secondary"
            size="lg"
            shape="circle"
            aria-label="Voice message"
          />
        </div>
      </Paper>

      {/* Dialog Actions */}
      <Paper elevation={2} padding="lg">
        <h3 className="text-lg font-semibold mb-4">Dialog Actions</h3>
        <Paper elevation={3} padding="lg" className="max-w-md">
          <div className="flex items-start justify-between mb-4">
            <h4 className="text-lg font-semibold">Delete Item?</h4>
            <IconButton
              icon={<X />}
              variant="ghost"
              size="sm"
              aria-label="Close"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex gap-2 justify-end">
            <IconButton icon={<X />} variant="outlined" aria-label="Cancel" />
            <IconButton
              icon={<Check />}
              variant="filled"
              color="error"
              aria-label="Confirm delete"
            />
          </div>
        </Paper>
      </Paper>
    </div>
  );
}

export default IconButtonExample;
