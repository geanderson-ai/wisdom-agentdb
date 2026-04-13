# User Flow

## 1. First-time setup

1. User installs the CLI, SDK, or web app.
2. User connects a workspace or project.
3. User sets memory scope and privacy defaults.
4. System creates the initial project memory space.
5. User starts using the agent.

## 2. During a session

1. User asks the agent to do work.
2. System captures actions, decisions, and references.
3. Memory is stored as session context.
4. Important facts are summarized and indexed in the background.

## 3. Starting a new session

1. User opens a fresh session.
2. System loads relevant memory by scope.
3. System recalls project instructions and prior decisions.
4. User continues without re-explaining everything.

## 4. Searching memory

1. User asks a question or runs a search.
2. System performs semantic retrieval.
3. System applies scope filters and ranking.
4. System returns the most relevant memories with citations.

## 5. Saving a decision

1. User marks something important.
2. System stores it as a durable memory item.
3. Memory is linked to session, project, and source.
4. Later sessions can recall it automatically.

## 6. Privacy and deletion

1. User marks content as private or requests deletion.
2. System applies policy rules.
3. Sensitive data is excluded from future retrieval.
4. Audit trail records the change.

## 7. Export and import

1. User exports project memory.
2. System writes a portable artifact.
3. User imports the artifact into another workspace or agent.
4. Context remains transferable across environments.

