"""add categories, slides, core_values, blog_posts; category FKs on projects/research_papers

Revision ID: a1b2c3d4e5f6
Revises: 10ef1eaa841e
Create Date: 2026-07-30
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "a1b2c3d4e5f6"
down_revision = "10ef1eaa841e"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "categories",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("slug", sa.String(), nullable=False, unique=True),
        sa.Column("type", sa.String(), nullable=False),
        sa.Column("order", sa.Integer(), server_default="0"),
        sa.Column("is_deleted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    op.create_table(
        "slides",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("site", sa.String(), nullable=False, server_default="main"),
        sa.Column("image_url", sa.String(), nullable=False),
        sa.Column("caption", sa.Text()),
        sa.Column("order", sa.Integer(), server_default="0"),
        sa.Column("is_active", sa.Boolean(), server_default="true"),
        sa.Column("is_deleted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    op.create_table(
        "core_values",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("site", sa.String(), nullable=False, server_default="main"),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text()),
        sa.Column("icon_name", sa.String(), server_default="Sparkles"),
        sa.Column("order", sa.Integer(), server_default="0"),
        sa.Column("is_deleted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    op.create_table(
        "blog_posts",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("site", sa.String(), nullable=False, server_default="main"),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("slug", sa.String(), nullable=False, unique=True),
        sa.Column("excerpt", sa.Text()),
        sa.Column("cover_image_url", sa.String()),
        sa.Column("content", sa.Text()),
        sa.Column("author", sa.String()),
        sa.Column("is_published", sa.Boolean(), server_default="true"),
        sa.Column("published_at", sa.DateTime(), nullable=True),
        sa.Column("is_deleted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(), nullable=True),
    )

    op.add_column("projects", sa.Column("category_id", postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key("fk_projects_category", "projects", "categories", ["category_id"], ["id"])

    op.add_column("research_papers", sa.Column("site", sa.String(), nullable=False, server_default="main"))
    op.add_column("research_papers", sa.Column("category_id", postgresql.UUID(as_uuid=True), nullable=True))
    op.create_foreign_key("fk_research_papers_category", "research_papers", "categories", ["category_id"], ["id"])
    op.drop_column("research_papers", "category")


def downgrade():
    op.add_column("research_papers", sa.Column("category", sa.String(), nullable=True))
    op.drop_constraint("fk_research_papers_category", "research_papers", type_="foreignkey")
    op.drop_column("research_papers", "category_id")
    op.drop_column("research_papers", "site")

    op.drop_constraint("fk_projects_category", "projects", type_="foreignkey")
    op.drop_column("projects", "category_id")

    op.drop_table("blog_posts")
    op.drop_table("core_values")
    op.drop_table("slides")
    op.drop_table("categories")