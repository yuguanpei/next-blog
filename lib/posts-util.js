import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier;
  const filePath = path.join(postsDirectory, `${postIdentifier}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getPostsFiles() {
  const postFiles = fs.readdirSync(postsDirectory);
  return postFiles;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((fileName) =>
    getPostData(fileName.replace(/\.md$/, ""))
  );
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB ? -1 : 1
  );
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
}
