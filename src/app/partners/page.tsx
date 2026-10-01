import type { Metadata } from "next";
import { Handshake } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Sticker } from "@/components/Sticker";
import { PartnerGrid, type Partner } from "@/components/ui/partner-grid";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Partners",
  description: "The community partners behind DevFest Chandigarh 2026, and how to partner with us.",
  alternates: { canonical: "/partners" },
};

const logo = (file: string) => `/partners/${file}`;

// Alphabetical. Add a url to any partner to make its tile link out.
const COMMUNITY_PARTNERS: Partner[] = [
  { name: "ACM Chapter, CCE", logo: logo("acm_chapter_cce.jpeg") },
  { name: "Alexa Developers Community, Chandigarh University", logo: logo("alexa_developers_community_cu.png") },
  { name: "BUG2BUILD", logo: logo("bug2build.jpeg") },
  { name: "C Square", logo: logo("c_square.png") },
  { name: "Code Zen", logo: logo("code_zen.jpg") },
  { name: "Devantra", logo: logo("devantra.jpg") },
  { name: "Devengers", logo: logo("devengers.jpeg") },
  { name: "DevPath", logo: logo("devpath.jpeg") },
  { name: "E-Cell CEC, CGC Landran", logo: logo("ecell_cec_cgc_landran.jpg") },
  { name: "E-Cell CGC-COE", logo: logo("ecell_cgc_coe.jpeg") },
  { name: "Fusion", logo: logo("fusion.png"), darkTile: true },
  { name: "GDG On Campus SVIET", logo: logo("gdg_on_campus_sviet.jpeg") },
  { name: "GeeksforGeeks Campus Body, Chandigarh University", logo: logo("gfg_campus_body_cu.png") },
  { name: "Hacknfinity", logo: logo("hacknfinity.jpg") },
  { name: "OSEN Chandigarh", logo: logo("osen_chandigarh.jpg") },
  { name: "Project Hub Community", logo: logo("project_hub.jpg") },
  { name: "Recess Tribe Community", logo: logo("recess_tribe.jpg") },
  { name: "SheBuilds", logo: logo("shebuilds.jpg") },
  { name: "SkillBugz", logo: logo("skillbugz.jpg") },
  { name: "Spark Tech AI Hub", logo: logo("spark_tech_ai_hub.jpg") },
  { name: "The Ascent Circle", logo: logo("the_ascent_circle.png") },
  { name: "The Uniques Community", logo: logo("the_uniques.png") },
  { name: "The Visionary Minds", logo: logo("the_visionary_minds.jpg") },
  { name: "Venture Nexus", logo: logo("venture_nexus.jpg") },
];

export default function PartnersPage() {
  return (
    <div className="relative py-12 sm:py-16">
      <Sticker name="brackets" className="left-[2%] top-[28%] hidden h-12 min-[1300px]:block" rotate={-10} />
      <Sticker name="halfRight" className="right-[2.5%] top-[45%] hidden h-16 min-[1300px]:block" delay={2} />
      <Sticker name="plus" className="bottom-[14%] left-[3%] hidden h-10 min-[1300px]:block" rotate={16} delay={4} />
      <SectionHeader title="Partners" />
      <p className="mx-auto mt-4 max-w-6xl px-4 text-neutral-dark/80 sm:px-8">
        DevFest Chandigarh is built with the community. These are the groups and organisations helping us bring it
        together.
      </p>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-8">
        <h2 className="font-heading text-2xl font-bold text-neutral-dark">Community partners</h2>
        <div className="mt-6">
          <PartnerGrid partners={COMMUNITY_PARTNERS} />
        </div>

        <div className="mt-16 flex flex-col items-center rounded-3xl border border-neutral-dark/10 bg-cream px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-dark bg-google-green/20">
            <Handshake className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-heading text-2xl font-bold text-neutral-dark sm:text-3xl">Become a partner</h2>
          <p className="mt-3 max-w-md text-neutral-dark/80">
            Run a developer community, student club or tech group? Partner with DevFest Chandigarh and help us reach
            more of the community.
          </p>
          <div className="mt-8">
            <GlowButton href={`mailto:${CONTACT_EMAIL}?subject=DevFest%20Chandigarh%202026%20partnership`}>
              Get in touch
            </GlowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
