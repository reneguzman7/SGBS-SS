-- Database: SGBS-SS

-- DROP DATABASE IF EXISTS "SGBS-SS";
select * from pg_roles

CREATE DATABASE "SGBS-SS"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Ecuador.1252'
    LC_CTYPE = 'Spanish_Ecuador.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

	-- Database: SGBS-SS

-- Crear tabla de Usuarios
CREATE TABLE "User" (
    "idUser" SERIAL PRIMARY KEY,
    "typeOfUser" TEXT NOT NULL DEFAULT 'defaultType',
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Aseguradoras
CREATE TABLE "Ensurance" (
    "idEnsurance" SERIAL PRIMARY KEY,
    "insurerName" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "telf" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ NOT NULL,
    "comission" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de Tipos de Seguro
CREATE TABLE "typeOfEnsurance" (
    "idTypeOfEnsurance" SERIAL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ensuranceId" INTEGER REFERENCES "Ensurance"("idEnsurance") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Crear tabla de Productos
CREATE TABLE "Product" (
    "idProduct" SERIAL PRIMARY KEY,
    "productName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ensuranceId" INTEGER REFERENCES "Ensurance"("idEnsurance") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Crear tabla de Clientes
CREATE TABLE "Customer" (
    "idCustomer" SERIAL PRIMARY KEY,
    "policy" TEXT NOT NULL,
    "inferable" TEXT NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ NOT NULL,
    "validityDate" TIMESTAMPTZ,
    "isInsured" BOOLEAN NOT NULL,
    "cancelationCause" TEXT NOT NULL,
    "cancelationDate" TIMESTAMPTZ NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ensuranceId" INTEGER REFERENCES "Ensurance"("idEnsurance") ON DELETE SET NULL,
    "typeOfEnsuranceId" INTEGER REFERENCES "typeOfEnsurance"("idTypeOfEnsurance") ON DELETE SET NULL,
    "productId" INTEGER REFERENCES "Product"("idProduct") ON DELETE SET NULL
);

-- Crear tabla de Gestión de Incidentes
CREATE TABLE "IncidentManagement" (
    "idIncidentManagement" SERIAL PRIMARY KEY,
    "incidentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "anexes" TEXT,
    "date" TIMESTAMPTZ NOT NULL,
    "place" TEXT NOT NULL,
    "evidences" TEXT,
    "typeOfIncident" TEXT NOT NULL,
    "incidentStatus" BOOLEAN DEFAULT FALSE,
    "ruc_CI" BOOLEAN DEFAULT FALSE,
    "documentationNumber" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER REFERENCES "Customer"("idCustomer") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Crear tabla de Pagos
CREATE TABLE "Payment" (
    "idPayment" SERIAL PRIMARY KEY,
    "ruc" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER REFERENCES "Customer"("idCustomer") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Crear tabla de Estado
CREATE TABLE "Status" (
    "idStatus" SERIAL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER REFERENCES "Customer"("idCustomer") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Crear tabla de Auditoría
CREATE TABLE "AuditLog" (
    "idAuditLog" SERIAL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "userId" INTEGER REFERENCES "User"("idUser"),
    "changes" JSONB,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION audit_user_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO "AuditLog" (action, modelName, itemId, userId, changes, timestamp)
        VALUES (TG_OP, 'User', OLD.idUser, CURRENT_USER, row_to_json(OLD), CURRENT_TIMESTAMP);
        RETURN OLD;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO "AuditLog" (action, modelName, itemId, userId, changes, timestamp)
        VALUES (TG_OP, 'User', NEW.idUser, CURRENT_USER, row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO "AuditLog" (action, modelName, itemId, userId, changes, timestamp)
        VALUES (TG_OP, 'User', NEW.idUser, CURRENT_USER, jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW)), CURRENT_TIMESTAMP);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER user_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON "User"
FOR EACH ROW EXECUTE FUNCTION audit_user_changes();


