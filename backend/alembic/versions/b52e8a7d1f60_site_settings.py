"""site settings

Revision ID: b52e8a7d1f60
Revises: 7c1d2e9a4b10
Create Date: 2026-11-04
"""
from alembic import op
import sqlalchemy as sa

revision = 'b52e8a7d1f60'
down_revision = '7c1d2e9a4b10'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'site_settings',
        sa.Column('name', sa.String(), primary_key=True),
        sa.Column('value', sa.String(), nullable=False, server_default=''),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )
    op.execute("INSERT INTO site_settings (name, value) VALUES ('indabax_applications_open', 'false')")


def downgrade():
    op.drop_table('site_settings')
