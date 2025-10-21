/*
  Warnings:

  - A unique constraint covering the columns `[role_Id,department_Id]` on the table `Role_Departments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_Departments_role_Id_department_Id_key" ON "public"."Role_Departments"("role_Id", "department_Id");
