"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function register(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "Missing required fields" };
    }

    // Check if user already exists
    const existingUser = db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .get();

    if (existingUser) {
        return { error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
    });

    // Sign in the user
    await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
    });
}
