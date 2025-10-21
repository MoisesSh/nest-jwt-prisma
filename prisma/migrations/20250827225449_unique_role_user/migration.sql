/*
  Warnings:

  - A unique constraint covering the columns `[role_Id,user_Id]` on the table `Role_Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_Users_role_Id_user_Id_key" ON "public"."Role_Users"("role_Id", "user_Id");
