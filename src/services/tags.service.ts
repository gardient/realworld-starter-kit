import { ITagsResponse } from "models/tag.interface";
import ApiClient from "./api-client.service";

export class TagService {
  public static getTags(): Promise<string[]> {
    return ApiClient.get<ITagsResponse>("/tags")
      .then((res) => res.tags);
  }
}

export default TagService;
