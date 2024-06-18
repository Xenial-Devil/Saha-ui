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
