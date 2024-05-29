import PostContent from "../../components/posts/post-detail/post-content";
import { getPostsFiles, getPostData } from "../../lib/posts-util";
import Head from "next/head";
export default function PostPage(props) {
  const { post } = props;
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />;
    </>
  );
}

export function getStaticProps(context) {
  const { slug } = context.params;
  const postData = getPostData(slug);
  return {
    props: { post: postData },
  };
}

export function getStaticPaths() {
  const postsFiles = getPostsFiles();
  const slugs = postsFiles.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
