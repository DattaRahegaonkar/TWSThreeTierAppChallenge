# ---------- STAGE 1: Build ----------
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy app source
COPY . .

# ---------- STAGE 2: Runtime ----------
FROM node:18-slim

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app .

# Expose application port
EXPOSE 3500

# Run the application
CMD ["node", "index.js"]
