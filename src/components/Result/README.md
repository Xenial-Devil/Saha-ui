# Result

A professional result/status page component for displaying success, error, and HTTP status pages with predefined status types.

## Installation

```tsx
import { Result } from '@saha-ui/components';
```

## Usage

### Basic Result

```tsx
<Result
  status="success"
  title="Success"
  subTitle="Your operation completed successfully."
/>
```

### Status Types

The Result component supports 7 predefined status types:

```tsx
// Success
<Result status="success" />

// Error
<Result status="error" />

// Info
<Result status="info" />

// Warning
<Result status="warning" />

// 404 Not Found
<Result status="404" />

// 403 Forbidden
<Result status="403" />

// 500 Server Error
<Result status="500" />
```

### With Actions

Add action buttons in the extra slot:

```tsx
import { Button } from '@saha-ui/components';

<Result
  status="success"
  title="Order Placed Successfully"
  subTitle="Your order #12345 has been confirmed."
  extra={
    <>
      <Button onClick={() => navigate('/orders')}>
        View Orders
      </Button>
      <Button variant="outline" onClick={() => navigate('/')}>
        Continue Shopping
      </Button>
    </>
  }
/>
```

### Sizes

```tsx
<Result status="success" size="sm" />
<Result status="success" size="md" />
<Result status="success" size="lg" />
```

### Custom Title and Subtitle

Override default titles and subtitles:

```tsx
<Result
  status="success"
  title="Payment Successful"
  subTitle="Thank you for your payment. A receipt has been sent to your email."
/>
```

### Custom Icon

Provide a custom icon instead of the default:

```tsx
import { CheckCircleIcon } from 'lucide-react';

<Result
  status="success"
  icon={<CheckCircleIcon className="w-12 h-12" />}
  title="All Done!"
  subTitle="Everything is working perfectly."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | `'info'` | Status type of the result |
| `icon` | `ReactNode` | - | Custom icon to display |
| `title` | `ReactNode` | - | Title of the result (auto-generated if not provided) |
| `subTitle` | `ReactNode` | - | Subtitle/description (auto-generated if not provided) |
| `extra` | `ReactNode` | - | Additional content to display (usually actions) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the result component |
| `className` | `string` | - | Additional CSS classes |
| `iconClassName` | `string` | - | Additional CSS classes for icon container |
| `titleClassName` | `string` | - | Additional CSS classes for title |
| `subTitleClassName` | `string` | - | Additional CSS classes for subtitle |
| `extraClassName` | `string` | - | Additional CSS classes for extra content |

## Default Messages

Each status type has default title and subtitle:

| Status | Default Title | Default Subtitle |
|--------|--------------|------------------|
| `success` | Success | Your operation has been completed successfully. |
| `error` | Error | An error occurred while processing your request. |
| `info` | Information | Here is some information for you. |
| `warning` | Warning | Please pay attention to this warning. |
| `404` | 404 Not Found | Sorry, the page you visited does not exist. |
| `403` | 403 Forbidden | Sorry, you do not have permission to access this page. |
| `500` | 500 Server Error | Sorry, something went wrong on our end. |

## Examples

### 404 Page

```tsx
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      extra={
        <>
          <Button onClick={() => navigate('/')}>
            Go Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </>
      }
    />
  );
}
```

### Success Page

```tsx
function OrderSuccess() {
  return (
    <Result
      status="success"
      title="Order Placed Successfully"
      subTitle="Your order #12345 will arrive in 3-5 business days."
      extra={
        <>
          <Button onClick={() => navigate('/orders')}>
            View Order
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </>
      }
    />
  );
}
```

### Error Page

```tsx
function PaymentError() {
  return (
    <Result
      status="error"
      title="Payment Failed"
      subTitle="Your payment could not be processed. Please try again or use a different payment method."
      extra={
        <>
          <Button onClick={retryPayment}>
            Try Again
          </Button>
          <Button variant="ghost" onClick={() => navigate('/payment-methods')}>
            Change Payment Method
          </Button>
        </>
      }
    />
  );
}
```

### 403 Forbidden Page

```tsx
function ForbiddenPage() {
  return (
    <Result
      status="403"
      title="Access Denied"
      subTitle="You don't have permission to access this resource. Please contact your administrator."
      extra={
        <Button onClick={() => navigate('/')}>
          Go Home
        </Button>
      }
    />
  );
}
```

### 500 Server Error Page

```tsx
function ServerErrorPage() {
  return (
    <Result
      status="500"
      title="Server Error"
      subTitle="We're experiencing technical difficulties. Please try again later."
      extra={
        <>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </>
      }
    />
  );
}
```

### Warning with Actions

```tsx
function SessionExpiring() {
  return (
    <Result
      status="warning"
      title="Session Expiring Soon"
      subTitle="Your session will expire in 5 minutes. Please save your work."
      extra={
        <Button onClick={extendSession}>
          Extend Session
        </Button>
      }
    />
  );
}
```

### Custom Styled Result

```tsx
<Result
  status="success"
  title="Account Created"
  subTitle="Welcome to our platform! Your account has been created successfully."
  size="lg"
  className="bg-gradient-to-b from-transparent to-green-50"
  iconClassName="shadow-lg"
  titleClassName="text-gradient"
  extra={
    <Button size="lg" onClick={() => navigate('/dashboard')}>
      Get Started
    </Button>
  }
/>
```

### With Custom Icon and Content

```tsx
import { RocketIcon } from 'lucide-react';

<Result
  status="success"
  icon={<RocketIcon className="w-16 h-16 text-blue-500" />}
  title="Launch Successful"
  subTitle="Your application has been deployed and is now live!"
  extra={
    <div className="flex flex-col gap-2">
      <Button onClick={() => window.open('https://app.example.com')}>
        View Live Site
      </Button>
      <Button variant="outline" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </div>
  }
/>
```

### Info with List

```tsx
<Result
  status="info"
  title="Update Available"
  subTitle={
    <div>
      <p>Version 2.0 is now available with the following features:</p>
      <ul className="mt-2 text-left max-w-md mx-auto">
        <li>• Improved performance</li>
        <li>• New dashboard design</li>
        <li>• Enhanced security</li>
      </ul>
    </div>
  }
  extra={
    <Button onClick={handleUpdate}>
      Update Now
    </Button>
  }
/>
```

## Use Cases

### Authentication Flow

```tsx
// Successful registration
<Result
  status="success"
  title="Registration Complete"
  subTitle="Please check your email to verify your account."
/>

// Email verification success
<Result
  status="success"
  title="Email Verified"
  subTitle="Your email has been verified. You can now sign in."
  extra={
    <Button onClick={() => navigate('/login')}>
      Sign In
    </Button>
  }
/>
```

### E-commerce

```tsx
// Order confirmation
<Result
  status="success"
  title="Order Confirmed"
  subTitle="Order #12345 has been placed successfully."
/>

// Out of stock
<Result
  status="warning"
  title="Item Out of Stock"
  subTitle="This item is currently unavailable. We'll notify you when it's back."
/>
```

### Form Submissions

```tsx
// Successful submission
<Result
  status="success"
  title="Form Submitted"
  subTitle="Thank you for your submission. We'll get back to you soon."
/>

// Submission error
<Result
  status="error"
  title="Submission Failed"
  subTitle="Please check your information and try again."
/>
```

## Accessibility

- **Semantic HTML**: Uses proper heading hierarchy
- **ARIA Attributes**: Proper labeling for screen readers
- **Color Contrast**: All status colors meet WCAG AA standards
- **Keyboard Navigation**: Action buttons are keyboard accessible
- **Screen Reader Support**: Status and messages are properly announced

## Styling

The Result component uses CVA (Class Variance Authority) for styling. Customize it:

```tsx
<Result
  status="success"
  className="custom-result"
  iconClassName="custom-icon"
  titleClassName="custom-title"
  subTitleClassName="custom-subtitle"
  extraClassName="custom-extra"
/>
```

## Best Practices

1. **Use appropriate status types**: Match the status to the situation
2. **Provide clear messages**: Write helpful, actionable titles and subtitles
3. **Add relevant actions**: Give users a clear next step
4. **Keep it simple**: Don't overwhelm with too much information
5. **Consider mobile**: Test on mobile devices for responsiveness
6. **Use custom icons sparingly**: Default icons are already well-designed
7. **Maintain consistency**: Use similar messaging across your app

## Common Patterns

### With Redirect Timer

```tsx
function SuccessWithRedirect() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <Result
      status="success"
      title="Success"
      subTitle={`Redirecting to dashboard in ${seconds} seconds...`}
      extra={
        <Button onClick={() => navigate('/dashboard')}>
          Go Now
        </Button>
      }
    />
  );
}
```

### With Loading State

```tsx
function ProcessingResult() {
  const [status, setStatus] = useState<'info' | 'success' | 'error'>('info');

  useEffect(() => {
    processRequest()
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <Result
      status={status}
      title={status === 'info' ? 'Processing...' : status === 'success' ? 'Success' : 'Error'}
      subTitle={
        status === 'info' 
          ? 'Please wait while we process your request.' 
          : status === 'success'
          ? 'Your request has been processed.'
          : 'An error occurred while processing your request.'
      }
    />
  );
}
```

## Related Components

- [Alert](../Alert/README.md) - Inline alert messages
- [Dialog](../Dialog/README.md) - Modal dialogs
- [Notification](../Notification/README.md) - Toast notifications
- [Empty](../Empty/README.md) - Empty state component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Default icons are optimized for each status type
- Component is fully responsive and mobile-friendly
- Works well with React Router and other navigation libraries
- Can be used for full-page results or inline feedback