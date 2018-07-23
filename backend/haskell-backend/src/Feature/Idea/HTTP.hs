module Feature.Idea.HTTP
  (
    routes,
    Service(..)
  ) where

import Feature.Idea.Types
import Web.Scotty.Trans
import Network.HTTP.Types.Status

class Monad m => Service m Where
    addIdea ::
    deleteIdea ::
    getIdeas ::
