import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import Head from "next/head";
function HomePage(props) {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>Gary's Blog</title>
        <meta
          name="description"
          content="A post programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `https://www.imusm.cn/lcdp/api/blog/posts?featured=1&t=${new Date().getTime()}`
  );
  const data = await response.json();
  const featuredPosts = data.data;

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 3600,
  };
}

export default HomePage;
