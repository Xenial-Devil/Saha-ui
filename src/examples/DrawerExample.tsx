import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "../components/Drawer";
import Button from "../components/Button";

export const DrawerExample = () => {
  const [open1, setOpen1] = useState(false);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Drawer Component Examples</h2>
        <p className="text-muted-foreground mb-6">
          Side panel component with smooth animations and advanced features.
        </p>
      </div>

      {/* Basic Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Basic Examples</h3>

        <div className="flex flex-wrap gap-4">
          {/* Right Drawer */}
          <Drawer position="right" size="md">
            <DrawerTrigger asChild>
              <Button>Open Right Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Right Drawer</DrawerTitle>
                <DrawerDescription>
                  This is a right-positioned drawer with medium size.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-sm text-muted-foreground">
                  This is the main content area of the drawer. You can put any
                  content here including forms, lists, or other components.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Left Drawer */}
          <Drawer position="left" size="md">
            <DrawerTrigger asChild>
              <Button variant="secondary">Open Left Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Left Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides in from the left side.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-sm text-muted-foreground">
                  Left-positioned drawers are commonly used for navigation menus
                  or sidebar content.
                </p>
              </DrawerBody>
              <DrawerFooter align="right">
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Top Drawer */}
          <Drawer position="top" size="md">
            <DrawerTrigger asChild>
              <Button variant="accent">Open Top Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Top Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides down from the top.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-sm text-muted-foreground">
                  Top drawers are great for notifications or quick settings.
                </p>
              </DrawerBody>
              <DrawerFooter align="center">
                <DrawerClose>
                  <Button>Got it</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Bottom Drawer */}
          <Drawer position="bottom" size="md">
            <DrawerTrigger asChild>
              <Button variant="success">Open Bottom Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Bottom Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides up from the bottom.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-sm text-muted-foreground">
                  Bottom drawers are perfect for mobile-friendly actions or
                  sheets.
                </p>
              </DrawerBody>
              <DrawerFooter align="between">
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button>Confirm</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* Size Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Size Variants</h3>

        <div className="flex flex-wrap gap-4">
          {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <Drawer key={size} position="right" size={size}>
              <DrawerTrigger asChild>
                <Button variant="outline">Size: {size}</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{size.toUpperCase()} Drawer</DrawerTitle>
                  <DrawerDescription>
                    This drawer has a {size} size variant.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <p className="text-sm text-muted-foreground">
                    Content area for {size} drawer. The width/height adjusts
                    based on the size prop.
                  </p>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </section>

      {/* Backdrop Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Backdrop Variants</h3>

        <div className="flex flex-wrap gap-4">
          {(["default", "blur", "dark", "transparent"] as const).map(
            (backdrop) => (
              <Drawer key={backdrop} backdrop={backdrop}>
                <DrawerTrigger asChild>
                  <Button variant="outline">{backdrop}</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      {backdrop.charAt(0).toUpperCase() + backdrop.slice(1)}{" "}
                      Backdrop
                    </DrawerTitle>
                    <DrawerDescription>
                      Drawer with {backdrop} backdrop variant.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <p className="text-sm text-muted-foreground">
                      The backdrop has a {backdrop} effect.
                    </p>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button>Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )
          )}
        </div>
      </section>

      {/* Animation Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Animation Variants</h3>

        <div className="flex flex-wrap gap-4">
          {(["slide", "fade", "scale"] as const).map((animation) => (
            <Drawer key={animation} animation={animation}>
              <DrawerTrigger asChild>
                <Button variant="outline">{animation}</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    {animation.charAt(0).toUpperCase() + animation.slice(1)}{" "}
                    Animation
                  </DrawerTitle>
                  <DrawerDescription>
                    Drawer with {animation} animation.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <p className="text-sm text-muted-foreground">
                    This drawer uses the {animation} animation effect.
                  </p>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose>
                    <Button>Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </section>

      {/* Controlled Example */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Controlled Example</h3>

        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setOpen1(true)}>Open Controlled Drawer</Button>

          <Drawer open={open1} onOpenChange={setOpen1}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Controlled Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer's state is controlled externally.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <p className="text-sm text-muted-foreground mb-4">
                  The open state is managed by React state, allowing for
                  programmatic control.
                </p>
                <Button onClick={() => setOpen1(false)} variant="outline">
                  Close Programmatically
                </Button>
              </DrawerBody>
              <DrawerFooter>
                <Button>Save Changes</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </section>

      {/* No Overlay */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Without Overlay</h3>

        <Drawer showOverlay={false}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Without Overlay</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>No Overlay</DrawerTitle>
              <DrawerDescription>
                This drawer doesn't have a backdrop overlay.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-muted-foreground">
                Without an overlay, the page content remains fully visible and
                interactive.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      {/* Header Alignment */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Footer Alignment</h3>

        <div className="flex flex-wrap gap-4">
          {(["left", "center", "right", "between"] as const).map((align) => (
            <Drawer key={align}>
              <DrawerTrigger asChild>
                <Button variant="outline">Footer: {align}</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Footer Alignment</DrawerTitle>
                  <DrawerDescription>
                    Footer aligned to {align}.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <p className="text-sm text-muted-foreground">
                    Check the footer alignment below.
                  </p>
                </DrawerBody>
                <DrawerFooter align={align}>
                  <Button size="sm">Save</Button>
                  <DrawerClose>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </section>

      {/* Nested Drawer */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Nested Drawer</h3>

        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Parent Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Parent Drawer</DrawerTitle>
              <DrawerDescription>This is the first drawer.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-muted-foreground mb-4">
                You can open another drawer from within this drawer.
              </p>

              <Drawer nested position="left">
                <DrawerTrigger asChild>
                  <Button variant="secondary">Open Nested Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Nested Drawer</DrawerTitle>
                    <DrawerDescription>
                      This drawer is nested within another drawer.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <p className="text-sm text-muted-foreground">
                      Nested drawers have a lighter backdrop and higher z-index.
                    </p>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button>Close Nested</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close Parent</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      {/* No Close Button */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Without Close Button</h3>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">No Close Button</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader showCloseButton={false}>
              <DrawerTitle>No Close Button</DrawerTitle>
              <DrawerDescription>
                This drawer header doesn't have a close button.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-muted-foreground">
                You can still close it using the footer buttons, Escape key, or
                clicking the overlay.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>
                <Button>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>
    </div>
  );
};

export default DrawerExample;
