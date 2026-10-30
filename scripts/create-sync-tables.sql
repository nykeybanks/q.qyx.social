-- Create tables for content sync and import functionality

-- Sync configurations for connected platforms
CREATE TABLE IF NOT EXISTS sync_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  last_sync_at TIMESTAMPTZ,
  sync_interval INTEGER DEFAULT 24,
  auto_sync BOOLEAN DEFAULT FALSE,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Imported posts from external platforms
CREATE TABLE IF NOT EXISTS imported_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  external_id TEXT NOT NULL,
  content TEXT,
  media_urls TEXT[],
  author TEXT,
  author_username TEXT,
  author_avatar TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  views INTEGER,
  published_at TIMESTAMPTZ,
  imported_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB,
  converted_to_post BOOLEAN DEFAULT FALSE,
  converted_post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  UNIQUE(user_id, platform, external_id)
);

-- Sync jobs tracking
CREATE TABLE IF NOT EXISTS sync_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  items_processed INTEGER DEFAULT 0,
  items_total INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB
);

-- AI generated content from imports
CREATE TABLE IF NOT EXISTS ai_generated_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  source_post_id UUID REFERENCES imported_posts(id) ON DELETE CASCADE,
  generated_content TEXT NOT NULL,
  style TEXT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sync_configs_user ON sync_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_imported_posts_user ON imported_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_imported_posts_platform ON imported_posts(platform);
CREATE INDEX IF NOT EXISTS idx_sync_jobs_user ON sync_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generated_user ON ai_generated_content(user_id);

-- RLS policies
ALTER TABLE sync_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE imported_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sync configs" ON sync_configs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own imported posts" ON imported_posts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own sync jobs" ON sync_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own AI content" ON ai_generated_content FOR ALL USING (auth.uid() = user_id);
