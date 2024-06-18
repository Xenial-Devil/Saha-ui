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

#### Uses

```javascript
<Alert
  status={"danger"}
  variant={"subtle"}
  message={"this is success alert go to https://github.com/"}
  title={"Success"}
  closeable={true}
/>
```
