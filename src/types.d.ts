declare global {
  interface Window {
    gtag: (...args: any[]) => void
    ForerunnerDB: any,
  }
}


export interface WootItem {
  photo_url: string,
  title: string,
  url: string,
  uuid: string,
}
