CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(50) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

CREATE TABLE IF NOT EXISTS public.drugs
(
    id uuid NOT NULL,
    name character varying(120) COLLATE pg_catalog."default",
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT drugs_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.drug_indications
(
    id integer NOT NULL DEFAULT nextval('drug_indications_id_seq'::regclass),
    drug_id uuid,
    icd_10_code character varying(10) COLLATE pg_catalog."default" NOT NULL,
    name character varying(120) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT drug_indications_pkey PRIMARY KEY (id),
    CONSTRAINT drug_indications_drug_id_fkey FOREIGN KEY (drug_id)
        REFERENCES public.drugs (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)