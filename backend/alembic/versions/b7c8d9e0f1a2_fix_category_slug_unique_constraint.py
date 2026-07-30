"""fix category slug unique constraint to be per-type

Revision ID: b7c8d9e0f1a2
Revises: a1b2c3d4e5f6
Create Date: 2026-07-30
"""
from alembic import op

revision = "b7c8d9e0f1a2"
down_revision = "a1b2c3d4e5f6"
branch_labels = None
depends_on = None


def upgrade():
    op.drop_constraint("categories_slug_key", "categories", type_="unique")
    op.create_unique_constraint("uq_categories_slug_type", "categories", ["slug", "type"])


def downgrade():
    op.drop_constraint("uq_categories_slug_type", "categories", type_="unique")
    op.create_unique_constraint("categories_slug_key", "categories", ["slug"])