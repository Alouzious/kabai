"""leadership applications

Revision ID: 7c1d2e9a4b10
Revises: c9d0e1f2a3b4
Create Date: 2026-11-04
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '7c1d2e9a4b10'
down_revision = 'c9d0e1f2a3b4'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'leadership_applications',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('site', sa.String(), nullable=False, server_default='indabax'),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('position', sa.String(), nullable=False),
        sa.Column('faculty', sa.String(), nullable=False),
        sa.Column('year_of_study', sa.String(), nullable=True),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('reason', sa.Text(), nullable=False),
        sa.Column('status', sa.String(), nullable=False, server_default='new'),
        sa.Column('created_at', sa.DateTime(), nullable=True),
    )


def downgrade():
    op.drop_table('leadership_applications')
