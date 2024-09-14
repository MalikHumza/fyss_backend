import { PAGINATION_CONFIG } from "../../config/pagination";

type TData = string | number | boolean | object | object[];
type TPaginationMetadata = {
  timestamp?: number;
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page?: number;
};
export class HttpResponse {
  public data: TData;
  public meta?: TPaginationMetadata;
  public error: boolean;
  public message?: string;

  constructor(data: TData, error: boolean = false, metadata?: TPaginationMetadata, message?: string) {
    if (metadata) {
      this.meta = {
        total_pages: metadata.total_pages,
        total_items: metadata.total_items,
        current_page: metadata.current_page,
        items_per_page: metadata.items_per_page ?? PAGINATION_CONFIG.ITEM_PER_PAGE,
        timestamp: Math.floor(Date.now() / 1000),
      };
    }
    this.data = data;
    this.error = error;
    if (message) {
      this.message = message;
    }
  }
}