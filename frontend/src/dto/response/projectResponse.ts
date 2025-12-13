import type PeopleResponse from "./peopleResponse";

export default interface ProjectResponse {
  _id: string;
  title: string;
  subtitle: string;
  slug: string;
  about_html: string;
  team: PeopleResponse[];
  status: string;
  isCarousel: boolean;
  orderCarousel: number;
  banner: string;
  extraURL: string;
  createdAt: string;
  updatedAt: string;
}
