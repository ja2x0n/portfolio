import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** 현재 언어를 유지하거나 바꾸는 Link와 경로 훅. */
export const { Link, usePathname } = createNavigation(routing);
