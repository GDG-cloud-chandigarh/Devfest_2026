import { CornerHandles } from "@/components/CornerHandles";
import { DarkGrid } from "@/components/DarkGrid";
import { Glyph } from "@/components/Glyph";
import { SectionHeader } from "@/components/SectionHeader";
import { CONTACT_EMAIL } from "@/lib/constants";

const FAQS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What is DevFest Chandigarh?",
    answer:
      "DevFest is a global series of community-run technology conferences hosted by Google Developer Groups. The Chandigarh edition is organised by GDG Cloud Chandigarh: volunteers who run the chapter's meetups, study jams and Cloud Community Days through the year.",
  },
  {
    question: "When and where is it?",
    answer:
      "17th October 2026 at Innovation Hub Chandigarh for workshops, and 18th October 2026 at Diamond Arena for the conference.",
  },
  {
    question: "How do I get a ticket?",
    answer:
      "Pick Day 1, Day 2 or the Both Day ticket from the Venues section above. Each one covers everything running on the days it names.",
  },
  {
    question: "What will the sessions cover?",
    answer:
      "Four focus areas: AI & ML, Cloud, Web & Mobile, and Security & DevOps. Expect Gemini and agents, Google Cloud architecture, Firebase Studio and Android, and the pipeline and security work behind all of it.",
  },
  {
    question: "What formats are there?",
    answer:
      "Hands-on workshops, a full conference day, a hackathon, and private networking time with speakers and organisers.",
  },
  {
    question: "I want to speak. How do I apply?",
    answer: (
      <>
        Write to us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline underline-offset-2">
          {CONTACT_EMAIL}
        </a>{" "}
        with your topic and a short outline. First-time speakers are welcome, and we will help you shape the talk.
      </>
    ),
  },
  {
    question: "Can my company sponsor DevFest?",
    answer: (
      <>
        Yes. Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline underline-offset-2">
          {CONTACT_EMAIL}
        </a>{" "}
        and we will send the sponsorship prospectus. Packages are flexible and we are happy to build one around what you
        want out of the event.
      </>
    ),
  },
];

export function Faqs() {
  return (
    <section className="relative isolate py-16 text-white">
      <DarkGrid />
      <SectionHeader title="FAQs" />

      <div className="mx-auto w-full mt-10 max-w-4xl space-y-6 px-4 sm:px-8">
        {FAQS.map((faq) => (
          /*
            Native disclosure rather than a JS accordion: keyboard handling,
            open state and find-in-page all come for free.

            The corner marks sit outside the details element, since a collapsed
            details hides every child but its summary and nested marks would
            disappear whenever the answer was closed.
          */
          <div key={faq.question} className="relative">
            <details className="group border-2 border-neutral-dark bg-cream text-neutral-dark">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-heading text-lg font-bold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Glyph name="asterisk" className="h-4 shrink-0 transition-transform duration-200 group-open:rotate-90" />
              </summary>
              <p className="px-5 pb-5 text-neutral-dark/75">{faq.answer}</p>
            </details>
            <CornerHandles />
          </div>
        ))}
      </div>
    </section>
  );
}
