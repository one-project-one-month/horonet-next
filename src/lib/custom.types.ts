export type CommonProcedureResult<T> = Promise<
  { success: false; message: string } | { success: true; data: T }
>;
