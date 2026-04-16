import { DocsSidebar, Header, MobileDocsNav } from "@/components";

export default async function Layout({
  children,
  breadcrumb,
}: React.PropsWithChildren<{ breadcrumb: React.ReactNode }>) {
  return (
    <div>
      <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
        <Header />
        <MobileDocsNav header={<Header />} breadcrumb={breadcrumb}>
          <DocsSidebar />
        </MobileDocsNav>
      </div>
      <div className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] pt-26.25 lg:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem] lg:pt-14.25 xl:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem]">
        <div className="relative col-start-1 row-span-full row-start-1 max-lg:hidden">
          <div className="absolute inset-0">
            <div className="sticky top-14.25 bottom-0 left-0 h-full max-h-[calc(100dvh-(var(--spacing)*14.25))] w-2xs overflow-y-auto p-6">
              {/* <DocsSidebarAutoscroll>
                <DocsSidebar />
              </DocsSidebarAutoscroll> */}
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
              <p>1111</p>
            </div>
          </div>
        </div>
        {/* Candy cane */}
        <div className="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"></div>

        {/* Main content area */}
        <div className="relative row-start-1 grid grid-cols-subgrid lg:col-start-3">{children}</div>

        {/* Candy cane */}
        <div className="col-start-4 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"></div>
      </div>
    </div>
  );
}
