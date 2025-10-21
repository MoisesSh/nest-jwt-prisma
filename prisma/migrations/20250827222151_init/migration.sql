-- CreateTable
CREATE TABLE "public"."User" (
    "user_Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_Id")
);

-- CreateTable
CREATE TABLE "public"."Departments" (
    "department_Id" SERIAL NOT NULL,
    "name_department" TEXT NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_Id")
);

-- CreateTable
CREATE TABLE "public"."Departments_Users" (
    "department_user_id" SERIAL NOT NULL,
    "department_Id" INTEGER NOT NULL,
    "user_Id" INTEGER NOT NULL,

    CONSTRAINT "Departments_Users_pkey" PRIMARY KEY ("department_user_id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "role_Id" SERIAL NOT NULL,
    "name_role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_Id")
);

-- CreateTable
CREATE TABLE "public"."Role_Departments" (
    "role_departments_Id" SERIAL NOT NULL,
    "role_Id" INTEGER NOT NULL,
    "department_Id" INTEGER NOT NULL,

    CONSTRAINT "Role_Departments_pkey" PRIMARY KEY ("role_departments_Id")
);

-- CreateTable
CREATE TABLE "public"."Role_Users" (
    "role_user_id" SERIAL NOT NULL,
    "role_Id" INTEGER NOT NULL,
    "user_Id" INTEGER NOT NULL,

    CONSTRAINT "Role_Users_pkey" PRIMARY KEY ("role_user_id")
);

-- CreateTable
CREATE TABLE "public"."Authentication" (
    "session_Id" SERIAL NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("session_Id")
);

-- CreateTable
CREATE TABLE "public"."Before_password" (
    "before_id" SERIAL NOT NULL,
    "user_Id" INTEGER NOT NULL,

    CONSTRAINT "Before_password_pkey" PRIMARY KEY ("before_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_name_department_key" ON "public"."Departments"("name_department");

-- CreateIndex
CREATE UNIQUE INDEX "Departments_Users_department_Id_user_Id_key" ON "public"."Departments_Users"("department_Id", "user_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_role_key" ON "public"."Role"("name_role");

-- AddForeignKey
ALTER TABLE "public"."Departments_Users" ADD CONSTRAINT "Departments_Users_department_Id_fkey" FOREIGN KEY ("department_Id") REFERENCES "public"."Departments"("department_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Departments_Users" ADD CONSTRAINT "Departments_Users_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Departments" ADD CONSTRAINT "Role_Departments_role_Id_fkey" FOREIGN KEY ("role_Id") REFERENCES "public"."Role"("role_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Departments" ADD CONSTRAINT "Role_Departments_department_Id_fkey" FOREIGN KEY ("department_Id") REFERENCES "public"."Departments"("department_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Users" ADD CONSTRAINT "Role_Users_role_Id_fkey" FOREIGN KEY ("role_Id") REFERENCES "public"."Role"("role_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Users" ADD CONSTRAINT "Role_Users_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Authentication" ADD CONSTRAINT "Authentication_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Before_password" ADD CONSTRAINT "Before_password_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "public"."User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
