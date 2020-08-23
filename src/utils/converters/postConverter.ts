import { DeepNonNullable } from "utility-types";
import { PostPickFragment } from "../../../types/gatsby-graphql";

export const convertPostPick = ({ node: { excerpt, frontmatter: { title, createdAt, tags } } }: DeepNonNullable<PostPickFragment>) =>
  ({ title, createdAt: new Date(createdAt), excerpt, tags });
