# Migration `20190928103446-change-test-model-to-assessment`

This migration has been generated by Patrick at 9/28/2019, 10:34:46 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190919113258-create-test-model..20190928103446-change-test-model-to-assessment
--- datamodel.dml
+++ datamodel.dml
@@ -20,22 +20,38 @@
   content   String?
   author    User?
 }
-model Test {
+model Assessment {
   id        String   @default(cuid()) @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   published Boolean
   title     String
   content   String?
   author    User?
+  questions Question[]
 }
+model QuestionOption {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  content   String
+  correct   Boolean
+}
+
+model Question {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  content   String
+  options   QuestionOption[]
+}
+
 model User {
   id       String  @default(cuid()) @id
   email    String  @unique
   password String
   name     String?
-  posts    Post[]
-  tests    Test[]
-}
+  assessments    Assessment[]
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190928103446-change-test-model-to-assessment)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190928103446-change-test-model-to-assessment'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
