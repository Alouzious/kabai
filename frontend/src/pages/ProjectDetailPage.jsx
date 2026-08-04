import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ExternalLink, ArrowLeft, Calendar, Tag } from "lucide-react";
import { FaGithub } from "react-icons/fa";
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

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const isIndabaX = location.pathname.startsWith("/indabax");
  const [project, setProject] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Project not found</h1>
        <Link
          to={isIndabaX ? "/indabax/projects" : "/projects"}
          className={`font-semibold ${isIndabaX ? "text-indabax-green hover:text-indabax-green-dark" : "text-accent hover:text-accent-light"}`}
        >
          Back to all projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return <div className="max-w-4xl mx-auto px-6 py-32 text-center text-[--color-text-body]">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="relative h-80 md:h-96 overflow-hidden">
        {project.cover_image_url && (
          <img src={project.cover_image_url} alt={project.title} className="w-full h-full object-cover" />
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isIndabaX ? "from-indabax-black via-indabax-black/40" : "from-charcoal via-charcoal/40"
          } to-transparent`}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={`${isIndabaX ? "text-indabax-green" : "text-accent"} font-semibold tracking-widest text-sm mb-3`}
            >
              {project.status === "completed" ? "COMPLETED PROJECT" : "ONGOING PROJECT"}
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
              className="font-display text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Link
            to={isIndabaX ? "/indabax/projects" : "/projects"}
            className={`inline-flex items-center gap-2 text-sm text-[--color-text-body] transition-colors mb-10 ${
              isIndabaX ? "hover:text-indabax-green" : "hover:text-accent"
            }`}
          >
            <ArrowLeft size={16} />
            <span>Back to all projects</span>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className={`rounded-2xl p-8 mb-10 ${
            isIndabaX ? "bg-indabax-black-light" : "bg-gradient-to-br from-cream to-cream-dark"
          }`}
        >
          <h2 className="font-display font-bold text-xl mb-3 flex items-center gap-2">
            <Tag size={18} className={isIndabaX ? "text-indabax-green" : "text-accent"} />
            <span>Abstract</span>
          </h2>
          <p className={`leading-relaxed text-[1.05rem] ${isIndabaX ? "text-white/80" : "text-[--color-text-body]"}`}>
            {project.abstract}
          </p>
        </motion.div>

        {project.description && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-xl mb-3">About This Project</h2>
            <p className="text-[--color-text-body] leading-relaxed text-[1.05rem] whitespace-pre-line">
              {project.description}
            </p>
          </motion.div>
        )}

        {project.tech_stack && project.tech_stack.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-xl mb-4">Built With</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((t) => (
                <span
                  key={t}
                  className={`${isIndabaX ? "bg-indabax-black-light" : "bg-charcoal"} text-white px-4 py-2 rounded-full text-sm font-medium`}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.3}
          className="flex flex-wrap gap-4 pt-6 border-t border-[--color-border-soft]"
        >
          {project.github_url && (
            
              <a
                href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${
                isIndabaX
                  ? "bg-indabax-black-light text-white hover:bg-indabax-green-dark"
                  : "bg-charcoal text-white hover:bg-charcoal-light"
              }`}
            >
              <FaGithub size={18} />
              <span>View GitHub Repo</span>
            </a>
          )}
          {project.live_url && (
            
              <a
                href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${
                isIndabaX
                  ? "bg-indabax-green text-indabax-black hover:bg-indabax-green-dark hover:text-white"
                  : "bg-accent text-white hover:bg-accent-light"
              }`}
            >
              <ExternalLink size={18} />
              <span>Visit Live Site</span>
            </a>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.4}
          className="flex items-center gap-2 text-sm text-[--color-text-body] mt-8"
        >
          <Calendar size={16} />
          <span>
            Published{" "}
            {new Date(project.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </motion.div>
      </div>
    </div>
  );
}