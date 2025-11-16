-- CreateTable
CREATE TABLE "Artist" (
    "artist_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT NOT NULL DEFAULT '',
    "web_site" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("artist_id")
);

-- CreateTable
CREATE TABLE "Valorations" (
    "valorations_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "like" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Valorations_pkey" PRIMARY KEY ("valorations_id")
);

-- CreateTable
CREATE TABLE "Upgrade" (
    "upgrade_id" SERIAL NOT NULL,
    "upgrade_name" TEXT NOT NULL,

    CONSTRAINT "Upgrade_pkey" PRIMARY KEY ("upgrade_id")
);

-- CreateTable
CREATE TABLE "Upgrade_Users" (
    "upgrade_user_id" SERIAL NOT NULL,
    "upgrade_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Upgrade_Users_pkey" PRIMARY KEY ("upgrade_user_id")
);

-- CreateTable
CREATE TABLE "Taste" (
    "taste_id" SERIAL NOT NULL,
    "taste_name" TEXT NOT NULL,

    CONSTRAINT "Taste_pkey" PRIMARY KEY ("taste_id")
);

-- CreateTable
CREATE TABLE "Taste_Users" (
    "taste_user_id" SERIAL NOT NULL,
    "taste_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Taste_Users_pkey" PRIMARY KEY ("taste_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_user_id_key" ON "Artist"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Valorations_user_id_artist_id_key" ON "Valorations"("user_id", "artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "Taste_Users_taste_id_user_id_key" ON "Taste_Users"("taste_id", "user_id");

-- CreateIndex
CREATE INDEX "Authentication_token_idx" ON "Authentication"("token");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valorations" ADD CONSTRAINT "Valorations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Valorations" ADD CONSTRAINT "Valorations_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upgrade_Users" ADD CONSTRAINT "Upgrade_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upgrade_Users" ADD CONSTRAINT "Upgrade_Users_upgrade_id_fkey" FOREIGN KEY ("upgrade_id") REFERENCES "Upgrade"("upgrade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taste_Users" ADD CONSTRAINT "Taste_Users_taste_id_fkey" FOREIGN KEY ("taste_id") REFERENCES "Taste"("taste_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taste_Users" ADD CONSTRAINT "Taste_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
