import { GdgLoader } from "@/components/ui/gdg-loader";

/** Shown by the App Router while a route segment streams in. */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <GdgLoader label="Loading DevFest Chandigarh" />
    </div>
  );
}
