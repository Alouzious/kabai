import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import api from "../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .get(`/blog/${slug}`)
      .then((res) => setPost(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-accent font-semibold hover:text-accent-light">
          Back to all posts
        </Link>
      </div>
    );
  }

  if (!post) {
    return <div className="max-w-4xl mx-auto px-6 py-32 text-center text-text-body">Loading...</div>;
  }

  return (
    <div className="bg-white">
      {post.cover_image_url && (
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-body hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to all posts</span>
          </Link>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight"
        >
          {post.title}
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.15}
          variants={fadeUp}
          className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-text-body mb-8 pb-8 border-b border-border-soft"
        >
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-accent" />
              {post.author}
            </span>
          )}
          {post.published_at && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-accent" />
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          variants={fadeUp}
          className="prose-like text-text-body leading-relaxed text-[1.05rem] whitespace-pre-line"
        >
          {post.content}
        </motion.div>
      </div>
    </div>
  );
}