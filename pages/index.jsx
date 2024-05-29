import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";
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
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate: 1800,
  };
}

export default HomePage;
