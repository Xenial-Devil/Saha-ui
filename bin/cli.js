#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const R = process.cwd();
const a = process.argv.slice(2);
const c = a[ 0 ] || "init";

// ───────────────────────────────────────────────
// 🆕 Step 1: Ensure saha-ui is installed in project root
// ───────────────────────────────────────────────

function ensureSahaUIInstalled() {
    try {
        const pkgPath = path.join(R, "package.json");
        if (!fs.existsSync(pkgPath)) {
            console.error("❌ No package.json found in this directory.");
            console.error("Please run this command inside your project folder.");
            process.exit(1);
        }

        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        if (!deps[ "saha-ui" ]) {
            console.log("\n📦 saha-ui not found in your project.");
            console.log("Installing saha-ui@latest for you...\n");
            execSync("npm install saha-ui@latest --save-dev", {
                stdio: "inherit",
                cwd: R,
            });
            console.log("\n✅ saha-ui installed successfully!\n");
        } else {
            console.log("✅ saha-ui is already installed.\n");
        }
    } catch (err) {
        console.error("❌ Failed to verify or install saha-ui:");
        console.error(err.message);
        process.exit(1);
    }
}

// ───────────────────────────────────────────────
// 🆕 Step 2: Install saha-ui dependencies in main project
// ───────────────────────────────────────────────

function installSahaUIDeps() {
    try {
        const sahaPath = path.dirname(new URL(import.meta.url).pathname);
        const pkgPath = path.resolve(sahaPath, "../package.json");

        if (!fs.existsSync(pkgPath)) {
            console.warn("⚠️ Could not find saha-ui package.json to sync dependencies.");
            return;
        }

        const sahaPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        const deps = { ...(sahaPkg.dependencies || {}), ...(sahaPkg.peerDependencies || {}) };

        const depNames = Object.entries(deps)
            .map(([ name, version ]) => `${name}@${version}`)
            .join(" ");

        if (!depNames) {
            console.log("ℹ️ No dependencies to install from saha-ui package.json");
            return;
        }

        console.log("📦 Installing saha-ui peer dependencies in your project...");
        execSync(`npm install ${depNames} --save-dev`, {
            stdio: "inherit",
            cwd: R,
        });
        console.log("\n✅ saha-ui dependencies installed successfully!\n");
    } catch (err) {
        console.error("❌ Failed to install saha-ui dependencies:", err.message);
    }
}

ensureSahaUIInstalled();

// ───────────────────────────────────────────────
// Your Original saha-ui Tailwind/CSS logic below
// ───────────────────────────────────────────────

const rd = (f) => fs.readFileSync(f, "utf8");
const wr = (f, s) => {
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, s, "utf8");
};
const fE = (f) => fs.existsSync(f) && fs.statSync(f).isFile();
const dE = (d) => fs.existsSync(d) && fs.statSync(d).isDirectory();

// Parse package.json
const P = (() => {
    try {
        return JSON.parse(rd(path.join(R, "package.json")));
    } catch {
        return {};
    }
})();

const D = { ...(P.dependencies || {}), ...(P.devDependencies || {}) };
const F = D.next ? "next" : "react";

const checkTailwind = () => {
    const tailwindVersion = D.tailwindcss || D.tailwind;

    if (!tailwindVersion) {
        console.error("\n❌ Error: Tailwind CSS is not installed!");
        console.error("\nInstalling Tailwind CSS automatically for you...");
        execSync("npm install -D tailwindcss postcss autoprefixer", { stdio: "inherit", cwd: R });
        execSync("npx tailwindcss init -p", { stdio: "inherit", cwd: R });
        console.log("\n✅ Tailwind CSS installed and configured!");
    }

    const configFiles = [
        "tailwind.config.js",
        "tailwind.config.ts",
        "tailwind.config.mjs",
        "tailwind.config.cjs",
    ];
    const hasConfig = configFiles.some((f) => fE(path.join(R, f)));

    if (!hasConfig) {
        console.log("\n⚙️  Creating Tailwind config...");
        execSync("npx tailwindcss init -p", { stdio: "inherit", cwd: R });
    }

    const versionMatch = (D.tailwindcss || "3.0.0").match(/(\d+)\.(\d+)\.(\d+)/);
    const majorVersion = versionMatch ? parseInt(versionMatch[ 1 ]) : 3;
    console.log(`✅ Tailwind CSS v${D.tailwindcss || "latest"} detected`);

    return { version: D.tailwindcss || "latest", major: majorVersion };
};

const N = [
    "app/globals.css",
    "app/global.css",
    "styles/globals.css",
    "styles/global.css",
    "src/app/globals.css",
    "src/app/global.css",
    "src/styles/globals.css",
    "src/styles/global.css",
];
const V = [ "src/index.css", "src/main.css", "src/global.css", "index.css" ];
const C = F === "next" ? N : V;

const pick = () => {
    for (const x of C) {
        const f = path.join(R, x);
        if (fE(f)) return f;
    }
    if (F === "next") {
        const A = dE(path.join(R, "app")) && path.join(R, "app/globals.css");
        const B = dE(path.join(R, "src/app")) && path.join(R, "src/app/globals.css");
        const S = dE(path.join(R, "styles")) && path.join(R, "styles/globals.css");
        const T = dE(path.join(R, "src/styles")) && path.join(R, "src/styles/globals.css");
        return A || B || S || T || path.join(R, "app/globals.css");
    }
    return dE(path.join(R, "src")) ? path.join(R, "src/index.css") : path.join(R, "index.css");
};

// (keep the rest of your CSS injection logic exactly as in your current file)

const M = "/* saha-ui */";
const TW = /@import\s+["']tailwindcss["'];?/;

// ... (your full CSS_V4, CSS_V3, updateTailwindConfig, inject etc remain unchanged)

// ───────────────────────────────────────────────
// Main Run
// ───────────────────────────────────────────────

const run = () => {
    if (c !== "init") {
        console.log("Usage: npx saha-ui init");
        return;
    }

    console.log("\n🚀 Initializing saha-ui...\n");

    const tailwindInfo = checkTailwind();
    inject(pick(), tailwindInfo);

    // 🆕 Install saha-ui’s dependencies last
    installSahaUIDeps();

    console.log("\n✨ Done! saha-ui setup completed successfully.\n");
};

run();
