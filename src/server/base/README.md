# Service Layer Logging System

This logging system provides a way to enable/disable logging for service layer operations.

## Features

- Toggle logging on/off globally
- Set different log levels (error, warn, info, debug, etc.)
- Service-specific namespaced logs
- Performance timing for operations
- Structured logging with Winston

## Usage

### Basic Usage

To enable or disable logging:

```typescript
import LogConfig from '@/server/base/logConfig';

// Enable logging
LogConfig.enable();

// Disable logging
LogConfig.disable();
```

### Advanced Configuration

```typescript
import LogConfig from '@/server/base/logConfig';

// Configure with custom options
LogConfig.configure({
  enabled: true,
  level: 'debug' // Available levels: error, warn, info, http, verbose, debug, silly
});

// Set logging level only
LogConfig.setLevel('debug');

// Get current configuration
const config = LogConfig.getConfig();
console.log(config); // { enabled: true, level: 'debug' }
```

### Implementation in Services

The logging system is already integrated with service layers using the `withLogging` wrapper:

```typescript
// Example from UserService
async get(id: string) {
  return withAuth(async () => {
    return withLogging(
      async () => this.repository.findById(id),
      this.serviceName,
      'get',
      { id }
    );
  }, []);
}
```

This will log:
- When the operation starts
- When it completes (with duration)
- Any errors that occur (with error details)

## Log Output Example

When enabled, logs will appear in the console with this format:

```
[UserService] Starting get { id: '123' }
[UserService] Completed get in 45ms { success: true, duration: 45 }
```

Or for errors:

```
[UserService] Starting get { id: '123' }
[UserService] Failed get after 37ms: User not found { success: false, duration: 37, error: 'User not found' }
```
