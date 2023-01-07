declare global {
  interface Window {
    gtag: (...args: any[]) => void
    ForerunnerDB: any,
  }
}

export interface WootItem {
  category: string,
  condition: string,
  date_end: string,
  date_start: string,
  discount: number,
  is_available_on_mobile_app_only:boolean,
  is_featured:boolean,
  is_fulfilled_by_amazon:boolean,
  is_sold_out:boolean,
  is_woot_off:boolean,
  list_price_min: number,
  list_price_max: number,
  min_price: number,
  max_price: number,
  sale_price_min: number,
  sale_price_max: number,
  photo_url: string,
  price: number,
  title: string,
  url: string,
  uuid: string,
}
