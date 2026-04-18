"use client";

import { MyGithub, skills } from "@/lib/constant";
import {
  CloseButton,
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconButton } from "../IconButton";
import { ThemeToggle } from "../ThemeToggle";

function GitHubLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 20 20" {...props}>
      <path d="M10 0C4.475 0 0 4.475 0 10a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.013-.663.788-.013 1.35.725 1.538 1.025.9 1.512 2.337 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.274.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0020 10c0-5.525-4.475-10-10-10z" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src="/imgs/common/icon.png" alt="" className="w-8 object-contain object-center" />
      <p className="font-extrabold text-2xl translate-y-0.75">VectorLab</p>
    </div>
  );
}

function TailwindMark() {
  return <img src="/imgs/common/icon.png" alt="" className="w-8 object-contain object-center" />;
}

export function Header() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Home"
            onContextMenu={(evt) => {
              evt.preventDefault();
              router.push("/");
            }}
          >
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-6 max-md:hidden">
          <Popover>
            <PopoverButton className="text-sm/6 text-gray-950 dark:text-white outline-none cursor-pointer">
              文档
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="z-50 divide-y divide-gray-950/5 dark:divide-white/5 rounded-xl bg-white dark:bg-gray-950 shadow-popup dark:shadow-popup-dark text-sm/6 text-gray-950 dark:text-white transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
            >
              <div className="p-3 grid grid-cols-3 gap-1">
                {skills?.map((skill) => {
                  return (
                    <CloseButton
                      as={Link}
                      key={skill?.title}
                      className="col-span-1 block rounded-lg px-3 py-2 transition hover:bg-gray-950/5 dark:hover:bg-white/5"
                      href={skill?.path}
                    >
                      <p className="font-semibold">{skill?.title}</p>
                      <p
                        title={skill?.description}
                        className="max-w-52 line-clamp-2 text-xs/5 text-gray-500 dark:text-gray-600"
                      >
                        {skill?.description}
                      </p>
                    </CloseButton>
                  );
                })}
              </div>
            </PopoverPanel>
          </Popover>
          <Popover>
            <PopoverButton className="text-sm/6 text-gray-950 dark:text-white">文章</PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="z-50 divide-y divide-gray-950/5 dark:divide-white/5 rounded-xl bg-white dark:bg-gray-950 shadow-popup dark:shadow-popup-dark text-sm/6 text-gray-950 dark:text-white transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
            >
              <div className="p-3 grid grid-cols-2 gap-1">正在写～</div>
            </PopoverPanel>
          </Popover>
          <Popover>
            <PopoverButton className="text-sm/6 text-gray-950 dark:text-white">案例</PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="z-50 divide-y divide-gray-950/5 dark:divide-white/5 rounded-xl bg-white dark:bg-gray-950 shadow-popup dark:shadow-popup-dark text-sm/6 text-gray-950 dark:text-white transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
            >
              <div className="p-3 grid grid-cols-2 gap-1">正在写～</div>
            </PopoverPanel>
          </Popover>
          <ThemeToggle />
          <Link href={MyGithub} aria-label="GitHub repository">
            <GitHubLogo className="size-5 fill-black/40 dark:fill-gray-400" />
          </Link>
        </div>
        <div className="flex items-center gap-2.5 md:hidden">
          <IconButton aria-label="Navigation" onClick={() => setNavIsOpen(!navIsOpen)}>
            <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>
          </IconButton>
          <Dialog
            open={navIsOpen}
            onClose={() => setNavIsOpen(false)}
            className="fixed inset-0 z-50 bg-white focus:outline-none md:hidden dark:bg-gray-950"
          >
            <DialogPanel className="size-full overflow-y-auto">
              <div className="flex h-14 items-center justify-between px-4 py-4 sm:px-6">
                <TailwindMark />
                <IconButton aria-label="Navigation" onClick={() => setNavIsOpen(false)}>
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </IconButton>
              </div>
              <div className="grid grid-cols-1 gap-1 px-1 pb-1 sm:px-3 sm:pb-3">
                <Link
                  href={skills?.[0]?.path}
                  onClick={() => setNavIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-xl/9 font-medium text-gray-950 data-active:bg-gray-950/5 dark:text-white dark:hover:bg-white/10"
                >
                  文档
                </Link>
                <Link
                  href={MyGithub}
                  className="rounded-lg px-3 py-2 text-xl/9 font-medium text-gray-950 data-active:bg-gray-950/5 dark:text-white dark:hover:bg-white/10"
                >
                  GitHub
                </Link>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
