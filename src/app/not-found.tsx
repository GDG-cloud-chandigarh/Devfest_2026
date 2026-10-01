import { Illustration, NotFound } from "@/components/ui/not-found";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[80svh] w-full flex-col justify-center p-6 md:p-10">
      <div className="relative mx-auto w-full max-w-5xl">
        <Illustration className="absolute inset-0 h-[50vh] w-full text-neutral-dark opacity-[0.2]" />
        <NotFound />
      </div>
    </div>
  );
}
