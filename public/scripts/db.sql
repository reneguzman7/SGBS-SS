-- Database: SGBS-SS

-- DROP DATABASE IF EXISTS "SGBS-SS";

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


/==============================================================/
/* Adapted for:      PostgreSQL 16                               */
/* Created on:       3/8/2024 23:42:51                           */
/==============================================================/

-- Drop existing indexes and tables
drop index if exists ASEGURADORAS_PK;
drop table if exists ASEGURADORAS;

drop index if exists RELATIONSHIP_3_FK;
drop index if exists RELATIONSHIP_8_FK;

drop index if exists ASEGURADORA_TIPOSSEGUROS_PK;
drop table if exists ASEGURADORA_TIPOSSEGUROS;

drop index if exists CLIENTES_PK;
drop table if exists CLIENTES;

drop index if exists RELATIONSHIP_1_FK;
drop index if exists RELATIONSHIP_7_FK;

drop index if exists CLIENTE_ASEGURADORA_PK;
drop table if exists CLIENTE_ASEGURADORA;

drop index if exists RELATIONSHIP_10_FK;
drop index if exists ESTADO_CONTRATOS_PK;
drop table if exists ESTADO_CONTRATOS;

drop index if exists RELATIONSHIP_5_FK;
drop index if exists GESTION_INCIDENTES_PK;
drop table if exists GESTION_INCIDENTES;

drop index if exists RELATIONSHIP_2_FK;
drop index if exists PAGOS_PK;
drop table if exists PAGOS;

drop index if exists PRODUCTOS_PK;
drop table if exists PRODUCTOS;

drop index if exists RELATIONSHIP_4_FK;
drop index if exists RELATIONSHIP_9_FK;

drop index if exists TIPOSSEGUROS_PRODUCTOS_PK;
drop table if exists TIPOSSEGUROS_PRODUCTOS;

drop index if exists TIPOS_SEGUROS_PK;
drop table if exists TIPOS_SEGUROS;

drop index if exists USUARIOS_PK;
drop table if exists USUARIOS;

/==============================================================/
/* Table: ASEGURADORAS                                          */
/==============================================================/
create table ASEGURADORAS (
   IDASEGURADORA        serial primary key,
   NOMBREASEGURADORA    varchar(50)             not null,
   RUC                  varchar(13)             not null,
   TIPOSSEGURO          int                     not null,
   PRODUCTO             varchar(100),
   TELEFONOASEGURADORA  varchar(15)             not null,
   DIRECCIONASEGURADORA varchar(100)            not null,
   CORREOASEGURADORA    varchar(75)             not null,
   FECHAINICONTRATO     date                    not null,
   FECHAFINCONTRATO     date                    not null,
   PORCENTAJECOMISION   real                    not null,
   CREATEDAT            timestamp with time zone not null,
   UPDATEDAT            timestamp with time zone
);

/* Table: ASEGURADORA_TIPOSSEGUROS                              */
create table ASEGURADORA_TIPOSSEGUROS (
   IDTIPOSEGURO         int                     not null,
   IDASEGURADORA        int                     not null,
   primary key (IDTIPOSEGURO, IDASEGURADORA)
);

/* Table: CLIENTES                                              */
create table CLIENTES (
   IDCLIENTE            serial primary key,
   DOCUMENTOIDENTIDAD   varchar(13)             not null,
   NOMBRECOMPLETO       varchar(100)            not null,
   CORREO               varchar(75)             not null,
   TIPOCLIENTE          varchar(10)             not null,
   CIUDAD               varchar(15)             not null,
   DIRECCION            varchar(100)            not null,
   TELEFONOASEGURADORA  varchar(15)             not null,
   ASEGURADORA          varchar(100)            not null,
   TIPOSEGURO           varchar(100)            not null,
   PRODUCTO             varchar(100),
   POLIZA               varchar(100),
   DEDUCIBLE            numeric(15,2),
   FECHAINICIO          date                    not null,
   FECHAINICIOVIGENCIA  date,
   FECHAVENCIMIENTOPOLIZA date,
   TIPO                 varchar(15),
   STATUS               varchar(15),
   CAUSACANCELACION     text,
   FECHACANCELACION     date,
   OBSERVACIONES        text,
   CREATEDAT            timestamp with time zone not null,
   UPDATEDAT            timestamp with time zone
);

/* Table: CLIENTE_ASEGURADORA                                   */
create table CLIENTE_ASEGURADORA (
   IDASEGURADORA        int                     not null,
   IDCLIENTE            int                     not null,
   DOCUMENTOIDENTIDAD   varchar(13)             not null,
   primary key (IDASEGURADORA, IDCLIENTE, DOCUMENTOIDENTIDAD)
);

/* Table: ESTADO_CONTRATOS                                      */
create table ESTADO_CONTRATOS (
   IDESTADOS            serial primary key,
   IDCLIENTE            int                     not null,
   DOCUMENTOIDENTIDAD   varchar(13)             not null,
   NOMBRE               varchar(15),
   CREATEDAT            timestamp with time zone,
   UPDATEDAT            timestamp with time zone
);

/* Table: GESTION_INCIDENTES                                    */
create table GESTION_INCIDENTES (
   IDINCIDENTE          serial primary key,
   IDCLIENTE            int                     not null,
   DOCUMENTOIDENTIDAD   varchar(13)             not null,
   DOCUMENTOIDENTI      varchar(13)             not null,
   DESCRIPCION          text,
   FECHAINCIDENTE       date                    not null,
   LUGARINCIDENTE       varchar(50)             not null,
   EVIDENCIA            text,
   TIPOINCIDENTE        varchar(100)            not null,
   ESTADOINCIDENTE      varchar(50)             not null,
   CREATEDAT            timestamp with time zone,
   UPDATEDAT            timestamp with time zone
);

/* Table: PAGOS                                                 */
create table PAGOS (
   IDPAGO               serial primary key,
   IDCLIENTE            int                     not null,
   DOCUMENTOIDENTIDAD   varchar(13)             not null,
   DOCUMENTOIDEN        varchar(13)             not null,
   RUCEMPRESA           varchar(13)             not null,
   MONTO                numeric(15,2)           not null,
   NUMPOLIZA            varchar(100)            not null,
   CREATEDAT            timestamp with time zone not null,
   UPDATEDAT            timestamp with time zone
);

/* Table: PRODUCTOS                                             */
create table PRODUCTOS (
   IDPRODUCTO           serial primary key,
   NOMBREPRODUCTO       varchar(50)             not null,
   CREATEDAT            timestamp with time zone not null,
   UPDATEDAT            timestamp with time zone
);

/* Table: TIPOSSEGUROS_PRODUCTOS                                */
create table TIPOSSEGUROS_PRODUCTOS (
   IDPRODUCTO           int                     not null,
   NOMBREPRODUCTO       varchar(50)             not null,
   CREATEDAT            timestamp with time zone not null,
   IDTIPOSEGURO         int                     not null,
   primary key (IDPRODUCTO, NOMBREPRODUCTO, CREATEDAT, IDTIPOSEGURO)
);

/* Table: TIPOS_SEGUROS                                         */
create table TIPOS_SEGUROS (
   IDTIPOSEGURO         serial primary key,
   NOMBRETIPO           varchar(50)             not null,
   CREATEDAT            timestamp with time zone not null,
   UPDATEDAT            timestamp with time zone
);

/* Table: USUARIOS                                              */

CREATE TABLE "USUARIOS" (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'user',
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

SELECT * FROM "USUARIOS"


/* Foreign Keys                                                 */
alter table ASEGURADORA_TIPOSSEGUROS
   add constraint FK_ASEGURAD_RELATIONS_TIPOS_SE foreign key (IDTIPOSEGURO)
      references TIPOS_SEGUROS (IDTIPOSEGURO)
      on delete restrict on update restrict;

alter table ASEGURADORA_TIPOSSEGUROS
   add constraint FK_ASEGURAD_RELATIONS_ASEGURAD foreign key (IDASEGURADORA)
      references ASEGURADORAS (IDASEGURADORA)
      on delete restrict on update restrict;

alter table CLIENTE_ASEGURADORA
   add constraint FK_CLIENTE__RELATIONS_ASEGURAD foreign key (IDASEGURADORA)
      references ASEGURADORAS (IDASEGURADORA)
      on delete restrict on update restrict;


alter table TIPOSSEGUROS_PRODUCTOS
   add constraint FK_TIPOSSEG_RELATIONS_PRODUCTOS foreign key (IDPRODUCTO)
      references PRODUCTOS (IDPRODUCTO)
      on delete restrict on update restrict;

alter table TIPOSSEGUROS_PRODUCTOS
   add constraint FK_TIPOSSEG_RELATIONS_TIPOSSEG foreign key (IDTIPOSEGURO)
      references TIPOS_SEGUROS (IDTIPOSEGURO)
      on delete restrict on update restrict;
	  
ALTER TABLE CLIENTES
ADD CONSTRAINT UNIQUE_CLIENTES UNIQUE (IDCLIENTE, DOCUMENTOIDENTIDAD);

-- En la tabla CLIENTE_ASEGURADORA
ALTER TABLE CLIENTE_ASEGURADORA
ADD CONSTRAINT FK_CLIENTE_RELATIONS_CLIENTES FOREIGN KEY (IDCLIENTE, DOCUMENTOIDENTIDAD)
REFERENCES CLIENTES (IDCLIENTE, DOCUMENTOIDENTIDAD)
ON DELETE RESTRICT ON UPDATE RESTRICT;

-- En la tabla ESTADO_CONTRATOS
ALTER TABLE ESTADO_CONTRATOS
ADD CONSTRAINT FK_ESTADO_RELATIONS_CLIENTES FOREIGN KEY (IDCLIENTE, DOCUMENTOIDENTIDAD)
REFERENCES CLIENTES (IDCLIENTE, DOCUMENTOIDENTIDAD)
ON DELETE RESTRICT ON UPDATE RESTRICT;

-- En la tabla GESTION_INCIDENTES
ALTER TABLE GESTION_INCIDENTES
ADD CONSTRAINT FK_GESTION_RELATIONS_CLIENTES FOREIGN KEY (IDCLIENTE, DOCUMENTOIDENTIDAD)
REFERENCES CLIENTES (IDCLIENTE, DOCUMENTOIDENTIDAD)
ON DELETE RESTRICT ON UPDATE RESTRICT;


-- Tabla para almacenar las auditorías
CREATE TABLE AUDITORIA (
   ID_AUDITORIA      SERIAL PRIMARY KEY,
   NOMBRE_TABLA      VARCHAR(50) NOT NULL,
   OPERACION         VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
   ID_REGISTRO       INT,
   NOMBRE_CAMPO      VARCHAR(100),
   VALOR_ANTERIOR    TEXT,
   VALOR_NUEVO       TEXT,
   USUARIO           VARCHAR(50),
   FECHA_OPERACION   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
DECLARE
    field TEXT;
    old_value TEXT;
    new_value TEXT;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        -- Registro de inserción
        INSERT INTO AUDITORIA (NOMBRE_TABLA, OPERACION, ID_REGISTRO, NOMBRE_CAMPO, VALOR_ANTERIOR, VALOR_NUEVO, USUARIO)
        SELECT TG_TABLE_NAME, TG_OP, NEW.ID, NULL, NULL, ROW(NEW.*)::TEXT, current_user;
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        -- Registro de actualización
        FOR field IN SELECT key FROM hstore(ROW(OLD.*)::TEXT) LOOP
            old_value := hstore(ROW(OLD.*)::TEXT)->field;
            new_value := hstore(ROW(NEW.*)::TEXT)->field;
            IF old_value IS DISTINCT FROM new_value THEN
                INSERT INTO AUDITORIA (NOMBRE_TABLA, OPERACION, ID_REGISTRO, NOMBRE_CAMPO, VALOR_ANTERIOR, VALOR_NUEVO, USUARIO)
                VALUES (TG_TABLE_NAME, TG_OP, NEW.ID, field, old_value, new_value, current_user);
            END IF;
        END LOOP;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        -- Registro de eliminación
        INSERT INTO AUDITORIA (NOMBRE_TABLA, OPERACION, ID_REGISTRO, NOMBRE_CAMPO, VALOR_ANTERIOR, VALOR_NUEVO, USUARIO)
        SELECT TG_TABLE_NAME, TG_OP, OLD.ID, NULL, ROW(OLD.*)::TEXT, NULL, current_user;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger para la tabla ASEGURADORAS
CREATE TRIGGER audit_trigger_aseguradoras
AFTER INSERT OR UPDATE OR DELETE ON ASEGURADORAS
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla ASEGURADORA_TIPOSSEGUROS
CREATE TRIGGER audit_trigger_aseguradora_tiposseguros
AFTER INSERT OR UPDATE OR DELETE ON ASEGURADORA_TIPOSSEGUROS
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla CLIENTES
CREATE TRIGGER audit_trigger_clientes
AFTER INSERT OR UPDATE OR DELETE ON CLIENTES
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla CLIENTE_ASEGURADORA
CREATE TRIGGER audit_trigger_cliente_aseguradora
AFTER INSERT OR UPDATE OR DELETE ON CLIENTE_ASEGURADORA
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla ESTADO_CONTRATOS
CREATE TRIGGER audit_trigger_estado_contratos
AFTER INSERT OR UPDATE OR DELETE ON ESTADO_CONTRATOS
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla GESTION_INCIDENTES
CREATE TRIGGER audit_trigger_gestion_incidentes
AFTER INSERT OR UPDATE OR DELETE ON GESTION_INCIDENTES
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla PAGOS
CREATE TRIGGER audit_trigger_pagos
AFTER INSERT OR UPDATE OR DELETE ON PAGOS
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla PRODUCTOS
CREATE TRIGGER audit_trigger_productos
AFTER INSERT OR UPDATE OR DELETE ON PRODUCTOS
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla TIPOSSEGUROS_PRODUCTOS
CREATE TRIGGER audit_trigger_tiposseguros_productos
AFTER INSERT OR UPDATE OR DELETE ON TIPOSSEGUROS_PRODUCTOS
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla TIPOS_SEGUROS
CREATE TRIGGER audit_trigger_tipos_seguros
AFTER INSERT OR UPDATE OR DELETE ON TIPOS_SEGUROS
FOR EACH ROW
EXECUTE FUNCTION log_audit();

-- Crear el trigger para la tabla USUARIOS
CREATE TRIGGER audit_trigger_usuarios
AFTER INSERT OR UPDATE OR DELETE ON USUARIOS
FOR EACH ROW
EXECUTE FUNCTION log_audit();


CREATE TABLE "USUARIOS" (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'user',
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

SELECT * FROM "USUARIOS"
