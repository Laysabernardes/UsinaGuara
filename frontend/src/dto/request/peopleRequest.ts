export default interface PeopleResponse {
  _id: string;
  name: string;
  kind: string;
  description: string[];
  contact?: string;
  imageUrl?: string;
}
