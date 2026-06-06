import { Resend } from "resend";
import { getServerEnv } from "@/lib/env/server";

const env = getServerEnv();

export const resend = new Resend(env.RESEND_API_KEY);

export const defaultFromEmail = env.RESEND_FROM_EMAIL;
