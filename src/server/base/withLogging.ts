import { createServiceLogger } from './logger';

/**
 * Higher-order function that wraps service operations with logging
 * @param operation - The service operation to execute
 * @param serviceName - The name of the service (for namespacing logs)
 * @param operationName - The name of the operation being performed
 * @param params - Optional parameters to log
 */
export default function withLogging<T>(
  operation: () => Promise<T>,
  serviceName: string,
  operationName: string,
  params?: Record<string, any>
): Promise<T> {
  const logger = createServiceLogger(serviceName);
  
  // Log the start of the operation
  logger.info(`Starting ${operationName}`, params);
  
  const startTime = Date.now();
  
  // Execute the operation
  return operation()
    .then((result) => {
      // Log successful completion
      const duration = Date.now() - startTime;
      logger.info(`Completed ${operationName} in ${duration}ms`, {
        success: true,
        duration,
      });
      return result;
    })
    .catch((error) => {
      // Log error
      const duration = Date.now() - startTime;
      logger.error(`Failed ${operationName} after ${duration}ms: ${error.message}`, {
        success: false,
        duration,
        error: error.message,
      });
      throw error;
    });
}
