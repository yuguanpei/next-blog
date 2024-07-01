import PostContent from "../../components/posts/post-detail/post-content";
import Head from "next/head";
export default function PostPage(props) {
  const { post } = props;
  // if (!post) {
  //   return <p className="center">Loading...</p>;
  // }
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

export async function getStaticProps(context) {
  const { slug } = context.params;
  const response = await fetch(
    `https://www.imusm.cn/lcdp/api/blog/posts/${slug}?t=${new Date().getTime()}`
  );
  const data = await response.json();
  const postData = data.data;
  if (!postData) {
    return { notFound: true };
  }

  return {
    props: { post: postData },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://www.imusm.cn/lcdp/api/blog/posts?featured=1&t=${new Date().getTime()}`
  );
  const data = await response.json();
  const allPosts = data.data;
  const slugs = allPosts.map((post) => post.slug);

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking", // true,
  };
}
