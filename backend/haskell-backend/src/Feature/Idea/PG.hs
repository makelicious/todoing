module Feature.Idea.PG where
  import Feature.Idea.Types
  import Platform.PG
  import Database.PostgreSQL.Simple.SqlQQ
  import Database.PostgreSQL.Simple
  import Database.PostgreSQL.Simple.Types

  addIdea :: PG r m => UserId -> CreateArticle -> Slug -> m ()
  addIdea uId param slug =
    void . withConn $ \conn -> execute conn qry 
      ( slug, createArticleTitle param, createArticleDescription param
      , createArticleBody param, uId, PGArray $ createArticleTagList param
      )
    where
      qry = "INSERT INTO ideas (id, created_at, updated_at, text, what, \"when\", why, how)\
            \values (?, now(), now(), ?, ?, ?, ?, ?)"