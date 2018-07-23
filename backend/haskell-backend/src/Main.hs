{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}
module Main where

import Web.Scotty
import Data.Monoid ((<>))
import Data.Aeson(FromJSON, ToJSON)
import GHC.Generics
import Database.PostgreSQL.Simple           (Connection, withTransaction, connectPostgreSQL)
import Database.PostgreSQL.Simple.Migration (
    MigrationCommand (MigrationInitialization, MigrationCommands, MigrationDirectory),
    MigrationContext (..),
    MigrationResult (..),
    SchemaMigration (..),
    getMigrations,
    runMigration
                                             )
import qualified Data.ByteString.Char8 as BS8 (pack)


data User = User { userId :: Int, userName :: String } deriving (Show, Generic)
instance ToJSON User
instance FromJSON User

bob :: User
bob = User { userId = 1, userName = "bob" }

jenny :: User
jenny = User { userId = 2, userName = "jenny" }


allUsers :: [User]
allUsers = [bob, jenny]

matchesId :: Int -> User -> Bool
matchesId id user = userId user == id

-- main = do
--   putStrLn "Starting server"
--   scotty 3000 $ do
--     get "/hello" $ do
--       text "Hello world!"
--     get "/hello/:name" $ do
--       name <- param "name"
--       text ("hello " <> name <> "!")
--     get "/users" $ do
--       json allUsers
--     get "/users/:id" $ do
--       id <- param "id"
--       json (filter (matchesId id) allUsers)



main = do
  let url = "postgres://todoing:todoing@localhost:5433/todoing"
  let dir = "migrations"
  con <- connectPostgreSQL (BS8.pack url)
  withTransaction con $ runMigration $
    MigrationContext (MigrationCommands [MigrationInitialization, (MigrationDirectory dir)]) True con
  putStrLn "Starting server"
  scotty 3000 $ do
    get "/ideas" $ do
      text "get ideas"
    post "/ideas" $ do
      text "post ideas"
    get "/tags" $ do
      text "get tags"
    delete "/ideas/:id" $ do
      id <- param "id"
      text ("Delete idea" <> id)