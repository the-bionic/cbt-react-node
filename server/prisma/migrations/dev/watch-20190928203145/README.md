# Migration `watch-20190928203145`

This migration has been generated by Patrick at 9/28/2019, 8:31:45 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "lift"."new_Question"("assessment" TEXT    REFERENCES "Assessment"(id) ON DELETE SET NULL,"content" TEXT NOT NULL DEFAULT ''  ,"createdAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,"id" TEXT NOT NULL   ,"questionType" TEXT NOT NULL DEFAULT 'TEXT'  ,"updatedAt" DATE NOT NULL DEFAULT '1970-01-01 00:00:00'  ,PRIMARY KEY ("id"))
;

INSERT INTO "new_Question" ("assessment","content","createdAt","id","updatedAt") SELECT "assessment","content","createdAt","id","updatedAt" from "Question"

DROP TABLE "lift"."Question";

ALTER TABLE "lift"."new_Question" RENAME TO "Question";

PRAGMA "lift".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration watch-20190928112343..watch-20190928203145
--- datamodel.dml
+++ datamodel.dml
@@ -44,11 +44,17 @@
   id        String   @default(cuid()) @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   content   String
+  questionType QuestionType @default(TEXT)
   options   QuestionOption[]
 }
+enum QuestionType {
+  TEXT
+  SELECT
+}
+
 model User {
   id       String  @default(cuid()) @id
   email    String  @unique
   password String
```

## Photon Usage

You can use a specific Photon built for this migration (watch-20190928203145)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/watch-20190928203145'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```