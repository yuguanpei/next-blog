import AllPosts from "../../components/posts/all-posts";
import Head from "next/head";

export default function AllPostsPage(props) {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts"
        />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `https://www.imusm.cn/lcdp/api/blog/posts?t=${new Date().getTime()}`
  );
  const data = await response.json();
  const allPosts = data.data;
  return {
    props: {
      posts: allPosts,
    },
    revalidate: 3600,
  };
}
