import { Sticker } from "@/components/Sticker";
import { Illustration, NotFound } from "@/components/ui/not-found";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[80svh] w-full flex-col justify-center p-6 md:p-10">
      <Sticker name="cross" className="left-[9%] top-[22%] hidden h-10 lg:block" rotate={-12} />
      <Sticker name="curly" className="bottom-[18%] right-[10%] hidden h-20 lg:block" rotate={8} delay={2} />
      <Sticker name="plus" className="right-[14%] top-[20%] hidden h-10 lg:block" rotate={18} delay={4} />
      <Sticker name="hash" className="bottom-[22%] left-[13%] hidden h-10 lg:block" rotate={-8} delay={1} />
      <div className="relative mx-auto w-full max-w-5xl">
        <Illustration className="absolute inset-0 h-[50vh] w-full text-neutral-dark opacity-[0.2]" />
        <NotFound />
      </div>
    </div>
  );
}
