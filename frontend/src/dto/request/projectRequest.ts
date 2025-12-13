import type PeopleResponse from "./peopleRequest";

export default interface ProjectRequest {
  _id?: string;
  title: string;
  subtitle?: string;
  slug: string;
  about_html?: string;
  team?: PeopleResponse[];
  status: string;
  isCarousel: boolean;
  orderCarousel?: number;
  banner?: string;
  extraURL?: string;
}
