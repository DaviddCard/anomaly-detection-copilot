-- This is my SCHEMA for the Anomaly Detection Copilot database. 
-- Apply with: psql anomaly_detection -f db/schema.sql

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE missions (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    telemetry JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE anomaly_flags (
    id SERIAL PRIMARY KEY,
    mission_id INTEGER NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    timestep REAL NOT NULL,
    anomaly_score REAL NOT NULL,
    velocity REAL,
    altitude REAL,
    acceleration REAL,
    diagnosis TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

