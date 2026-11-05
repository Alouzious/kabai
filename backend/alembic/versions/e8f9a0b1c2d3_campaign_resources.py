"""campaign resources

Revision ID: e8f9a0b1c2d3
Revises: b52e8a7d1f60
Create Date: 2026-11-05
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "e8f9a0b1c2d3"
down_revision = "b52e8a7d1f60"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "campaign_resources",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("category", sa.String(), nullable=False),
        sa.Column("file_path", sa.String(), nullable=True),
        sa.Column("external_url", sa.String(), nullable=True),
        sa.Column("original_filename", sa.String(), nullable=True),
        sa.Column("file_size", sa.BigInteger(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
    )


def downgrade():
    op.drop_table("campaign_resources")
