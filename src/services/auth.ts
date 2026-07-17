"use client";

import { supabase } from "@/lib/supabase";
import type {
  LoginFormData,
  RegisterFormData,
} from "@/types/auth";

class AuthService {
  /**
   * --------------------------
   * Get Current User
   * --------------------------
   */
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return user;
  }

  /**
   * --------------------------
   * Get Current Session
   * --------------------------
   */
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    return session;
  }

  /**
   * --------------------------
   * Login
   * --------------------------
   */
  async signIn(data: LoginFormData) {
    const { error } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (error) throw error;

    return true;
  }

  /**
   * --------------------------
   * Register
   * --------------------------
   */
  async signUp(data: RegisterFormData) {
    const { data: authData, error } =
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

    if (error) throw error;

    return authData;
  }

  /**
   * --------------------------
   * Logout
   * --------------------------
   */
  async logout() {
    const { error } =
      await supabase.auth.signOut();

    if (error) throw error;

    return true;
  }

  /**
   * --------------------------
   * Forgot Password
   * --------------------------
   */
  async forgotPassword(email: string) {
    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            window.location.origin +
            "/reset-password",
        }
      );

    if (error) throw error;

    return true;
  }

  /**
   * --------------------------
   * Update Password
   * --------------------------
   */
  async updatePassword(password: string) {
    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) throw error;

    return true;
  }

  /**
   * --------------------------
   * Update Profile
   * --------------------------
   */
  async updateProfile(fullName: string) {
    const { error } =
      await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        },
      });

    if (error) throw error;

    return true;
  }

  /**
 * --------------------------
 * Google Login
 * --------------------------
 */
async signInWithGoogle() {
  const { data, error } =
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

  if (error) throw error;

  return data;
}

  /**
   * --------------------------
   * GitHub Login
   * --------------------------
   */
  async signInWithGithub() {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo:
            window.location.origin +
            "/dashboard",
        },
      });

    if (error) throw error;
  }

  /**
   * --------------------------
   * Resend Verification Email
   * --------------------------
   */
  async resendVerificationEmail(
    email: string
  ) {
    const { error } =
      await supabase.auth.resend({
        type: "signup",
        email,
      });

    if (error) throw error;

    return true;
  }
}

export const authService =
  new AuthService();