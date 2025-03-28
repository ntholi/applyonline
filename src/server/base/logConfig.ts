import { configureLogger, enableLogging, disableLogging, setLogLevel, getLoggerConfig } from './logger';

/**
 * Utility class to manage logging configuration
 */
class LogConfig {
  /**
   * Enable logging for all services
   */
  static enable(): void {
    enableLogging();
    console.log('Logging has been enabled');
  }

  /**
   * Disable logging for all services
   */
  static disable(): void {
    disableLogging();
    console.log('Logging has been disabled');
  }

  /**
   * Configure logging with custom options
   * @param options - Configuration options
   */
  static configure(options: { enabled?: boolean; level?: string }): void {
    configureLogger(options);
    console.log('Logging configuration updated:', getLoggerConfig());
  }

  /**
   * Set the logging level
   * @param level - Logging level (error, warn, info, http, verbose, debug, silly)
   */
  static setLevel(level: string): void {
    setLogLevel(level);
    console.log(`Logging level set to: ${level}`);
  }

  /**
   * Get the current logging configuration
   */
  static getConfig() {
    return getLoggerConfig();
  }
}

export default LogConfig;
