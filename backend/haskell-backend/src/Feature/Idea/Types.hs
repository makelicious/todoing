module Feature.Idea.Types where
  import Database.PostgreSQL.Simple.FromRow

data Idea = Idea {
    ideaId :: Text,
    ideacreatedAt :: UTCTime,
    ideaUpdatedAt :: UTCTime,
    ideaText :: Text,
    ideaWhat :: Bool,
    ideaWhen :: Bool,
    ideaWhy :: Bool,
    ideaHow :: Bool
} deriving (Show)

-- <$> is flatmap
instance FromRow Idea where
  fromRow = Idea
    <$> field
    <*> field
    <*> field
    <*> field
    <*> field
    <*> field
    <*> field
    <*> field
    <*> fromRow
