# ---------- STAGE 1: Build ----------
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# RUN npm audit fix --force
# RUN npm install react-scripts@5.0.1 --save-dev

# Copy source code and build the app
COPY . .
RUN npm run build


# ---------- STAGE 2: Serve ----------
FROM node:18-slim AS runner

# Install 'serve' globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]
