# Saha-ui

## Components

### Component Name: Alert

#### Description:

The Alert component is a versatile notification element designed to display important messages or alerts to the user. It supports different alert types (success, error, warning, info) and can be customized with optional icons and actions, making it suitable for use in various applications to convey critical information.

Props:

`variant` : solid | subtle | left-accent | top-accent | outline `default solid`

`message` :string `default ""`

`title`: string `default ""`

`status`: "success" | "danger" | "warning" | "info" `default info`

`direction`: "row" | "column" `default row`

`align`: 'left' | 'center' | 'right' | 'justify' `default left`

`justify`: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch' `default center`

`textAlign`: 'left' | 'center' | 'right' | 'justify' `default left`

`height`: string `default ''`

`rounded`: boolean `default false`

`closeable`: boolean `default false`

#### Use

```javascript
<Alert
  status={"danger"}
  variant={"subtle"}
  message={"this is success alert go to https://github.com/"}
  title={"Success"}
  closeable={true}
/>
```

### Component Name:Accordion

#### Description:

The Accordion interface defines the properties required for an accordion item component. This interface is used to manage the state and behavior of individual items within an accordion, a UI component that allows users to toggle the visibility of sections of content. Each accordion item can be opened or closed, displaying its content conditionally based on its state.

#### Props

`isOpen (boolean)`: Indicates whether the accordion item is currently open (true) or closed (false).

`onClick (() => void)`: A callback function that is invoked when the accordion item is clicked. This function typically toggles the isOpen state.

`title (string)`: The title of the accordion item. This title is displayed when the item is closed and serves as the clickable element to open or close the item.

`content (string)`: The content of the accordion item. This content is shown when the item is open and hidden when the item is closed.

#### Use

```javascript
const items = [
  {
    title: "Title 1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsa dolor tempore eum, at excepturi! Nam itaque nostrum blanditiis, tempore obcaecati officiis molestias incidunt possimus omnis esse deserunt, officia consequatur?",
  },
  {
    title: "Title 2",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci illo deleniti recusandae doloribus enim, laboriosam quae eos iure iste asperiores cum neque vel. Laudantium laboriosam aliquam rem nam! Eligendi, ea.",
  },
  {
    title: "Title 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur libero illo corporis aliquid iusto, voluptas earum perspiciatis corrupti hic nobis. Nam neque numquam, eligendi commodi placeat itaque sed ullam culpa!",
  },
];
<Accordion variant={"firstopen"} items={items} />
      />
```

### Component Name:Avatar

#### Description:

The Avatar type defines the properties required for an avatar component. This interface is used to manage the visual representation of an avatar, which can be a user's profile picture or any other image in various shapes and sizes. It ensures the avatar is rendered with appropriate attributes such as source URL, alternative text, size, and shape.

#### Props:

`src (string, default: "")`: The URL of the image to be used as the avatar. It specifies the source of the image.

`alt (string, default: "Avatar")`: The alternative text for the avatar image. This text is displayed if the image cannot be loaded and is important for accessibility.

`size (number, default: 25)`: The size of the avatar in pixels. It defines the width and height dimensions of the avatar.

`shape ("circle" | "square" | "rounded", default: "circle")`: The shape of the avatar. It can be one of three values:

- `circle`: The avatar is displayed as a circle.
- `square`: The avatar is displayed as a square.
- `rounded`: The avatar is displayed with rounded corners.

#### Use

```javascript
<Avatar
  src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
  alt="Avatar"
  size={100}
  shape={"rounded"}
/>
```

### Component Name:AvatarGroup

#### Description

The AvatarGroup interface defines the properties for an avatar group component. This component is used to display a group of avatar images, allowing customization of their arrangement and appearance.

#### Props

`avatars (AvatarProps[])`: An array of AvatarProps objects representing the avatars to be displayed in the group.

`max (number, optional)`: Maximum number of avatars to display. If specified, only the first max avatars from the avatars array will be shown.

`size (number, optional)`: Size of each avatar in pixels. This defines the width and height dimensions of each avatar.

`overlap (number, optional)`: Amount of overlap between consecutive avatars in pixels. This can be used to create a stacked or overlapping effect.

`reverse (boolean, optional)`: If true, reverses the order of avatars in the group.

`gap (boolean,optional)`: If true, adds a gap between avatars. This is useful for creating a separation between avatars in the group.

#### Use

```javascript
const avatars = [
  { src: "avatar1.png", alt: "Avatar 1" },
  { src: "avatar2.png", alt: "Avatar 2" },
  { src: "avatar3.png", alt: "Avatar 3" },
  // Add more avatars as needed
];
<AvatarGroup avatars={avatars} max={3} size={50} overlap={0.2} gap={false} />;
```

> $\textcolor{red}{\textsf{*Note:}}$ If you are using gap then overlap is ignored and use as gap instead of overlapping.

### Component Name:List

#### Description

List is a component that displays a different type of list.

#### Props

##### List

`children(React.ReactNode)`: React component.

`listType('disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha' | 'none')`:type of list.

`className(string,optional)`:add ClassName to modify the list style

##### ListItem

`item:(string)`: A List Item To show
`className(string,optional)`:add ClassName to modify the list style

#### Uses

```javascript
const jsonArray = ["apple", "banana", "cherry"];
<List>
  jsonArray.map((arr,index)=>(
    <ListItem key={index} item={arr} />
  ))
</List>

```


### Component Name:Carousel

#### Description

The Carousel interface defines the properties for an carousel component. This component is used to display a group of images as a slides, allowing customization of their arrangement and appearance.

#### Props

##### for Carousel

`autoplay(boolean)`: automatically set the slide animation.

`autoplayInterval(number,optional)`: set the interval to change slide.

`showNavigation(boolean,optional)`: navigation shows or not.

`showIndicators(boolean,optional)`: Indicator shows or not.

`className(string,optional)`: for add css class to modification.

`containerStyle(React.CSSProperties,optional)`: directly add css style to container.

`navigationStyle(React.CSSProperties,optional)`: directly add css style to navigation.

`indicatorsStyle(React.CSSProperties,optional)`: directly add css style to indicators.
`children(React.ReactNode)`: A react component.

##### CarouseItem

`image(string)`: set the image.

`alt(string)`: set the alt.

`caption(string,optional)`:set the image caption that shows bottom center of image.

`title(string,optional)`:Set Title to show.

`description(string,optional)`: Set description.

`link(string,optional)`: Set Link to show.

`linkText?(string,optional)`: Set Link to link text.

`onClick?(() => void,optional)`:Set button as a click.

`linkTarget?("_blank" | "_self" | "_parent" | "_top",optional)`:Set Link behaviour.

`className?(string,optional)`:Add class name to modify.

`captionStyle?(React.CSSProperties,optional)`:directly add css style.

`titleStyle?(React.CSSProperties,optional)`:directly add css style.

`linkStyle?(React.CSSProperties,optional)`:directly add css style.

`descriptionStyle?(React.CSSProperties,optional)`:directly add css style.

`LinkIcon?(React.ElementType | null,optional)`: react element.

#### Use

```javascript
const images: CarouseItemProps[] = [
  {
    image:
      "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg",
    alt: "Sample Image 1",
    caption: "This is the first image",
    title: "Image 1 Title",
    description: "Description for the first image",
    link: "https://example.com/link1",
    linkText: "Go",
    linkTarget: "_blank",
    className: "image-class",
    captionStyle: {},
    titleStyle: {},
    linkStyle: {},
    onClick: () => {
      alert("Click");
    },
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2021/07/06/19/26/drops-6392473_960_720.jpg",
    alt: "Sample Image 2",
    caption: "This is the second image",
    title: "Image 2 Title",
    description: "Description for the second image",
    link: "https://example.com/link2",
    linkTarget: "_self",
    className: "image-class-secondary",
    captionStyle: {},
    titleStyle: {},
    linkStyle: {},
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2024/01/02/14/58/leaf-8483401_960_720.jpg",
    alt: "Sample Image 3",
    caption: "This is the third image",
    title: "Image 3 Title",
    description: "Description for the third image",
    link: "https://example.com/link3",
    linkTarget: "_top",
    className: "image-class-tertiary",
    captionStyle: {},
    titleStyle: {},
    linkStyle: {},
  },
];

<Carousel>
  {images.map((image, index) => (
    <CarouseItem key={index} {...image} />
  ))}
</Carousel>;
```

> $\textcolor{red}{\textsf{*Note:}}$ If you are using onClick then link and linkTarget is ignored and use onClick Function.

## Component Name:Tooltip

### Description
Tooltip make easier to use ui component

### Props

 `content(string)`:Specifies the text or content displayed in the tooltip.

  `children(React.ReactNode)`:The element that triggers the tooltip on hover.

  `position("top" | "bottom" | "left" | "right")`:Determines where the tooltip appears relative to the child element (`top`, `bottom`, `left`, `right`).
  
  ### Usage

  #### Tooltip on Text:

  ```javascript
  <Tooltip content="This is a tooltip">
  <span className="text-blue-500 underline cursor-pointer">Hover over me</span>
</Tooltip>
  ```
  #### Tooltip on Button:

  ```javascript
  <Tooltip content="Click to submit the form" position="right">
  <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
</Tooltip>
  ```
  #### Tooltip on an Icon:

  ```javascript
  <Tooltip content="Settings" position="bottom">
  <svg className="w-6 h-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c1.656854 0 3-1.343146 3-3s-1.343146-3-3-3-3 1.343146-3 3 1.343146 3 3 3zm0 6c-1.656854 0-3 1.343146-3 3s1.343146 3 3 3 3-1.343146 3-3-1.343146-3-3-3z"
    />
  </svg>
</Tooltip>
  ```