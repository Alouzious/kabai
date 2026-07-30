from datetime import datetime
from app.db.session import SessionLocal
from app.models.blog_post import BlogPost

def run():
    db = SessionLocal()
    try:
        posts = [
            {
                "site": "main",
                "title": "AI Beyond Code: Entering the Agentic Era",
                "slug": "ai-beyond-code-agentic-era",
                "excerpt": "Highlights from our holiday masterclass exploring agentic AI systems and what they mean for students getting started today.",
                "cover_image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
                "content": "Full write-up coming soon.",
                "author": "KAB AI Club",
                "is_published": True,
                "published_at": datetime.utcnow(),
            },
            {
                "site": "main",
                "title": "Building IndabaXHub: Lessons from Our First Platform",
                "slug": "building-indabaxhub-lessons",
                "excerpt": "What we learned building an African-focused dataset repository and model evaluation platform from scratch.",
                "cover_image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
                "content": "Full write-up coming soon.",
                "author": "KAB AI Club",
                "is_published": True,
                "published_at": datetime.utcnow(),
            },
            {
                "site": "main",
                "title": "Why We're Building AI Education in Kabale",
                "slug": "why-ai-education-kabale",
                "excerpt": "A look at why access to AI learning shouldn't be limited to big cities, and how our club is closing that gap.",
                "cover_image_url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
                "content": "Full write-up coming soon.",
                "author": "KAB AI Club",
                "is_published": True,
                "published_at": datetime.utcnow(),
            },
        ]

        for p in posts:
            exists = db.query(BlogPost).filter(BlogPost.slug == p["slug"]).first()
            if not exists:
                db.add(BlogPost(**p))

        db.commit()
        print("Blog posts seeded successfully.")
    finally:
        db.close()

if __name__ == "__main__":
    run()
