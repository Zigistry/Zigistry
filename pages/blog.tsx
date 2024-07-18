import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState } from 'react';
import { TextInput } from 'flowbite-react';
import { Card } from "flowbite-react";

interface Post {
  slug: string;
  title: string;
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  const [my_posts, set_my_posts] = useState(posts);

  function my_func(x: string) {
    set_my_posts(posts.filter(post => post.title.toLowerCase().includes(x.toLowerCase())));
  }

  return (
    <ul>
      <div className='flex items-center flex-col'>
        <h1 className="text-center font-semibold text-2xl my-5">Search Ziglang Blogs (Work in progress)</h1>
        <TextInput
          onChange={(e) => my_func(e.target.value)}
          placeholder="Search libraries"
          className="w-72 mb-5"
          autoFocus
        /></div>
      <div className='w-full flex flex-wrap justify-evenly'>
        {my_posts.length > 0 ? (
          my_posts.map((post, i) => (
            <Card key={i} className="max-w-sm my-4">
              <Link href={"blog/" + post.slug}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.title[0].toUpperCase() + post.title.slice(1)}
                </h5>
              </Link>
            </Card>
          ))
        ) : (
          <li>No posts found</li>
        )}
      </div>
    </ul>
  );
}

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), 'pages', 'blog');
  const filenames = fs.readdirSync(blogDirectory);

  const posts = filenames.map((filename) => {
    return {
      slug: filename.replace(/\.mdx$/, ''),
      title: filename.replace(/\.mdx$/, '').replace(/-/g, ' '), // Assuming the title is derived from the filename
    };
  });

  return {
    props: {
      posts,
    },
  };
}
